"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, ChevronDown, Package } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState, useRef } from "react";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { MOCK_PRODUCTS } from "@/lib/mockData";

export function Navbar() {
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const allProducts = Object.entries(MOCK_PRODUCTS).flatMap(([category, products]) => 
    products.map(product => ({ ...product, category }))
  );

  const searchResults = allProducts.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#2874f0] text-white shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl">
        {/* Logo */}
        <div className="flex flex-col flex-1 max-w-[150px] items-center md:items-start pl-0 md:pl-2">
          <Link href="/" className="font-bold text-xl italic flex flex-col items-center md:items-start">
            Flipkart
            <span className="text-[10px] text-gray-300 italic flex items-center">
              Explore <span className="text-yellow-400 font-bold ml-1">Plus ?</span>
            </span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-auto px-4 relative" ref={searchRef}>
          <div className="relative w-full max-w-xl shadow-sm z-50">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              placeholder="Search for products, brands and more"
              className="w-full bg-white text-black py-2 px-4 rounded-sm outline-none focus:shadow-md h-9 text-sm"
            />
            <button className="absolute right-0 top-0 h-full px-4 text-[#2874f0]">
              <Search className="h-5 w-5" />
            </button>
            {showSearchDropdown && searchQuery && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-sm shadow-lg border border-gray-200 overflow-hidden z-[100] max-h-[300px] overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                      onClick={() => setShowSearchDropdown(false)}
                    >
                      <div className="h-10 w-10 relative overflow-hidden bg-white">
                        <img src={product.image} alt={product.title} className="object-cover w-full h-full" />
                      </div>
                      <div className="flex flex-col text-black">
                        <span className="text-sm font-medium line-clamp-1">{product.title}</span>
                        <span className="text-xs text-slate-500 capitalize">in {product.category}</span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No matching products found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Nav Items */}
        <nav className="flex items-center gap-6 justify-end flex-1 pr-0 md:pr-4">

          {isLoaded && !isSignedIn && (
            <SignInButton mode="modal">
              <button className="hidden md:flex bg-white text-[#2874f0] px-8 py-1 font-bold rounded-sm h-8 items-center justify-center cursor-pointer">
                Login
              </button>
            </SignInButton>
          )}

          {isSignedIn && (
            <div className="hidden md:flex items-center gap-6">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8 rounded-full border-2 border-white/20 hover:border-white shadow-sm transition-all"
                  }
                }}
              />
              <Link href="/orders" className="flex flex-row items-center gap-2 font-medium hover:text-gray-200">
                <Package className="h-5 w-5" />
                <span>Orders</span>
              </Link>
            </div>
          )}

          <button className="hidden md:flex items-center gap-1 font-medium hover:text-gray-200">
            More <ChevronDown className="h-4 w-4" />
          </button>

          <Link href="/cart" className="flex flex-row items-center gap-2 font-medium hover:text-gray-200 relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden md:inline">Cart</span>
            {mounted && cartItemsCount > 0 && (
              <span className="absolute -top-1.5 md:-top-2 -left-2 md:left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white">
                {cartItemsCount}
              </span>
            )}
          </Link>

          <button className="md:hidden">
            {isLoaded && !isSignedIn && (
              <SignInButton mode="modal">
                <User className="h-6 w-6 cursor-pointer" />
              </SignInButton>
            )}
            {isSignedIn && (
              <UserButton />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
