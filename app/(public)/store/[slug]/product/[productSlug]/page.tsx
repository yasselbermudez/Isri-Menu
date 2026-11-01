import { TopBar } from "@/components/product/TopBar";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { AddToOrderBar } from "@/components/product/AddToOrderBar";
import { CategoryChips } from "@/components/store/CategoryChips";
import { StoreFooter } from "@/components/store/StoreFooter2";
import { getBusiness, getCategories,getProductBySlug} from '@/lib/store';
import { notFound } from 'next/navigation';

const formatPrice = (n: number) =>
  n.toLocaleString("es-CU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default async function ProductPage({ params }: { params: { slug: string, productSlug: string} }) {
  

  const {slug:storeSlug,productSlug} = await params
     
    const business = await getBusiness(storeSlug);
    if (!business) notFound();

    const categories = (await getCategories(business.id) ?? [])
    
    const product = await getProductBySlug(business.id,productSlug)
    
    if (!product) notFound();
    const categorieName = product?.category?.name ?? "uncategorized"

  const handleAdd = () => {
    // TODO: conectar con tu carrito / store
    console.log("Añadir al pedido:", { product: product.name, quantity:1 });
  };

  return (
    <>
      <TopBar
        storeName={business.name}
        storeSlug={business.slug}
        categoryName={categorieName}
      />
        <main className="mx-auto min-h-screen flex flex-col">
          <div className="bg-card">
            <ProductGallery images={[product.image]} alt={product.name} />
            <div className="flex flex-col gap-10">
              <ProductInfo
                name={product.name}
                price={`${formatPrice(product.price)}`}
              />
            </div>
          </div>
            {/*
          <div className="bg-card pb-9 px-4">
            <div className="flex flex-col border-t border-border pt-9">
              <QuantitySelector/>
            </div>
          </div>

          <section className="w-full bottom-5 py-1 max-w-lg flex m-auto items-center justify-center sticky">
            <AddToOrderBar
              quantity={1}
              totalPrice={`${formatPrice(product.price * 1)}`}
              onAdd={handleAdd}
            />
          </section>
        */}
          <div className="w-full h-[100px] bg-card mt-[-68px] mb-2" />

          <CategoryChips storeSlug={business.slug} categories={categories} />

          <StoreFooter store={business} />
      </main>
    </>
  );
}