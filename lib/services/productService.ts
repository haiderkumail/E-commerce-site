import { cache } from 'react';

import dbConnect from '@/lib/dbConnect';
import ProductModel, { Product } from '@/lib/models/ProductModel';

export const revalidate = 3600;

const serializeProduct = (product: any): Product => ({
  ...product,
  _id: product._id?.toString(),
  createdAt: product.createdAt?.toString(),
  updatedAt: product.updatedAt?.toString(),
  colors: Array.isArray(product.colors) ? product.colors : [],  // Ensure colors is an array
  sizes: Array.isArray(product.sizes) ? product.sizes : [],      // Ensure sizes is an array
});

const getLatest = cache(async () => {
  await dbConnect();
  const products = await ProductModel.find({})
    .sort({ _id: -1 })
    .limit(8)
    .lean();
  return products.map(serializeProduct) as Product[];
});

const getTopRated = cache(async () => {
  await dbConnect();
  const products = await ProductModel.find({})
    .sort({ rating: -1 })
    .limit(8)
    .lean();
  return products.map(serializeProduct) as Product[];
});

const getFeatured = async () => {
  await dbConnect();
  const products = await ProductModel.find({ isFeatured: true })
    .limit(3)
    .lean();
  return products.map(serializeProduct) as Product[];
};

const getBySlug = cache(async (slug: string) => {
  await dbConnect();
  const product = await ProductModel.findOne({ slug }).lean();
  return product ? serializeProduct(product) as Product : null;
});

const getAll = cache(async () => {
  await dbConnect();
  const products = await ProductModel.find({}).lean();
  return products.map(serializeProduct) as Product[];
});

const PAGE_SIZE = 3;

const getByQuery = cache(
  async ({
    q,
    category,
    sort,
    price,
    rating,
    page = '1',
  }: {
    q: string;
    category: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  }) => {
    await dbConnect();

    const queryFilter =
      q && q !== 'all'
        ? {
            name: {
              $regex: q,
              $options: 'i',
            },
          }
        : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};

    const order: Record<string, 1 | -1> =
      sort === 'lowest'
        ? { price: 1 }
        : sort === 'highest'
        ? { price: -1 }
        : sort === 'toprated'
        ? { rating: -1 }
        : { _id: -1 };

    const categories = await ProductModel.find().distinct('category');

    const products = await ProductModel.find(
      {
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
      },
      '-reviews',
    )
      .sort(order)
      .skip(PAGE_SIZE * (Number(page) - 1))
      .limit(PAGE_SIZE)
      .lean();

    const countProducts = await ProductModel.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });

    return {
      products: products.map(serializeProduct) as Product[],
      countProducts,
      page,
      pages: Math.ceil(countProducts / PAGE_SIZE),
      categories,
    };
  },
);

const getCategories = cache(async () => {
  await dbConnect();
  const categories = await ProductModel.find().distinct('category');
  return categories;
});

const productService = {
  getLatest,
  getFeatured,
  getBySlug,
  getAll,
  getByQuery,
  getCategories,
  getTopRated,
};

export default productService;
