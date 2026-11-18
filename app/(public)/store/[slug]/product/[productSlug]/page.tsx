import { TopBar } from "@/components/product/TopBar";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { CategoryChips } from "@/components/store/CategoryChips";
import { StoreFooter } from "@/components/store/StoreFooter2";
import { getBusiness, getCategories,getProductBySlug} from '@/lib/store';
import { notFound } from 'next/navigation';
import StoreMenuSheet from "@/components/store/MenuSheet";
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";

interface ProductForCart {
    id: string;
    name: string;
    slug: string;
    image?: string;
    price: number;
    stock: number;
}

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

    const productForCart:ProductForCart = {
      id: product?.id,
      name: product?.name,
      slug: product?.slug,
      image: product?.image,
      price: product?.price,
      stock: 10000,
    }

  return (
    <>
      <TopBar
        storeName={business.name}
        storeSlug={business.slug}
        categoryName={categorieName}
      >
        <StoreMenuSheet
          storeName={business.name}
          storeSlug={business.slug}
          storeLogo={business.logo}
          storeType={'restaurante'}
        />
      </TopBar>
        <main className="mx-auto min-h-screen flex flex-col">
          
          <div className="bg-card">
            <ProductGallery images={[product.image]} alt={product.name} />
            
            <ProductInfo
              name={product.name}
              price={`${formatPrice(product.price)}`}
            />
            <AddToCartButton storeSlug={business.slug} product={productForCart} />
          </div>

          <div className="w-full h-[100px] bg-card mt-[-68px] mb-2" />

          <CategoryChips storeSlug={business.slug} categories={categories} />

          <StoreFooter store={business} />
      </main>
    </>
  );
}