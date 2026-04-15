import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_PRODUCTS } from "@/lib/mockData";

export default async function ProductDetailPage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  // Await params in case Next.js 15+ is being used where params is a Promise
  const resolvedParams = await params;
  const idNum = parseInt(resolvedParams.id);
  
  let foundProduct = null;
  let foundCategory = "";
  
  for (const [category, products] of Object.entries(MOCK_PRODUCTS)) {
    const product = products.find((p) => p.id === idNum);
    if (product) {
      foundProduct = product;
      foundCategory = category;
      break;
    }
  }

  if (!foundProduct) {
    console.error(`Product not found for ID: ${resolvedParams.id} (parsed as ${idNum})`);
    notFound();
  }

  const images = [foundProduct.image];

  return (
    <main className="bg-[#f1f3f6] min-h-screen py-3 w-full">
      <div className="max-w-[1400px] mx-auto w-full px-2">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs text-gray-500 py-3 mx-2 gap-1 flex-wrap">
          <Link href="/" className="hover:text-blue-500">Home</Link>
          <ChevronRight className="w-3 h-3 pt-0.5" />
          <Link href="#" className="hover:text-blue-500 capitalize">{foundCategory}</Link>
          <ChevronRight className="w-3 h-3 pt-0.5" />
          <span className="text-gray-400 capitalize truncate max-w-[200px]">{foundProduct.title}</span>
        </div>

        {/* Product Page Layout Container */}
        <div className="bg-white mx-2 flex flex-col lg:flex-row shadow-sm rounded-[2px] p-4 lg:p-6 lg:gap-8">
          {/* Left Column - Image Gallery */}
          <div className="w-full lg:w-[45%] flex-shrink-0 relative">
            <ImageGallery
              images={images}
              productToCart={{
                id: foundProduct.id.toString(),
                title: foundProduct.title,
                price: foundProduct.price,
                originalPrice: foundProduct.originalPrice,
                image: images[0]
              }}
            />
          </div>

          {/* Right Column - Product Info */}
          <div className="w-full lg:w-[55%] mt-6 lg:mt-0 flex-grow">
            <ProductInfo
              title={foundProduct.title}
              price={foundProduct.price}
              originalPrice={foundProduct.originalPrice}
              offer={foundProduct.offer}        
              rating={foundProduct.rating}
              reviews={foundProduct.reviews}
              stock={100}
              description={`The best ${foundProduct.title} available now with exciting offers and quick delivery!`}  
              specs={{
                 "Brand": foundProduct.title.split(' ')[0] || 'Generic',
                 "Delivery": "Eligible for fast delivery"
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
