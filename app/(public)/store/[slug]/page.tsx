import { notFound } from 'next/navigation';
import { getBusiness, getCategories } from '@/lib/store';
import { StoreHeader } from '@/components/store/StoreHeader';
import { StoreHero } from '@/components/store/StoreHero';
import { CategoryNav } from '@/components/store/CategoryNav';
import { CategorySection } from '@/components/store/CategorySection';
import { StoreFooter } from '@/components/store/StoreFooter';
import { CategoryChips } from '@/components/store/CategoryChips';

export default async function StorePage({ params }: { params: { slug: string } }) {

  const {slug:storeSlug} = await params
  
  const business = await getBusiness(storeSlug); // Obtener el negocio por slug
  
  if (!business) notFound();

  const categories = (await getCategories(business.id)) ?? [];
 
  return (
    <>
      <StoreHeader business={business} />
      <main className="pt-14">
        <StoreHero business={business} />
        <CategoryNav categories={categories} />

        <section className="pt-4">
          {categories.map((cat) => (
            <CategorySection key={cat.id} category={cat} businessSlug={business.slug} />
          ))}
        </section>

        <CategoryChips storeSlug={business.slug} categories={categories}/>
        <StoreFooter business={business} />
      </main>
    </>
  );
}