import { FloatingCartButton } from "@/features/cart/components/floating-cart-button";

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="mx-auto w-full max-w-lg min-h-screen text-foreground">
      {children}
      <FloatingCartButton storeSlug={slug} />
    </div>
  );
}