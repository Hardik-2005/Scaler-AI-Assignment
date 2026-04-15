"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SafeImage } from "@/components/common/SafeImage";

const banners = [
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
];

export function HeroCarousel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[150px] md:h-[280px] bg-gray-200 mt-2 mx-2 animate-pulse rounded-sm" />;

  return (
    <div className="mx-2 mt-2 bg-white relative rounded-sm overflow-hidden z-0">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-[150px] md:h-[280px]"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full cursor-pointer">
              <SafeImage
                src={banner}
                alt={`Banner ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: #333;
          background: rgba(255, 255, 255, 0.9);
          padding: 30px 20px;
          border-radius: 4px;
          transform: scale(0.6);
          margin-top: -30px;
          box-shadow: 0 1px 5px 0 rgba(0,0,0,.11);
        }
        .swiper-pagination-bullet-active {
          background-color: #fff !important;
          border: 1px solid #c2c2c2;
        }
      `}</style>
    </div>
  );
}
