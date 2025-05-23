// import Link from 'next/link';

// import {
//   Carousel as SCarousel,
//   CarouselContent,
//   CarouselItem,
// } from '@/components/ui/carousel';
// import productService from '@/lib/services/productService';
// import { delay } from '@/lib/utils';

// const Carousel = async () => {
//   await delay(3000);
//   const featuredProducts = await productService.getFeatured();

//   return (
//     <SCarousel opts={{ loop: true }}>
//       <CarouselContent>
//         {featuredProducts.length > 0 ? (
//           featuredProducts.map((product) => (
//             <CarouselItem key={product._id} className="!m-0 !p-0 w-screen max-w-none">
//               <Link
//                 href={{
//                   pathname: '/search',
//                   query: { category: 'all', q: '' },
//                 }}
//                 className="relative block h-[500px] sm:h-[304px] lg:h-[536px] w-full overflow-hidden m-0 p-0"
//               >
//                 <video
//                   className="h-full w-full object-cover"
//                   playsInline
//                   autoPlay
//                   muted
//                   loop
//                   preload="auto"
//                 >
//                   <source src="/images/banner/video.mp4" type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>

//                 {/* Overlay Text */}
//                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/30 px-2 sm:px-4 pointer-events-none">
//                   <h2 className="text-lg sm:text-2xl md:text-4xl font-bold mb-2">
//                     Elegance in Motion
//                   </h2>
//                   <p className="text-sm sm:text-lg mb-2 sm:mb-4">
//                     Step into our world of modern Pakistani fashion
//                   </p>
//                   <p className="text-base sm:text-xl font-semibold animate-fade-urdu">
//                     کشف فیبرکس — روایتی لباس، جدید انداز
//                   </p>
//                 </div>
//               </Link>
//             </CarouselItem>
//           ))
//         ) : (
//           <CarouselItem className="!m-0 !p-0 w-screen max-w-none">
//             <Link
//               href={{
//                 pathname: '/search',
//                 query: { category: 'all', q: '' },
//               }}
//               className="relative block h-[500px] sm:h-[304px] lg:h-[536px] w-full overflow-hidden m-0 p-0"
//             >
//               <video
//                 className="h-full w-full object-cover"
//                 playsInline
//                 autoPlay
//                 muted
//                 loop
//                 preload="auto"
//               >
//                 <source src="/images/banner/video.mp4" type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>

//               {/* Overlay Text */}
//               <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/30 px-2 sm:px-4 pointer-events-none">
//                 <h2 className="text-lg sm:text-2xl md:text-4xl font-bold mb-2">
//                   Elegance in Motion
//                 </h2>
//                 <p className="text-sm sm:text-lg mb-2 sm:mb-4">
//                   Step into our world of modern Pakistani fashion
//                 </p>
//                 <p className="text-base sm:text-xl font-semibold animate-fade-urdu">
//                   کشف فیبرکس — روایتی لباس، جدید انداز
//                 </p>
//               </div>
//             </Link>
//           </CarouselItem>
//         )}
//       </CarouselContent>
//     </SCarousel>
//   );
// };

// export default Carousel;

// export const CarouselSkeleton = () => {
//   return <div className="skeleton h-[500px] sm:h-[304px] lg:h-[536px] w-screen" />;
// };

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect } from 'react';

import {
  Carousel as SCarousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';

const Banners = [
  {
    desktopSrc: '/images/banner/front.png',
    mobileSrc: '/images/banner/mob3.png',
    alt: 'Big Eid Big – Offer up to 50% Off',
    link: {
      pathname: '/search',
      query: { category: 'all', q: '' },
    },
  },
  {
    desktopSrc: '/images/banner/1.png',
    mobileSrc: '/images/banner/2.png',
    alt: 'Summer Sale – Flat 50% Off',
    link: {
      pathname: '/search',
      query: { category: 'Ladies Lawn Suits', q: '' },
    },
  },
];

const Carousel = () => {
  const carouselApi = useRef<CarouselApi | null>(null);

  // Manual autoplay with useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselApi.current) {
        carouselApi.current.scrollNext();
      }
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white">
      <SCarousel
        opts={{ loop: true }}
        setApi={(api) => (carouselApi.current = api)}
      >
        <CarouselContent>
          {Banners.map((banner, index) => (
            <CarouselItem key={index} className="w-full">
              <Link href={banner.link} className="block w-full">
                {/* Mobile Image */}
                <div className="md:hidden w-full">
                  <Image
                    src={banner.mobileSrc}
                    alt={banner.alt}
                    width={1200}
                    height={600}
                    priority
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Desktop Image */}
                <div className="hidden md:block w-full">
                  <Image
                    src={banner.desktopSrc}
                    alt={banner.alt}
                    width={1920}
                    height={700}
                    priority
                    className="w-full h-auto object-contain"
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </SCarousel>
    </div>
  );
};

export default Carousel;

export const CarouselSkeleton = () => {
  return (
    <div className="skeleton w-full h-[600px]" />
  );
};
