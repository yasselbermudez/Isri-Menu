// components/PlaceHero.tsx
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  business: {
    name: string;
    cover: string;
    description: string;
    address: string;
    city: string;
    state: string;
    rating: number;
    reviewsCount: number;
    currency: string;
    priceRange: string;
    delivery: boolean;
    pickup: boolean;
    slug: string;
  };
}

export default function PlaceHero({ business }: Props) {
  const {
    name,
    cover,
    description,
    address,
    city,
    state,
    rating,
    reviewsCount,
    currency,
    priceRange,
    delivery,
    pickup,
    slug,
  } = business;

  return (
    <div className="bg-gray-800 pt-4 mb-3 pb-8">
      {/* Imagen de portada */}
      <div className="mx-4 aspect-square bg-gray-700 rounded-lg overflow-hidden relative">
        <Image
          src={cover}
          alt={name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 480px) 100vw, 480px"
        />
      </div>

      {/* Información */}
      <div className="px-4 pt-4 flex gap-1">
        <div className="flex items-center text-sm gap-1">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 stroke-emerald-400 fill-gray-700"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            />
          </svg>
          <span className="text-gray-400">
            ({reviewsCount} {reviewsCount === 1 ? 'review' : 'reviews'})
          </span>
        </div>
        <span className="text-gray-400">·</span>
        <div className="flex items-center gap-1 text-sm">
          <span className="font-semibold text-emerald-400">{currency}</span>
          <span className="text-gray-400"> ({priceRange})</span>
        </div>
      </div>

      <section className="px-4 text-emerald-400 wrap-break-word flex flex-col">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold leading-tight text-gray-100">{name}</h1>
          <Link
            href={`/${slug}/info#address`}
            className="text-base font-semibold text-emerald-400"
          >
            {address}
          </Link>
          <Link href={`/${slug}/info#info`}>
            <p className="text-sm text-gray-400 line-clamp-2 mt-1">{description}</p>
            <span className="text-sm font-semibold text-emerald-400">See more...</span>
          </Link>
        </div>

        {/* Badges de Delivery y Pickup */}
        <div className="flex flex-row mt-4 gap-2">
          {delivery && (
            <div className="flex items-center rounded-full pl-3 pr-4 py-1.5 text-white bg-green-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
                fill="currentColor"
                className="w-5 h-5 mr-1.5"
              >
                <path d="M13.92,3.5h-.93v-.88c0-.7-.29-1.38-.81-1.87-1.06-1.02-2.77-1-3.81.04C7.86.28,7.16,0,6.44,0,4.95,0,3.74,1.18,3.74,2.62v.88h-.93c-.64,0-1.15.5-1.15,1.12l-1,10.38c0,1.66,1.38,3,3.08,3h6.42c-1.26-.93-2.07-2.43-2.07-4.11,0-1.57.71-2.98,1.82-3.92V3.5h-.77v-.88c0-.27-.05-.55-.14-.82.29-.42.77-.67,1.29-.67.86,0,1.55.67,1.55,1.49v.88h-.78v5.73c.66-.31,1.39-.48,2.17-.48,1.05,0,2.03.32,2.85.87l-1-5c0-.62-.52-1.12-1.16-1.12ZM7.98,3.5h-3.08v-.88c0-.82.69-1.5,1.54-1.5s1.54.68,1.54,1.5v.88ZM16.08,10.93c-.74-.71-1.75-1.15-2.85-1.15-.8,0-1.54.23-2.17.62-.45.27-.84.64-1.15,1.07-.5.67-.79,1.51-.79,2.42,0,.98.34,1.88.91,2.59.75.93,1.9,1.52,3.2,1.52.06,0,.13,0,.19-.01.47-.02.92-.12,1.34-.28,0-.01.02-.01.03-.02,1.5-.61,2.55-2.08,2.55-3.8,0-1.17-.48-2.22-1.26-2.96ZM15.64,14.36h0s-2.05,2.06-2.05,2.06c-.2.2-.52.2-.74,0-.2-.2-.2-.52,0-.74l1.19-1.17h-2.88s-.07,0-.1,0c-.23-.05-.41-.25-.41-.51,0-.24.18-.45.41-.5.03-.01.06-.01.1-.01h2.88l-1.19-1.17c-.2-.21-.2-.53,0-.73.22-.2.54-.2.74,0l2.05,2.06c.09.09.15.22.15.35,0,.15-.05.28-.15.37Z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-sm font-semibold leading-tight">Delivery</span>
                <span className="text-xs font-normal text-gray-300 leading-tight">
                  Available now
                </span>
              </div>
            </div>
          )}
          {pickup && (
            <Link
              href={`/${slug}/info#address`}
              className="flex items-center rounded-full text-white pl-3 pr-4 py-1.5 bg-[#33415e]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 mr-1.5"
              >
                <path d="M23.05,4.5V6.6a2.19,2.19,0,0,1-1.31,2.05v3.16l-.3-.2a5.79,5.79,0,0,0-6,0,6.06,6.06,0,0,0-3,5.24A7.64,7.64,0,0,0,14,21.12a15.36,15.36,0,0,0,2.11,2.3h-9c-3.35,0-5.31-1.93-5.31-5.36V8.65A2.21,2.21,0,0,1,.52,6.6V4.5L1.85.84A1.29,1.29,0,0,1,3.07,0H6L5.7,1.43,5,4.5V6.6A2.21,2.21,0,0,0,7.28,8.85,2.2,2.2,0,0,0,9.52,6.6V4.5l.26-3.21L9.87,0h3.84l.09,1.29L14,4.5V6.6a2.25,2.25,0,1,0,4.5,0V4.5l-.67-3.07L17.56,0h2.93a1.3,1.3,0,0,1,1.23.84Zm-.13,12.56a6.76,6.76,0,0,1-2.06,4.35,11.72,11.72,0,0,1-2.16,1.81.58.58,0,0,1-.26.09.59.59,0,0,1-.25-.07,11.84,11.84,0,0,1-3.1-2.93A5.85,5.85,0,0,1,13.92,17a4.58,4.58,0,0,1,2.27-4,4.42,4.42,0,0,1,4.51,0,4.61,4.61,0,0,1,1.63,1.71A5,5,0,0,1,22.92,17.06Zm-3.43,1.11A1.57,1.57,0,0,0,19,15.63a1.47,1.47,0,0,0-1.67.33A1.58,1.58,0,0,0,17,17.65a1.55,1.55,0,0,0,1.42,1h0A1.46,1.46,0,0,0,19.49,18.17Z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-sm font-semibold leading-tight">Pickup</span>
                <span className="text-xs font-normal text-gray-300 leading-tight">
                  Available now
                </span>
              </div>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}