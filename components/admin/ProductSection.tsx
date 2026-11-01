import { Category, Product, type EditableImage } from "@/lib/types";
import { LoaderCircle, Pencil, Plus, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { FormLabel, Modal, TextArea, TextInput, Toggle } from "./ui/genericos";
import Image from "next/image";
import ImageUploader from "./ImageUploader";

function ProductCard({
  product,
  categoryName,
  currency,
  onEdit,
  onDelete,
  onToggleActive,
}: {
  product: Product;
  categoryName: string;
  currency: string;
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: (v: boolean) => void;
}) {
  return (
    <div className="flex gap-3 bg-card border border-border rounded-lg p-3">
      <div className="w-16 h-16 flex-none rounded-md overflow-hidden bg-muted relative">
        {product.image && <Image fill src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />}
      </div>
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-bold text-card-foreground truncate">{product.name}</p>
          <div className="flex-none flex gap-1">
            <button onClick={onEdit} className="p-1.5 rounded-full text-muted-foreground hover:text-primary-accent hover:bg-accent transition-colors">
              <Pencil />
            </button>
            <button onClick={onDelete} className="p-1.5 rounded-full text-muted-foreground hover:text-destructive hover:bg-accent transition-colors">
              <Trash />
            </button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground truncate">{categoryName || 'Sin categoría'}</p>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-sm font-semibold text-primary-accent">
            {currency} {product.price.toFixed(2)}
          </span>
          <Toggle checked={product.active} onChange={onToggleActive} label={product.active ? 'Disponible' : 'Agotado'} />
        </div>
      </div>
    </div>
  );
}

function ProductFormModal({
  product,
  categories,
  onClose,
  onSubmit,
  saving,
}: {
  product: Product | null;
  categories: Category[];
  onClose: () => void;
  onSubmit: (data: Omit<Product, 'id' | 'slug' | 'image'> & { image: EditableImage; id?: string }) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<{
    name: string;
    price: number;
    description: string;
    image: EditableImage;
    categoryId: string;
    active: boolean;
    reviews: number;
  }>({
    name: product?.name ?? '',
    price: product?.price ?? 0,
    description: product?.description ?? '',
    image: product?.image ?? '',
    categoryId: product?.categoryId ?? categories[0]?.id ?? '',
    active: product?.active ?? true,
    reviews: product?.reviews ?? 0,
  });

  const canSubmit = form.name.trim().length > 0 && form.price >= 0 && form.categoryId;

  return (
    <Modal
      title={product ? 'Editar producto' : 'Nuevo producto'}
      onClose={onClose}
      footer={
        <>
          <button onClick={onClose} className="flex-1 rounded-full py-2.5 text-sm font-semibold bg-secondary text-secondary-foreground hover:bg-accent transition-colors">
            Cancelar
          </button>
          <button
            disabled={!canSubmit || saving}
            onClick={() => onSubmit({ id: product?.id, ...form })}
            className="flex-1 rounded-full py-2.5 text-sm font-semibold bg-primary hover:bg-primary-hover text-primary-foreground transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {saving && <LoaderCircle className="w-5 h-5 animate-spin" />}
            Guardar
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <ImageUploader label="Foto del producto" value={form.image} onChange={(file) => setForm((f) => ({ ...f, image: file }))} aspect="aspect-video" />
        <div>
          <FormLabel>Nombre</FormLabel>
          <TextInput value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Ej. Latte de vainilla" />
        </div>
        <div>
          <FormLabel>Precio</FormLabel>
          <TextInput
            type="number"
            min={0}
            step="0.01"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
            placeholder="0.00"
          />
        </div>
        <div>
          <FormLabel>Categoría</FormLabel>
          <select
            value={form.categoryId}
            onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
            className="w-full rounded-lg bg-background border border-input px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {categories.length === 0 && <option value="">Crea una categoría primero</option>}
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FormLabel>Descripción</FormLabel>
          <TextArea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Describe el producto" />
        </div>
        <Toggle checked={form.active} onChange={(v) => setForm((f) => ({ ...f, active: v }))} label={form.active ? 'Disponible' : 'Marcado como agotado'} />
      </div>
    </Modal>
  );
}

export default function ProductsSection({
  products,
  categories,
  currency,
  onCreate,
  onUpdate,
  onDelete,
  onToggleActive,
}: {
  products: Product[];
  categories: Category[];
  currency: string;
  onCreate: (data: Omit<Product, 'id' | 'slug' | 'image'> & { image: EditableImage }) => Promise<void>;
  onUpdate: (data: Omit<Product, 'slug' | 'image'> & { image: EditableImage }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onToggleActive: (id: string, active: boolean) => void;
}) {
  const [modalProduct, setModalProduct] = useState<Product | null | 'new'>(null);
  const [pendingDelete, setPendingDelete] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categoryName = (id?: string | null) => categories.find((c) => c.id === id)?.name ?? '';

  const filtered = useMemo(
    () => (filterCategory === 'all' ? products : products.filter((p) => p.categoryId === filterCategory)),
    [products, filterCategory]
  );

  async function handleSubmit(data: Omit<Product, 'id' | 'slug' | 'image'> & { image: EditableImage; id?: string }) {
    setSaving(true);
    try {
      if (data.id) {
        await onUpdate(data as Omit<Product, 'slug'>);
      } else {
        await onCreate(data);
      }
      setModalProduct(null);
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
      <div className="flex items-center justify-between gap-2">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="rounded-full bg-card border border-input text-xs font-semibold text-secondary-foreground px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ring"
        >
          <option value="all">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => setModalProduct('new')}
          className="flex items-center gap-1.5 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground text-sm font-semibold px-4 py-2 transition-colors"
        >
          <Plus />
          Nuevo producto
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">Aún no hay productos en esta categoría.</div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              categoryName={categoryName(p.categoryId)}
              currency={currency}
              onEdit={() => setModalProduct(p)}
              onDelete={() => setPendingDelete(p)}
              onToggleActive={(v) => onToggleActive(p.id, v)}
            />
          ))}
        </div>
      )}

      {modalProduct && (
        <ProductFormModal
          product={modalProduct === 'new' ? null : modalProduct}
          categories={categories}
          onClose={() => setModalProduct(null)}
          onSubmit={handleSubmit}
          saving={saving}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Eliminar producto"
          message={`¿Seguro que quieres eliminar "${pendingDelete.name}"? Esta acción no se puede deshacer.`}
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}