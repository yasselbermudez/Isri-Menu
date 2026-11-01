import { Check, LoaderCircle, Plus } from 'lucide-react';
import { Product, Category, type EditableImage } from '@/lib/types'
import { useState } from 'react'
import ImageUploader from './ImageUploader';
import { FormLabel, Modal, TextArea, TextInput } from './ui/genericos';
import CategoryCard from './CategoryCard';
import ConfirmDialog from './ConfirmDialog';

function CategoryFormModal({
  category,
  allProducts,
  onClose,
  onSubmit,
  saving,
}: {
  category: Category | null;
  allProducts: Product[];
  onClose: () => void;
  onSubmit: (data: Omit<Category, 'id' | 'slug' | 'image'> & { image: EditableImage; id?: string }, selectedProductIds: string[]) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<{ name: string; image: EditableImage; description: string }>({
    name: category?.name ?? '',
    image: category?.image ?? '',
    description: category?.description ?? '',
  });
  const [selectedIds, setSelectedIds] = useState<string[]>(
    category ? allProducts.filter((p) => p.categoryId === category.id).map((p) => p.id) : []
  );

  function toggleProduct(id: string) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const canSubmit = form.name.trim().length > 0;

  return (
    <Modal
      title={category ? 'Editar categoría' : 'Nueva categoría'}
      onClose={onClose}
      footer={
        <>
          <button onClick={onClose} className="flex-1 rounded-full py-2.5 text-sm font-semibold bg-secondary text-secondary-foreground hover:bg-accent transition-colors">
            Cancelar
          </button>
          <button
            disabled={!canSubmit || saving}
            onClick={() => onSubmit({ id: category?.id, ...form }, selectedIds)}
            className="flex-1 rounded-full py-2.5 text-sm font-semibold bg-primary hover:bg-primary-hover text-primary-foreground transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {saving && <LoaderCircle className="w-5 h-5 animate-spin" />}
            Guardar
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <ImageUploader label="Imagen de la categoría" value={form.image} onChange={(file) => setForm((f) => ({ ...f, image: file }))} aspect="aspect-video" />
        <div>
          <FormLabel>Nombre</FormLabel>
          <TextInput value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Ej. Repostería" />
        </div>
        <div>
          <FormLabel>Descripción</FormLabel>
          <TextArea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Describe brevemente la categoría" />
        </div>
        <div>
          <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Productos en esta categoría ({selectedIds.length})
          </span>
          {allProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aún no tienes productos creados.</p>
          ) : (
            <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
              {allProducts.map((p) => {
                const checked = selectedIds.includes(p.id);
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => toggleProduct(p.id)}
                    className="flex items-center gap-2.5 bg-background border border-border rounded-lg px-3 py-2 text-left"
                  >
                    <span
                      className={`w-5 h-5 flex-none rounded-md border flex items-center justify-center ${
                        checked ? 'bg-primary border-primary' : 'border-input'
                      }`}
                    >
                      {checked && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                    </span>
                    <span className="text-sm text-card-foreground truncate">{p.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default function CategoriesSection({
  categories,
  products,
  onCreate,
  onUpdate,
  onDelete,
}: {
  categories: Category[];
  products: Product[];
  onCreate: (data: Omit<Category, 'id' | 'slug' | 'image'> & { image: EditableImage }, selectedProductIds: string[]) => Promise<void>;
  onUpdate: (data: Omit<Category, 'slug' | 'image'> & { image: EditableImage }, selectedProductIds: string[]) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [modalCategory, setModalCategory] = useState<Category | null | 'new'>(null);
  const [pendingDelete, setPendingDelete] = useState<Category | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const productsCount = (id: string) => products.filter((p) => p.categoryId === id).length;

  async function handleSubmit(data: Omit<Category, 'id' | 'slug' | 'image'> & { image: EditableImage; id?: string }, selectedIds: string[]) {
    setSaving(true);
    try {
      if (data.id) {
        await onUpdate(data as Omit<Category, 'slug'>, selectedIds);
      } else {
        await onCreate(data, selectedIds);
      }
      setModalCategory(null);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await onDelete(pendingDelete.id);
      setPendingDelete(null);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 pb-6">
      <div className="flex justify-end">
        <button
          onClick={() => setModalCategory('new')}
          className="flex items-center gap-1.5 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground text-sm font-semibold px-4 py-2 transition-colors"
        >
          <Plus />
          Nueva categoría
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">Aún no has creado categorías.</div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {categories.map((c) => (
            <CategoryCard
              key={c.id}
              category={c}
              productsCount={productsCount(c.id)}
              onEdit={() => setModalCategory(c)}
              onDelete={() => setPendingDelete(c)}
            />
          ))}
        </div>
      )}

      {modalCategory && (
        <CategoryFormModal
          category={modalCategory === 'new' ? null : modalCategory}
          allProducts={products}
          onClose={() => setModalCategory(null)}
          onSubmit={handleSubmit}
          saving={saving}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Eliminar categoría"
          message={`¿Seguro que quieres eliminar "${pendingDelete.name}"? Los productos asociados quedarán sin categoría.`}
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}