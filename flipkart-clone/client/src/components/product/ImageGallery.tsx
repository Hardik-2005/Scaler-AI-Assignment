"use client";

import { useState } from "react";
import { SafeImage } from "@/components/common/SafeImage";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

interface ImageGalleryProps {
  images: string[];
  productToCart: {
    id: string | number;
    title: string;
    price: number;
    originalPrice: number;
    image: string;
  };
}

export function ImageGallery({ images, productToCart }: ImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0] || "");
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(productToCart);
    router.push("/cart");
  };

  const handleBuyNow = () => {
    addToCart(productToCart);
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 sticky top-20">
      {/* Thumbnails */}
      <div className="hidden md:flex flex-col gap-2 order-2 md:order-1">
        {images.map((img, index) => (
          <div
            key={index}
            className={`w-16 h-16 border rounded-sm p-1 cursor-pointer overflow-hidden transition-all ${
              activeImage === img ? "border-blue-500 shadow-sm" : "border-gray-200 hover:border-gray-400"
            }`}
            onMouseEnter={() => setActiveImage(img)}
            onClick={() => setActiveImage(img)}
          >
            <div className="relative w-full h-full">
              <SafeImage src={img} alt={`Thumbnail ${index + 1}`} fill className="object-contain" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Image & Actions */}
      <div className="flex flex-col gap-4 flex-1 order-1 md:order-2">
        <div className="border border-gray-100 p-4 h-[350px] md:h-[450px] w-full relative flex items-center justify-center bg-white cursor-crosshair">
          <SafeImage
            src={activeImage}
            alt="Product Image"
            fill
            className="object-contain hover:scale-110 transition-transform duration-300 p-4"
            priority
          />
        </div>

        {/* Mobile Thumbnails */}
        <div className="flex md:hidden gap-2 overflow-x-auto py-2">
          {images.map((img, index) => (
            <div
              key={index}
              className={`min-w-[64px] h-16 border rounded-sm p-1 cursor-pointer overflow-hidden ${
                activeImage === img ? "border-blue-500 shadow-sm" : "border-gray-200"
              }`}
              onClick={() => setActiveImage(img)}
            >
              <div className="relative w-full h-full">
                <SafeImage src={img} alt={`Thumbnail ${index + 1}`} fill className="object-contain" />
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-2 mt-2 sticky bottom-0 bg-white md:bg-transparent z-40 p-2 md:p-0 border-t md:border-t-0 border-gray-200">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#ff9f00] text-white font-bold py-4 rounded-sm flex items-center justify-center gap-2 uppercase tracking-wide hover:shadow-md"
          >
            <ShoppingCart className="w-5 h-5 fill-current" />
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-[#fb641b] text-white font-bold py-4 rounded-sm flex items-center justify-center gap-2 uppercase tracking-wide hover:shadow-md"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path className="fill-current" d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.004-.05-.004-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86" fill="#fff"></path>
            </svg>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
