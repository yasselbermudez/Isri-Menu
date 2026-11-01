'use client';
import { useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { toast, Toaster } from '../../../components/ui/toast';
import type {
  Business,
  BusinessSettings,
  Category,
  EditableImage,
  Product,
  SellerUser,
} from '@/lib/types';
import {api} from '@/lib/api-client';
import DashboardHeader from '../../../components/admin/Header';
import DashboardNav from '../../../components/admin/StickyNav';
import GeneralSettingsSection from '../../../components/admin/GeneralSettings';
import ProductsSection from '../../../components/admin/ProductSection';
import CategoriesSection from '../../../components/admin/CategorySection';

type SectionKey = 'general' | 'products' | 'categories';
type ProductFormData = Omit<Product, 'id' | 'slug' | 'image'> & { image: EditableImage };
type CategoryFormData = Omit<Category, 'id' | 'slug' | 'image'> & { image: EditableImage };

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function toBusinessSettings(business: Business): BusinessSettings {
  return {
    id: business.id,
    name: business.name,
    logo: business.logo,
    heroImage: business.cover,
    description: business.description,
    schedule: [],
    phone: business.phone,
    whatsapp: business.phone,
    email: business.email,
    instagram: business.instagram ?? '',
    facebook: business.facebook ?? '',
    youtube: business.youtube ?? '',
    currency: business.currency,
    delivery: business.delivery,
    pickup: business.pickup,
  };
}

export default function SellerDashboardPage({
  user,
  business,
}: {
  user: SellerUser;
  business: Business;
}) {
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState<SectionKey>('general');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let mounted = true;

    async function fetchCatalog() {
      try {
        const [prods, cats] = await Promise.all([
          api.getProducts(business.id),
          api.getCategories(business.id),
        ]);
        if (!mounted) return;
        setProducts(prods);
        setCategories(cats);
      } catch (error) {
        toast.add({ description: 'Error al cargar los datos', type: 'error' });
        console.error(error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchCatalog();

    return () => {
      mounted = false;
    };
  }, [business.id]);

  function notify(message: string, kind: 'success' | 'error' = 'success') {
    toast.add({description:message,type:kind})
  }

  
  async function handleCreateProduct(data: ProductFormData) {
    if (!(data.image instanceof File)) {
      notify('Selecciona una imagen para el producto', 'error');
      return;
    }
    try {
      const saved = await api.createProduct({ ...data, slug: slugify(data.name), image: data.image });
      setProducts((prev) => [saved, ...prev]);
      notify('Producto creado');
    } catch {
      notify('No se pudo crear el producto', 'error');
    }
  }

  async function handleUpdateProduct(data: Omit<Product, 'slug' | 'image'> & { image: EditableImage }) {
    const { id, image, ...fields } = data;
    try {
      const saved = await api.updateProduct(id, {
        ...fields,
        ...(image instanceof File ? { image } : {}),
      });
      setProducts((prev) => prev.map((p) => (p.id === saved.id ? saved : p)));
      notify('Producto actualizado');
    } catch {
      notify('No se pudo actualizar el producto', 'error');
    }
  }

  async function handleDeleteProduct(id: string) {
    try {
      await api.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      notify('Producto eliminado');
    } catch {
      notify('No se pudo eliminar el producto', 'error');
    }
  }

  function handleToggleProductActive(id: string, active: boolean) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, active } : p)));
    api.updateProduct(id, { active }).catch(() =>
      notify('No se pudo actualizar la disponibilidad', 'error')
    );
  }

  async function syncCategoryProducts(categoryId: string, selectedProductIds: string[]) {
    const selected = new Set(selectedProductIds);
    const affected = products.filter((product) => product.categoryId === categoryId || selected.has(product.id));
    await Promise.all(
      affected.map((product) =>
        api.updateProduct(product.id, {
          categoryId: selected.has(product.id) ? categoryId : null,
        })
      )
    );
    setProducts((prev) => prev.map((product) => (
      affected.some((item) => item.id === product.id)
        ? { ...product, categoryId: selected.has(product.id) ? categoryId : null }
        : product
    )));
  }

  async function handleCreateCategory(data: CategoryFormData, selectedProductIds: string[]) {
    if (!(data.image instanceof File)) {
      notify('Selecciona una imagen para la categoría', 'error');
      return;
    }
    try {
      const saved = await api.createCategory({
        businessId: business!.id,
        name: data.name,
        slug: slugify(data.name),
        description: data.description,
        image: data.image,
      });
      setCategories((prev) => [saved, ...prev]);
      await syncCategoryProducts(saved.id, selectedProductIds);
      notify('Categoría creada');
    } catch {
      notify('No se pudo crear la categoría', 'error');
    }
  }

  async function handleUpdateCategory(data: Omit<Category, 'slug' | 'image'> & { image: EditableImage }, selectedProductIds: string[]) {
    const { id, image, ...fields } = data;
    try {
      const saved = await api.updateCategory(id, {
        ...fields,
        ...(image instanceof File ? { image } : {}),
      });
      setCategories((prev) => prev.map((category) => (category.id === saved.id ? saved : category)));
      await syncCategoryProducts(saved.id, selectedProductIds);
      notify('Categoría actualizada');
    } catch {
      notify('No se pudo actualizar la categoría', 'error');
    }
  }

  async function handleDeleteCategory(id: string) {
    try {
      await api.deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      setProducts((prev) => prev.map((product) => (
        product.categoryId === id ? { ...product, categoryId: null } : product
      )));
      notify('Categoría eliminada');
    } catch {
      notify('No se pudo eliminar la categoría', 'error');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-card flex items-center justify-center">
        {/*<Spinner className="w-8 h-8 text-emerald-400" />*/}
        <LoaderCircle className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-card">
      <DashboardHeader user={user} business={business} />
      <DashboardNav active={section} onChange={setSection} />

      <main className="px-4 pt-5">
        {section === 'general' && (
          <GeneralSettingsSection 
            business={toBusinessSettings(business)}
          />
        )}

        {section === 'products' && (
          <ProductsSection
            products={products}
            categories={categories}
            currency={business.currency}
            onCreate={handleCreateProduct}
            onUpdate={handleUpdateProduct}
            onDelete={handleDeleteProduct}
            onToggleActive={handleToggleProductActive}
          />
        )}

        {section === 'categories' && (
          <CategoriesSection
            categories={categories}
            products={products}
            onCreate={handleCreateCategory}
            onUpdate={handleUpdateCategory}
            onDelete={handleDeleteCategory}
          />
        )}
        <Toaster />
      </main>
    </div>
  );
}