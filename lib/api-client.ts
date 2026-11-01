// Reemplazan tu API simulada 1:1. Todo lo que incluye imagen usa FormData;
// lo que no, usa JSON normal.

import type { Business, Category, Product } from "@/lib/types"; // ajusta el import a donde tengas tus interfaces

const BASE = "/api";

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Error ${res.status}`);
  }
  return res.json();
}

// ---------- helpers internos ----------

function toFormData(fields: Record<string, unknown>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null) continue;
    if (value instanceof File) {
      fd.append(key, value);
    } else {
      fd.append(key, String(value));
    }
  }
  return fd;
}

// ===================== BUSINESSES =====================

export function getBusinesses(): Promise<Business[]> {
  return fetch(`${BASE}/businesses`).then((res) => handle<Business[]>(res));
}

export function getBusiness(id: string): Promise<Business> {
  return fetch(`${BASE}/businesses/${id}`).then((res) => handle<Business>(res));
}

export type CreateBusinessInput = Omit<
  Business,
  "id" | "logo" | "cover" | "categories" | "rating" | "reviewsCount"
> & {
  logo: File;
  cover: File;
};

export function createBusiness(input: CreateBusinessInput): Promise<Business> {
  return fetch(`${BASE}/businesses`, {
    method: "POST",
    body: toFormData(input),
  }).then((res) => handle<Business>(res));
}

export type UpdateBusinessInput = Partial<
  Omit<Business, "id" | "logo" | "cover" | "categories">
> & {
  logo?: string | File;
  cover?: string | File;
};

export function updateBusiness(
  id: string,
  input: UpdateBusinessInput
): Promise<Business> {
  return fetch(`${BASE}/businesses/${id}`, {
    method: "PUT",
    body: toFormData(input),
  }).then((res) => handle<Business>(res));
}

export function deleteBusiness(id: string): Promise<{ success: true }> {
  return fetch(`${BASE}/businesses/${id}`, { method: "DELETE" }).then((res) =>
    handle<{ success: true }>(res)
  );
}

// ===================== CATEGORIES =====================

export function getCategories(businessId: string): Promise<Category[]> {
  return fetch(`${BASE}/categories?businessId=${businessId}`).then((res) =>
    handle<Category[]>(res)
  );
}

export type CreateCategoryInput = Omit<Category, "id" | "image"> & {
  businessId: string;
  image: File;
};

export function createCategory(input: CreateCategoryInput): Promise<Category> {
  return fetch(`${BASE}/categories`, {
    method: "POST",
    body: toFormData(input),
  }).then((res) => handle<Category>(res));
}

export type UpdateCategoryInput = Partial<Omit<Category, "id" | "image">> & {
  image?: File;
};

export function updateCategory(
  id: string,
  input: UpdateCategoryInput
): Promise<Category> {
  return fetch(`${BASE}/categories/${id}`, {
    method: "PUT",
    body: toFormData(input),
  }).then((res) => handle<Category>(res));
}

export function deleteCategory(id: string): Promise<{ success: true }> {
  return fetch(`${BASE}/categories/${id}`, { method: "DELETE" }).then((res) =>
    handle<{ success: true }>(res)
  );
}

// ===================== PRODUCTS =====================

export function getProducts(categoryId?: string): Promise<Product[]> {
  const qs = categoryId ? `?categoryId=${categoryId}` : "";
  return fetch(`${BASE}/products${qs}`).then((res) => handle<Product[]>(res));
}

export function getProduct(id: string): Promise<Product> {
  return fetch(`${BASE}/products/${id}`).then((res) => handle<Product>(res));
}

export type CreateProductInput = Omit<Product, "id" | "image" | "reviews"> & {
  image: File;
};

export function createProduct(input: CreateProductInput): Promise<Product> {
  return fetch(`${BASE}/products`, {
    method: "POST",
    body: toFormData(input),
  }).then((res) => handle<Product>(res));
}

export type UpdateProductInput = Partial<Omit<Product, "id" | "image">> & {
  image?: File;
};

export function updateProduct(
  id: string,
  input: UpdateProductInput
): Promise<Product> {
  return fetch(`${BASE}/products/${id}`, {
    method: "PUT",
    body: toFormData(input),
  }).then((res) => handle<Product>(res));
}

export function deleteProduct(id: string): Promise<{ success: true }> {
  return fetch(`${BASE}/products/${id}`, { method: "DELETE" }).then((res) =>
    handle<{ success: true }>(res)
  );
}

// ===================== OBJETO API (opcional) =====================

export const api = {
  getBusinesses,
  getBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};