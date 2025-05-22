'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  Carousel as SCarousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const salesBanners = [
  {
    src: '/images/banner/ban.jpg',
    alt: 'Mega Sale - Up to 50% Off',
    link: {
      pathname: '/search',
      query: {
        category: 'all',
        q: '',
      },
    },
  },
];

const Carousel3 = () => {
  return (
    <div className="w-screen overflow-hidden">
      <SCarousel opts={{ loop: true }}>
        <CarouselContent className="!m-0 !p-0">
          {salesBanners.map((banner, index) => (
            <CarouselItem key={index} className="!m-0 !p-0 w-screen max-w-none">
              <Link
                href={banner.link}
                className="relative block h-[300px] sm:h-[304px] md:h-[400px] lg:h-[500px] xl:h-[550px] w-screen"
              >
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </SCarousel>
    </div>
  );
};

export default Carousel3;
