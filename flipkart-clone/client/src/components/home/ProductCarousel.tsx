import { SafeImage } from "@/components/common/SafeImage";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  offer: string;
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

export function ProductCarousel({ title, products }: ProductCarouselProps) {
  return (
    <div className="bg-white mt-2 mx-2 p-4 shadow-sm rounded-[2px] mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[20px] font-bold text-gray-900">{title}</h2>
        <button className="bg-[#2874f0] text-white p-2 rounded-full hover:bg-blue-600 transition shadow-md">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
        {products.map((product) => (
          <Link 
            key={product.id} 
            href={`/product/${product.id}`}
            className="group flex-shrink-0 w-[200px] border border-transparent hover:shadow-lg rounded-sm p-4 transition-all duration-300 relative flex flex-col items-center cursor-pointer bg-white"
          >
            <div className="relative w-32 h-36 mb-4 overflow-hidden flex items-center justify-center">
              <SafeImage 
                src={product.image} 
                alt={product.title} 
                fill 
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                sizes="150px"
              />
            </div>
            <div className="w-full text-center flex flex-col gap-1 items-center">
              <h3 className="text-[14px] font-medium text-gray-800 group-hover:text-blue-600 truncate w-full px-2" title={product.title}>
                {product.title}
              </h3>
              <div className="text-[16px] font-bold text-gray-900">
                ₹{product.price.toLocaleString('en-IN')}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
