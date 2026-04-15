import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { SafeImage } from "@/components/common/SafeImage";

export function ProductCard({
  id,
  title,
  image,
  price,
  originalPrice,
  rating,
  reviews,
  offer,
}: any) {
  return (
    <Link
      href={`/product/${id}`}
      className="group flex flex-col items-center border border-gray-100 hover:shadow-lg p-2 sm:p-4 transition-all duration-300 rounded-sm relative cursor-pointer bg-white"
    >
      <div className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors z-10">
        <Heart className="w-5 h-5" />
      </div>
      <div className="relative w-full aspect-[2/3] max-w-[150px] mb-4 overflow-hidden">
        <SafeImage
          src={image}
          alt={title}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="w-full text-left mt-2 flex flex-col gap-1">
        <h3 className="text-sm font-medium text-gray-800 hover:text-blue-500 truncate">
          {title}
        </h3>
        <div className="flex items-center justify-start gap-2">
          {rating && (
            <span className="bg-green-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
              {rating} <Star className="w-3 h-3 fill-white" />
            </span>
          )}
          {reviews && (
            <span className="text-gray-500 text-xs font-semibold">
              ({reviews.toLocaleString()})
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-900 font-semibold text-[16px]">
            ₹{price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-gray-500 text-xs line-through">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
          {offer && (
            <span className="text-green-600 text-xs font-bold">{offer}</span>
          )}
        </div>
      </div>
    </Link>
  );
}