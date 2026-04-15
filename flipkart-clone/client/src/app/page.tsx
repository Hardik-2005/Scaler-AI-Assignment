import { CategoriesRow } from "@/components/home/CategoriesRow";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ProductGrid } from "@/components/home/ProductGrid";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { MOCK_PRODUCTS } from "@/lib/mockData";

export default function Home() {
  return (
    <main className="mx-auto w-full pb-10 bg-[#f1f3f6]">
      <CategoriesRow />
      <HeroCarousel />
      <div className="max-w-[1400px] mx-auto space-y-4 px-2 sm:px-4">        
        <ProductGrid />
        <ProductCarousel title="Best Deals on Smartphones" products={MOCK_PRODUCTS.mobiles} />
        <ProductCarousel title="Trending Electronics" products={MOCK_PRODUCTS.electronics} />
        <ProductCarousel title="Fashion Top Picks" products={MOCK_PRODUCTS.fashion} />
        <ProductCarousel title="Home Essentials" products={MOCK_PRODUCTS.home} />
        
        {/* MORE ROWS FOR LENGTH */}
        <ProductCarousel title="Premium Apple Phones" products={MOCK_PRODUCTS.mobiles.slice(0, 5)} />
        <ProductCarousel title="Winter Wear For You" products={MOCK_PRODUCTS.fashion.slice(4)} />
        <ProductCarousel title="Kitchen & Dining" products={MOCK_PRODUCTS.home.slice(4)} />
      </div>
    </main>
  );
}
