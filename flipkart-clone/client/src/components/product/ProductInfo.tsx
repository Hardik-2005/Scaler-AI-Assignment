import { CheckCircle2, ChevronRight, Star, Tag } from "lucide-react";

interface ProductInfoProps {
  title: string;
  price: number;
  originalPrice: number;
  offer: string;
  rating: number;
  reviews: number;
  description: string;
  specs: Record<string, string>;
  stock: number;
}

export function ProductInfo({ title, price, originalPrice, offer, rating, reviews, description, specs, stock }: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-3 pb-8 md:pl-6 pt-4 md:pt-0">
      {/* Title & Ratings */}
      <h1 className="text-xl md:text-[22px] font-normal text-gray-800 leading-snug">{title}</h1>
      
      <div className="flex items-center gap-3 mt-1">
        <span className="bg-green-600 text-white text-[13px] font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1 w-fit">
          {rating} <Star className="w-3 h-3 fill-current" />
        </span>
        <span className="text-sm font-medium text-gray-500 hover:text-blue-600 cursor-pointer">
          {reviews.toLocaleString()} Ratings & {(reviews / 8).toFixed(0).toLocaleString()} Reviews
        </span>
        <span className="flex-1"></span>
        <div className="flex items-center gap-1 border border-gray-200 px-2 py-0.5 rounded-sm bg-gray-50">
          <span className="font-bold italic text-blue-600 text-sm">F-Assured</span>
          <span className="text-blue-400">★</span>
        </div>
      </div>
      
      <div className="text-sm font-semibold text-green-600 mt-2">Extra ₹{(originalPrice - price).toLocaleString()} off</div>

      {/* Pricing */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-gray-900 leading-tight">₹{price.toLocaleString()}</span>
        <span className="text-base text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>
        <span className="text-base font-bold text-green-600">{offer}</span>
      </div>

      {/* Offers List */}
      <div className="mt-4 flex flex-col gap-2">
        <h3 className="text-[15px] font-semibold text-gray-800 mb-1">Available offers</h3>
        {[
          "Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card",
          "Bank Offer 10% off up to ₹1,250 on HDFC Bank Credit Card EMI Txns",
          "Special Price Get extra 11% off (price inclusive of cashback/coupon)",
          "Partner Offer Make a purchase and enjoy a surprise cashback/ coupon that you can redeem later!"
        ].map((offer, i) => (
          <div key={i} className="flex items-start gap-3 pl-1 text-[13px] md:text-sm">
            <Tag className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
            <span className="leading-snug"><span className="font-bold text-gray-800">{offer.split(' ')[0]} {offer.split(' ')[1]}</span> {offer.split(' ').slice(2).join(' ')} <span className="text-blue-600 font-medium cursor-pointer ml-1">T&C</span></span>
          </div>
        ))}
      </div>

      {/* Warranty */}
      <div className="flex items-start gap-4 mt-6 border-t pt-6">
        <span className="text-[14px] text-gray-500 font-semibold w-24">Warranty</span>
        <span className="text-[14px] text-gray-800 flex-1 leading-snug">
          1 Year Warranty for Phone and 6 Months Warranty for In-Box Accessories
          <span className="text-blue-600 cursor-pointer block font-medium mt-1">Know More</span>
        </span>
      </div>

      {/* Description */}
      <div className="flex flex-col md:flex-row items-start gap-4 mt-6 border-t pt-6">
        <span className="text-[14px] text-gray-500 font-semibold w-24">Description</span>
        <p className="text-[14px] text-gray-800 leading-relaxed flex-1">
          {description}
        </p>
      </div>

      {/* Highlights / Specs Summary */}
      <div className="flex flex-col md:flex-row items-start gap-4 mt-6 border-t pt-6">
        <span className="text-[14px] text-gray-500 font-semibold w-24 md:whitespace-nowrap">Highlights</span>
        <ul className="flex-1 flex flex-col gap-2 list-disc pl-5">
          {Object.entries(specs).map(([key, val], idx) => (
            <li key={idx} className="text-[14px] text-gray-800 py-0.5 marker:text-gray-300">
              <span className="font-semibold text-gray-600 hidden">{key}:</span> {val}
            </li>
          ))}
        </ul>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-4 mt-6 pt-4">
        {stock > 0 ? (
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <CheckCircle2 className="w-5 h-5 fill-current text-white" />
             In Stock (Hurry, only {stock} left!)
          </div>
        ) : (
          <div className="text-red-500 font-semibold flex items-center gap-2">
             Out of Stock
          </div>
        )}
      </div>

    </div>
  );
}
