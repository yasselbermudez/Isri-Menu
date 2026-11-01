"use client";
import Image from 'next/image'

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  return (
    <>
      <div className="w-full relative flex snap-x snap-mandatory overflow-x-auto">
        {images.map((img, i) => (
          <div
            key={i}
            className="bg-secondary flex-none aspect-square w-full h-full snap-center shrink-0"
          >
            <Image
              src={img}
              alt={`${alt} ${i + 1}`}
              className="object-contain w-full h-full"
              width={480}
              height={480}
              fetchPriority={i === 0 ? "high" : "auto"}
            />
          </div>
        ))}
      </div>

      {/* Dots — sólo si hay más de una imagen, igual que el original */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 h-6 pt-2" aria-hidden="true">
          {images.map((_, i) => (
            <span
              key={i}
              className="rounded-full w-2 h-2 bg-foreground/40 first:bg-foreground"
            />
          ))}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        Imagen 1 de {images.length}
      </p>
    </>
  );
}