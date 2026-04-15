"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="bg-white p-8 max-w-lg w-full rounded-sm shadow-sm flex flex-col items-center py-16 text-center">
      <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-4 max-w-[300px]">
        Thank you for shopping with us. Your order is being processed and a confirmation email has been sent.
      </p>

      {orderId && (
        <div className="bg-[#f1f3f6] px-6 py-3 rounded-sm mb-8 w-full">
          <span className="text-sm text-gray-500 block mb-1">Order Tracking ID</span>
          <span className="font-semibold text-lg">{orderId}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <Link 
          href="/orders" 
          className="bg-white text-[#2874f0] border border-[#2874f0] px-8 py-3 rounded-sm font-semibold hover:bg-blue-50 transition-colors uppercase tracking-wide cursor-pointer"
        >
          View Orders
        </Link>
        <Link 
          href="/" 
          className="bg-[#2874f0] text-white px-8 py-3 rounded-sm shadow-sm font-semibold hover:bg-blue-600 transition-colors uppercase tracking-wide cursor-pointer"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-center text-gray-500">Loading your success page...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
