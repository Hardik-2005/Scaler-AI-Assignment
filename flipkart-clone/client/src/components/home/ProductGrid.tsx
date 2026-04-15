"use client";

import { SafeImage } from "@/components/common/SafeImage";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/mockData";

export function ProductGrid() {
  const products = MOCK_PRODUCTS.mobiles;

  return (
    <div className="flex flex-col md:flex-row bg-[#f1f3f6] mt-2 gap-2 p-2">
      {/* Filters Sidebar */}
      <div className="hidden md:flex flex-col w-[280px] bg-white rounded-sm shadow-sm p-4 h-fit sticky top-20 flex-shrink-0">
        <h2 className="text-lg font-medium border-b pb-3 mb-2">Filters</h2>     
        <div className="py-2">
          <h3 className="text-sm font-medium mb-3">CATEGORIES</h3>
          <p className="text-sm text-gray-500 hover:text-blue-500 cursor-pointer pl-2">Mobiles & Accessories</p>
          <p className="text-sm text-gray-800 font-medium mt-1 pl-4">Mobiles</p>
        </div>
        <div className="border-t py-4">
          <h3 className="text-sm font-medium mb-3">PRICE</h3>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: "70%" }}></div>
          </div>
          <div className="flex items-center justify-between text-xs mt-4">      
            <select className="border border-gray-300 rounded-sm p-1 outline-none">
              <option>Min</option>
              <option>?10000</option>
            </select>
            <span className="text-gray-500">to</span>
            <select className="border border-gray-300 rounded-sm p-1 outline-none">
              <option>?30000</option>
              <option>?50000</option>
              <option>Max</option>
            </select>
          </div>
        </div>
        <div className="border-t py-4">
          <h3 className="text-sm font-medium mb-3">BRAND</h3>
          <div className="flex flex-col gap-2">
            {['realme', 'SAMSUNG', 'POCO', 'Motorola', 'Apple', 'Vivo', 'iQOO', 'Asus'].map(brand => (  
              <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" className="w-4 h-4 cursor-pointer accent-blue-600 rounded-sm" />
                {brand}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid content */}
      <div className="flex-1 bg-white rounded-sm shadow-sm p-2 md:p-4 min-w-0">
        <h1 className="text-xl font-bold mb-4 px-2">Top Deals on Smartphones</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col items-center border border-gray-100 hover:shadow-lg p-2 sm:p-4 transition-all duration-300 rounded-sm relative cursor-pointer bg-white">
              <div className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors z-10">
                 <Heart className="w-5 h-5" />
              </div>
              <div className="relative w-full aspect-[2/3] max-w-[150px] mb-4 overflow-hidden">
                <SafeImage
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="w-full text-left mt-2 flex flex-col gap-1">
                <h3 className="text-sm font-medium text-gray-800 hover:text-blue-500 truncate">{product.title}</h3>
                <div className="flex items-center justify-start gap-2">
                  <span className="bg-green-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
                    {product.rating} <Star className="w-3 h-3 fill-white" />    
                  </span>
                  <span className="text-gray-500 text-xs font-semibold">({product.reviews})</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-1 sm:gap-2 mt-1">
                  <span className="text-base font-bold text-gray-900">?{product.price.toLocaleString('en-IN')}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 line-through">?{product.originalPrice.toLocaleString('en-IN')}</span>
                    <span className="text-sm font-bold text-green-600">{product.offer}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
