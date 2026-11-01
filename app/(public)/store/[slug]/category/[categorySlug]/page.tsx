
import { CategoryChips } from '@/components/store/CategoryChips';
import { getBusiness, getCategories,getProducts,getCategoryBySlug} from '@/lib/store';
import { notFound } from 'next/navigation';
import CategoryHeader from '@/components/category/CategoryHeader';
import ProductsList from '@/components/category/ProductsList';
import { StoreFooter } from '@/components/store/StoreFooter2';

export default async function CategoryPage({ params }: { params: { slug: string, categorySlug: string} }) {
  
  const {slug:storeSlug,categorySlug} = await params
   
    const business = await getBusiness(storeSlug);
    
    if (!business) notFound();
  
    const categories = (await getCategories(business.id)) ?? [];
    const currentCategorie = (await getCategoryBySlug(business.id,categorySlug)) ?? null
    if (!currentCategorie) notFound();
    const products = (await getProducts(currentCategorie?.id)) ?? [];
    
  return (
    <>
        <CategoryHeader
          storeSlug={storeSlug}
          storeName={business.name}
          categorySlug={categorySlug}
        />
      <main className="pb-4">
        <ProductsList
          storeSlug={storeSlug}
          products={products}
        /> 
        <CategoryChips
          categories={categories}
          storeSlug={storeSlug}
          activeCategory={categorySlug}
        />
        <StoreFooter
          store={business}
        />
      </main>
    </>
  );
}