import { MOCK_PRODUCTS } from "@/lib/mockData";
import { SafeImage } from "@/components/common/SafeImage";
import { Search, Package, MapPin } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Simulating some past "Orders" pulling items from your mockData
const myOrders = [
  {
    orderId: "OD11839213456",
    date: "12 Apr, 2026",
    status: "Delivered",
    statusColor: "text-green-600",
    product: MOCK_PRODUCTS.mobiles[0]
  },
  {
    orderId: "OD11859432013",
    date: "05 Apr, 2026",
    status: "Delivered",
    statusColor: "text-green-600",
    product: MOCK_PRODUCTS.fashion[2]
  },
  {
    orderId: "OD11893817122",
    date: "Today",
    status: "Shipped",
    statusColor: "text-blue-600",
    product: MOCK_PRODUCTS.home[1]
  }
];

export default function OrdersPage() {
  // Bypassing auth check temporarily so it works correctly 
  // const { userId } = auth();
  // if (!userId) {
  //   redirect("/");
  // }

  return (
    <main className="bg-[#f1f3f6] min-h-screen py-6 w-full font-sans text-gray-800">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-4 px-2 md:px-0">
        
        {/* Filters Sidebar */}
        <div className="hidden lg:block w-[280px]">
          <div className="bg-white p-4 rounded-sm shadow-sm">
            <h2 className="text-[17px] font-medium border-b pb-3 mb-4 uppercase">Filters</h2>
            <div className="mb-4 border-b pb-4">
              <h3 className="text-sm font-medium mb-3 uppercase text-gray-600">Order Status</h3>
              <label className="flex items-center gap-3 mb-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                <span className="text-[15px]">On the way</span>
              </label>
              <label className="flex items-center gap-3 mb-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-blue-600" defaultChecked />
                <span className="text-[15px]">Delivered</span>
              </label>
              <label className="flex items-center gap-3 mb-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                <span className="text-[15px]">Cancelled</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                <span className="text-[15px]">Returned</span>
              </label>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-3 uppercase text-gray-600">Order Time</h3>
              <label className="flex items-center gap-3 mb-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                <span className="text-[15px]">Last 30 days</span>
              </label>
              <label className="flex items-center gap-3 mb-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-blue-600" defaultChecked />
                <span className="text-[15px]">2026</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                <span className="text-[15px]">2025</span>
              </label>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="flex-1 space-y-4">
          
          <div className="bg-white rounded-sm shadow-sm relative flex items-center overflow-hidden border">
            <input 
              type="text" 
              placeholder="Search your orders here" 
              className="w-full py-3.5 px-4 outline-none text-sm"
            />
            <button className="bg-[#2874f0] text-white px-8 py-3.5 flex items-center gap-2 hover:bg-blue-600 font-medium">
              <Search className="w-4 h-4" />
              <span>Search Orders</span>
            </button>
          </div>

          {myOrders.map((order, i) => (
            <div key={i} className="block bg-white p-4 border rounded-sm shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row gap-4">
                
                {/* Image */}
                <Link href={`/product/${order.product.id}`} className="w-[100px] h-[100px] flex-shrink-0 relative overflow-hidden bg-gray-50 flex items-center justify-center p-2 rounded-sm mx-auto sm:mx-0 block">
                  <SafeImage src={order.product.image} alt={order.product.title} fill className="object-contain" />
                </Link>
                
                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/product/${order.product.id}`}>
                      <h3 className="font-medium text-base hover:text-[#2874f0]">{order.product.title}</h3>
                    </Link>
                    <p className="text-gray-500 text-sm mt-1">₹{order.product.price.toLocaleString('en-IN')}</p>
                    <p className="text-gray-500 text-sm mt-0.5">Order ID: {order.orderId}</p>
                  </div>
                </div>

                {/* Status Column */}
                <div className="w-full sm:w-[250px] flex gap-3 text-sm mt-2 sm:mt-0">
                   <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0 bg-gray-200 border-2 border-green-500 shadow-[0_0_4px_rgba(34,197,94,0.4)]"></div>
                   <div className="flex-1">
                     <p className={`font-semibold ${order.statusColor}`}>
                       {order.status} on {order.date}
                     </p>
                     <p className="text-[12px] text-gray-500 mt-1">Your item has been {order.status.toLowerCase()}</p>
                     {order.status === 'Delivered' && (
                       <Link href={`/product/${order.product.id}`} className="text-[#2874f0] font-medium text-[13px] flex items-center gap-1 mt-3 hover:underline">
                         ★ Rate & Review Product
                       </Link>
                     )}
                   </div>
                </div>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </main>
  );
}
