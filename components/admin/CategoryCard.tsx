import { Category } from "@/lib/types";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image"

export default function CategoryCard({
  category,
  productsCount,
  onEdit,
  onDelete,
}: {
  category: Category;
  productsCount: number;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex gap-3 bg-gray-800 border border-gray-700 rounded-lg p-3">
      <div className="w-16 h-16 flex-none rounded-md overflow-hidden bg-gray-700 relative">
        {category.image && <Image fill src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover" />}
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <p className="text-sm font-bold text-gray-100 truncate">{category.name}</p>
        <p className="text-xs text-emerald-400 font-semibold mt-0.5">
          {productsCount} {productsCount === 1 ? 'producto' : 'productos'}
        </p>
      </div>
      <div className="flex-none flex flex-col justify-center gap-1">
        <button onClick={onEdit} className="p-1.5 rounded-full text-gray-400 hover:text-emerald-400 hover:bg-gray-700 transition-colors">
          <Pencil />
        </button>
        <button onClick={onDelete} className="p-1.5 rounded-full text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors">
          <Trash />
        </button>
      </div>
    </div>
  );
}