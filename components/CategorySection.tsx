// components/CategorySection.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/lib/types';

interface Props {
  category: Category;
  businessSlug: string;
}

export default function CategorySection({ category, businessSlug }: Props) {
  const { name, slug, image, productsCount, description } = category;

  return (
    <div className="flex flex-col bg-gray-800 mb-2.5 pt-6">
      <Link
        href={`/store/${businessSlug}/category/${slug}`}
        className="category w-full flex flex-col px-4 mb-6"
      >
        <div className="category-label line-clamp-1 text-emerald-400 text-lg font-bold">
          {name}
        </div>
        <div className="rounded-lg border border-gray-700 bg-gray-700 flex-none w-full relative overflow-hidden pt-[73%] mt-4">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 480px) 100vw, 480px"
          />
        </div>
        {description && (
          <span className="text-base font-normal text-gray-100 wrap-break-word whitespace-pre-line line-clamp-5 mt-4 leading-tight">
            {description}
          </span>
        )}
        <div className="flex justify-between gap-1 relative overflow-hidden items-center mt-4">
          <div className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 26.7"
              fill="currentColor"
              className="h-4 flex-none text-gray-400"
            >
              <path d="M12,0C6.3,0,3.5,0,1.8,1.8,0,3.6,0,6.4,0,12.1v6.7c0,4.1,0,6.2,1,7.1.5.5,1.1.8,1.7.8,1.3.2,2.8-1.2,5.9-3.9,1.3-1.2,2-1.8,2.8-2h1.2c.8.2,1.4.8,2.8,2,3,2.7,4.6,4.1,5.9,3.9.6,0,1.2-.4,1.7-.8,1-.9,1-3,1-7.1v-6.6c0-5.8,0-8.6-1.8-10.4C20.5,0,17.7,0,12,0ZM16,6.3h-8c-.6,0-1-.4-1-1s.4-1,1-1h8c.6,0,1,.4,1,1s-.4,1-1,1Z" />
            </svg>
            <span className="text-emerald-400 font-semibold text-sm">
              {productsCount} {productsCount === 1 ? 'Item' : 'Items'}
            </span>
          </div>
          <div className="w-8 h-8 text-white rounded-full bg-emerald-600 flex items-center p-2">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="h-4 w-4 rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}