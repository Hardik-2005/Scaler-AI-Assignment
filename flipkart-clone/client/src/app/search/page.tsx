import { MOCK_PRODUCTS } from "@/lib/mockData";
import { ProductCard } from "@/components/home/ProductCard";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.toLowerCase() || "";

  const filteredProducts = Object.entries(MOCK_PRODUCTS).flatMap(([category, products]) => 
    products.map((product: any) => ({ ...product, category }))
  ).filter(
    (product) =>
      product.title.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query)) ||
      product.category.toLowerCase().includes(query)
  );

  return (
    <main className="min-h-screen bg-gray-100 p-4 pt-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header Breadcrumbs */}
        <div className="bg-white p-4 shadow-sm border-b">
          <h1 className="text-xl font-bold">Search results for "{query}"</h1>
          <p className="text-sm text-gray-500 mt-1">
            Showing {filteredProducts.length} items
          </p>
        </div>

        {/* Product Grid */}
        <div className="bg-white p-4 shadow-sm min-h-[50vh]">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center h-[50vh]">
              <img
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_2353c5.png"
                alt="No Results"
                className="w-80 mb-6"
              />
              <p className="text-xl font-medium mb-2">Sorry, no results found!</p>
              <p className="text-gray-500 mb-6">
                Please check the spelling or try searching for something else
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
