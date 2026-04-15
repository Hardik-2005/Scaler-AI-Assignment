import { SafeImage } from "@/components/common/SafeImage";
import Link from "next/link";

const categories = [
  { name: "Top Offers", image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=128&q=80&fit=crop" },
  { name: "Mobiles", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=128&q=80&fit=crop" },
  { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=128&q=80&fit=crop" },
  { name: "Appliances", image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=128&q=80&fit=crop" },
  { name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=128&q=80&fit=crop" },
  { name: "Beauty", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=128&q=80&fit=crop" },
  { name: "Home", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=128&q=80&fit=crop" },
  { name: "Furniture", image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=128&q=80&fit=crop" },
  { name: "Travel", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=128&q=80&fit=crop" }
];

export function CategoriesRow() {
  return (
    <div className="bg-white mx-2 mt-2 shadow-sm rounded-sm">
      <div className="flex justify-between items-center py-4 px-2 overflow-x-auto gap-4 hide-scrollbar max-w-7xl mx-auto">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/category/${category.name.toLowerCase()}`}
            className="flex flex-col items-center gap-2 min-w-[70px] hover:text-[#2874f0] text-sm font-medium transition-colors"
          >
            <div className="h-16 w-16 relative bg-transparent rounded-full overflow-hidden">
              <SafeImage
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain hover:scale-105 transition-transform" 
              />
            </div>
            <span className="text-gray-800 text-xs md:text-sm font-semibold">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
