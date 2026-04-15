"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#f1f3f6] animate-pulse"></div>;

  const totalMRP = items.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0);
  const totalDiscount = items.reduce((acc, item) => acc + (item.originalPrice - item.price) * item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const isDeliveryFree = totalPrice > 500;
  const deliveryCharge = isDeliveryFree ? 0 : 40;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#f1f3f6] p-4 font-sans flex items-center justify-center">
        <div className="bg-white p-8 w-full max-w-[1000px] rounded-sm shadow-sm flex flex-col items-center py-16">
          <div className="relative w-64 h-48 mb-6 opacity-80 overflow-hidden rounded-full">
            <Image
              src="https://images.unsplash.com/photo-1557821552-17105153cebc?w=500&q=80"
              alt="Empty Cart"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-xl font-medium text-gray-800 mb-2">Your cart is empty!</h2>
          <p className="text-sm text-gray-500 mb-6">Add items to it now.</p>
          <Link href="/" className="bg-[#2874f0] text-white px-16 py-3 rounded-sm shadow-sm font-semibold hover:bg-blue-600 transition-colors">
            Shop now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#f1f3f6] min-h-screen py-6 font-sans">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-4 px-2 md:px-0">
        
        {/* Left Side: Cart Items */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white rounded-sm shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4 px-6">
              <h1 className="text-[18px] font-semibold text-gray-900 border-b-2 border-[#2874f0] pb-4 -mb-[18px]">
                Flipkart ({totalItems})
              </h1>
            </div>

            {/* Address Placeholder */}
            <div className="p-4 px-6 flex justify-between items-center text-sm border-b">
              <div>
                <span className="text-gray-500">Deliver to: </span>
                <span className="font-semibold text-gray-800">Bengaluru - 560001</span>
              </div>
              <button className="text-blue-600 font-medium">Change</button>
            </div>

            {/* Cart Items List */}
            <div className="flex flex-col">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col p-6 border-b last:border-b-0">
                  <div className="flex gap-6">
                    <div className="w-[112px] h-[112px] relative flex-shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-contain" />
                    </div>
                    <div className="flex flex-col">
                      <Link href={`/product/${item.id}`} className="text-[16px] text-gray-900 hover:text-blue-600 font-medium leading-snug line-clamp-1">
                        {item.title}
                      </Link>
                      <div className="text-sm text-gray-500 mt-1">Seller: Vision Star</div>
                      <div className="flex items-center gap-2 mt-4 text-sm">
                        <span className="text-gray-500 line-through">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                        <span className="font-bold text-[18px] text-gray-900">₹{item.price.toLocaleString('en-IN')}</span>
                        <span className="text-green-600 font-semibold">{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% Off</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions: quantity + remove */}
                  <div className="flex items-center gap-6 mt-6">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className={`w-7 h-7 rounded-full border flex items-center justify-center font-bold text-lg leading-none pt-0.5 ${item.quantity <= 1 ? "text-gray-300 border-gray-200 cursor-not-allowed" : "text-black border-gray-300"}`}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <div className="w-10 h-7 border border-gray-300 flex items-center justify-center text-sm font-semibold rounded-sm">
                        {item.quantity}
                      </div>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center font-bold text-lg leading-none pt-0.5 text-black"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[16px] font-semibold uppercase text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Place Order Section */}
            <div className="bg-white p-4 px-6 border-t sticky bottom-0 z-10 shadow-[0_-2px_10px_0_rgba(0,0,0,0.05)] flex justify-end">
              <Link href="/checkout" className="bg-[#fb641b] text-white px-10 py-4 font-bold text-[16px] rounded-sm uppercase tracking-wide shadow-sm hover:shadow-md hover:bg-[#f35200]">
                Place Order
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Price Breakdown */}
        <div className="w-full lg:w-[350px] flex-shrink-0 flex flex-col gap-4 relative">
          <div className="bg-white rounded-sm shadow-sm sticky top-20">
            <h2 className="text-gray-500 font-semibold uppercase tracking-wide border-b p-4 px-6 text-[16px]">Price Details</h2>
            <div className="p-6 flex flex-col gap-4 text-[16px]">
              <div className="flex justify-between">
                <span>Price ({totalItems} item{totalItems > 1 ? 's' : ''})</span>
                <span>₹{totalMRP.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ₹{totalDiscount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-b pb-4 border-dashed border-gray-300">
                <span>Delivery Charges</span>
                <span className="text-green-600">
                  {isDeliveryFree ? (
                    <><span className="text-gray-500 line-through mr-2">₹40</span> Free</>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>
              <div className="flex justify-between font-bold text-[18px] py-1 border-b border-dashed border-gray-300 pb-5">
                <span>Total Amount</span>
                <span>₹{(totalPrice + deliveryCharge).toLocaleString('en-IN')}</span>
              </div>
              <div className="text-green-600 font-medium text-sm pt-2">
                You will save ₹{totalDiscount.toLocaleString('en-IN')} on this order
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold justify-center">
            <ShieldCheck className="text-gray-500 w-5 h-5" />
            Safe and Secure Payments. Easy returns. 100% Authentic products.
          </div>
        </div>

      </div>
    </main>
  );
}
