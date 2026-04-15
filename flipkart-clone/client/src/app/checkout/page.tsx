"use client";

import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/nextjs";
import { CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "@/lib/api";
import { sendConfirmationEmail } from "@/lib/sendEmail";
import { Toaster, toast } from "react-hot-toast";

const addressSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().length(10, "Phone number must be exactly 10 digits"),       
  pincode: z.string().length(6, "Pincode must be exactly 6 digits"),
  locality: z.string().min(3, "Locality is required"),
  address: z.string().min(10, "Address must be at least 10 characters"),        
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<"address" | "summary" | "payment">("address");
  const [address, setAddress] = useState<AddressFormValues | null>(null);       
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const { register, handleSubmit, formState: { errors } } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
  });

  useEffect(() => {
    setMounted(true);
    if (items.length === 0 && mounted) {
      router.push("/");
    }
  }, [items, mounted, router]);

  if (!mounted) return <div className="min-h-screen bg-[#f1f3f6] animate-pulse"></div>;
  if (items.length === 0) return null; // Redirects in effect

  const totalMRP = items.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0);
  const totalDiscount = items.reduce((acc, item) => acc + (item.originalPrice - item.price) * item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const isDeliveryFree = totalPrice > 500;
  const deliveryCharge = isDeliveryFree ? 0 : 40;
  const finalAmount = totalPrice + deliveryCharge;

  const onAddressSubmit = (data: AddressFormValues) => {
    setAddress(data);
    setStep("summary");
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please log in to place an order");
      return;
    }
    
    setIsPlacingOrder(true);
    const placeOrderToast = toast.loading("Placing your order...");
    
    try {
      const response = await api.post("/orders", {
        items,
        address,
        totalAmount: finalAmount,
        userEmail: user.primaryEmailAddress?.emailAddress,
        userName: user.fullName || address?.name || "User",
      });
      
      const { orderId, estimatedDelivery } = response.data;
      
      toast.success("Order confirmed!", { id: placeOrderToast });
      
      // Send Email Non-blocking
      const emailToast = toast.loading("Sending order confirmation email...");
      
      const emailSent = await sendConfirmationEmail({
        orderId,
        userName: user.fullName || address?.name || "User",
        userEmail: user.primaryEmailAddress?.emailAddress || "",
        totalAmount: finalAmount,
        estimatedDelivery: estimatedDelivery || "3-5 Business Days",
        deliveryAddress: `${address?.name}, ${address?.address}, ${address?.locality}, ${address?.city}, ${address?.state} - ${address?.pincode}`,
        productNames: items.map(item => `${item.title} (x${item.quantity})`).join(", ")
      });
      
      if (emailSent) {
        toast.success("Confirmation email sent!", { id: emailToast });
      } else {
        toast.error("Order placed, but failed to send confirmation email.", { 
          id: emailToast, 
          duration: 5000 
        });
      }

      clearCart();
      setIsPlacingOrder(false);
      // Give the user a moment to see the toast before redirect
      setTimeout(() => {
        router.push(`/checkout/success?orderId=${orderId}`);
      }, 1500);

    } catch (error) {
      console.error("Order placed failed", error);
      toast.error("Something went wrong while placing your order.", { id: placeOrderToast });
      setIsPlacingOrder(false);
    }
  };

  return (
    <main className="bg-[#f1f3f6] min-h-screen py-6 font-sans">
      <Toaster position="top-center" />
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-4 px-2 md:px-0">

        {/* Left Side: Steps */}
        <div className="flex-1 flex flex-col gap-4">

          {/* Step 1: Login (Mock Complete) */}
          <div className="bg-white rounded-sm shadow-sm flex items-center p-4 px-6 justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-[#f1f3f6] text-blue-600 font-bold px-2.5 py-0.5 rounded-sm">1</div>
              <div className="text-gray-500 font-medium">LOGIN <CheckCircle2 className="inline w-4 h-4 text-blue-600 ml-2" /></div>
            </div>
            <div className="text-sm font-semibold">User</div>
          </div>

          {/* Step 2: Delivery Address */}
          <div className="bg-white rounded-sm shadow-sm overflow-hidden">       
            <div className={`p-4 px-6 flex items-center gap-4 ${step === "address" ? "bg-[#2874f0] text-white" : ""}`}>
              <div className={`${step === "address" ? "bg-white text-blue-600" : "bg-[#f1f3f6] text-gray-500"} font-bold px-2.5 py-0.5 rounded-sm`}>2</div>     
              <div className={`font-medium ${step === "address" ? "text-white" : "text-gray-500"}`}>
                DELIVERY ADDRESS {step !== "address" && <CheckCircle2 className="inline w-4 h-4 text-blue-600 ml-2" />}
              </div>
            </div>


            {step === "address" && (
              <div className="p-6 px-12 bg-blue-50/30">
                <form onSubmit={handleSubmit(onAddressSubmit)} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">       
                    <div>
                      <input {...register("name")} placeholder="Name" className="w-full border border-gray-300 p-3 rounded-sm outline-none focus:border-blue-500" />
                      {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
                    </div>
                    <div>
                      <input {...register("phone")} placeholder="10-digit mobile number" className="w-full border border-gray-300 p-3 rounded-sm outline-none focus:border-blue-500" />
                      {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone.message}</span>}
                    </div>
                    <div>
                      <input {...register("pincode")} placeholder="Pincode" className="w-full border border-gray-300 p-3 rounded-sm outline-none focus:border-blue-500" />
                      {errors.pincode && <span className="text-red-500 text-xs mt-1 block">{errors.pincode.message}</span>}
                    </div>
                    <div>
                      <input {...register("locality")} placeholder="Locality" className="w-full border border-gray-300 p-3 rounded-sm outline-none focus:border-blue-500" />
                      {errors.locality && <span className="text-red-500 text-xs mt-1 block">{errors.locality.message}</span>}
                    </div>
                  </div>
                  <div>
                    <textarea {...register("address")} placeholder="Address (Area and Street)" rows={3} className="w-full border border-gray-300 p-3 rounded-sm outline-none focus:border-blue-500"></textarea>
                    {errors.address && <span className="text-red-500 text-xs mt-1 block">{errors.address.message}</span>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">       
                    <div>
                      <input {...register("city")} placeholder="City/District/Town" className="w-full border border-gray-300 p-3 rounded-sm outline-none focus:border-blue-500" />
                      {errors.city && <span className="text-red-500 text-xs mt-1 block">{errors.city.message}</span>}
                    </div>
                    <div>
                      <input {...register("state")} placeholder="State" className="w-full border border-gray-300 p-3 rounded-sm outline-none focus:border-blue-500" />
                      {errors.state && <span className="text-red-500 text-xs mt-1 block">{errors.state.message}</span>}
                    </div>
                  </div>
                  <button type="submit" className="bg-[#fb641b] text-white font-bold py-3.5 px-8 rounded-sm uppercase mt-4 w-64 shadow-md">
                    Deliver Here
                  </button>
                </form>
              </div>
            )}

            {step !== "address" && address && (
              <div className="p-4 px-6 md:px-12 text-[15px] bg-white border-t border-gray-100">
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-semibold">{address.name}</span>
                  <span className="font-semibold">{address.phone}</span>        
                </div>
                <p className="text-gray-600 mb-4">{address.address}, {address.locality}, {address.city}, {address.state} - <span className="font-semibold text-gray-800">{address.pincode}</span></p>
                <button onClick={() => setStep("address")} className="bg-white text-blue-600 font-semibold py-2 px-6 border border-gray-300 rounded-sm uppercase shadow-sm">
                  Change
                </button>
              </div>
            )}
          </div>

          {/* Step 3: Order Summary */}
          <div className="bg-white rounded-sm shadow-sm overflow-hidden">       
            <div className={`p-4 px-6 flex items-center gap-4 ${step === "summary" ? "bg-[#2874f0] text-white" : ""}`}>
              <div className={`${step === "summary" ? "bg-white text-blue-600" : "bg-[#f1f3f6] text-gray-500"} font-bold px-2.5 py-0.5 rounded-sm`}>3</div>     
              <div className={`font-medium ${step === "summary" ? "text-white" : "text-gray-500"}`}>
                ORDER SUMMARY {step === "payment" && <CheckCircle2 className="inline w-4 h-4 text-blue-600 ml-2" />}
              </div>
            </div>

            {step === "summary" && (
              <div className="flex flex-col">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-6 p-6 border-b last:border-b-0">
                    <div className="w-20 h-20 relative flex-shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-contain" />
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="text-[16px] font-medium leading-snug">{item.title}</div>
                      <div className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</div>
                      <div className="flex items-center gap-2 mt-2 text-sm">    
                        <span className="text-gray-500 line-through">â‚¹{item.originalPrice.toLocaleString('en-IN')}</span>
                        <span className="font-bold text-[18px]">â‚¹{item.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="p-4 px-6 border-t flex justify-between items-center bg-gray-50/50">
                  <div className="text-sm text-gray-600">Order confirmation email will be sent to your registered email.</div>
                  <button onClick={() => setStep("payment")} className="bg-[#fb641b] text-white font-bold py-3.5 px-10 rounded-sm uppercase shadow-md hover:bg-[#f35200]">
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Step 4: Payment Options */}
          <div className="bg-white rounded-sm shadow-sm overflow-hidden">       
            <div className={`p-4 px-6 flex items-center gap-4 ${step === "payment" ? "bg-[#2874f0] text-white" : ""}`}>
              <div className={`${step === "payment" ? "bg-white text-blue-600" : "bg-[#f1f3f6] text-gray-500"} font-bold px-2.5 py-0.5 rounded-sm`}>4</div>     
              <div className={`font-medium ${step === "payment" ? "text-white" : "text-gray-500"}`}>
                PAYMENT OPTIONS
              </div>
            </div>

            {step === "payment" && (
              <div className="p-6">
                <label className="flex items-center gap-4 p-4 border rounded-sm cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" className="w-4 h-4 accent-blue-600" defaultChecked />
                  <span className="font-semibold text-[15px]">Cash on Delivery</span>
                </label>
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={handlePlaceOrder} 
                    disabled={isPlacingOrder}
                    className="bg-[#fb641b] text-white font-bold py-4 px-12 rounded-sm uppercase shadow-md text-lg hover:bg-[#f35200] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[220px]"
                  >
                    {isPlacingOrder ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" /> Placing Order...
                      </span>
                    ) : (
                      "Confirm Order"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Price Breakdown */}
        <div className="w-full lg:w-[350px] flex-shrink-0 flex flex-col gap-4 relative">
          <div className="bg-white rounded-sm shadow-sm sticky top-20">
            <h2 className="text-gray-500 font-semibold uppercase tracking-wide border-b p-4 px-6 text-[16px]">Price Details</h2>
            <div className="p-6 flex flex-col gap-4 text-[16px]">
              <div className="flex justify-between">
                <span>Price ({items.length} item{items.length > 1 ? 's' : ''})</span>
                <span>â‚¹{totalMRP.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- â‚¹{totalDiscount.toLocaleString('en-IN')}</span>       
              </div>
              <div className="flex justify-between border-b pb-4 border-dashed border-gray-300">
                <span>Delivery Charges</span>
                <span className="text-green-600">
                  {isDeliveryFree ? (
                    <><span className="text-gray-500 line-through mr-2">â‚¹40</span> Free</>
                  ) : (
                    `â‚¹${deliveryCharge}`
                  )}
                </span>
              </div>
              <div className="flex justify-between font-bold text-[18px] py-1 border-b border-dashed border-gray-300 pb-5">
                <span>Total Amount</span>
                <span>â‚¹{finalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="text-green-600 font-medium text-sm pt-2">
                You will save â‚¹{totalDiscount.toLocaleString('en-IN')} on this order
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold justify-center">
            <ShieldCheck className="text-gray-500 w-5 h-5" />
            Safe and Secure Payments.
          </div>
        </div>

      </div>
    </main>
  );
}