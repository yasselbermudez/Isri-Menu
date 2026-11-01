// lib/storage.ts
//
// Toda la lógica de imágenes vive aquí. Un solo bucket "images" con
// carpetas por tipo de entidad. Esto mantiene el panel simple: subes un
// archivo, te regresa una URL pública, la guardas en la fila de la BD.
//
// Estructura dentro del bucket:
//   images/business-logos/<uuid>.webp
//   images/business-covers/<uuid>.webp
//   images/category-images/<uuid>.webp
//   images/product-images/<uuid>.webp

import { supabaseAdmin } from "./supabase-server";

const BUCKET = "images";

export type ImageFolder =
  | "business-logos"
  | "business-covers"
  | "category-images"
  | "product-images";

/**
 * Sube una imagen al bucket y devuelve su URL pública.
 * Si se pasa `oldUrl`, borra la imagen anterior primero (útil en updates).
 */
export async function uploadImage(
  file: File,
  folder: ImageFolder,
  oldUrl?: string | null
): Promise<string> {
  if (oldUrl) {
    await deleteImageByUrl(oldUrl).catch(() => {
      // si falla el borrado de la anterior no bloqueamos la subida nueva
      console.warn("No se pudo borrar la imagen anterior:", oldUrl);
    });
  }

  const ext = file.name.split(".").pop() || "webp";
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const path = `${folder}/${fileName}`;

  const arrayBuffer = await file.arrayBuffer();

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(path, arrayBuffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(`Error subiendo imagen: ${error.message}`);
  }

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Borra una imagen a partir de su URL pública.
 * Extrae el path relativo dentro del bucket y lo elimina.
 */
export async function deleteImageByUrl(publicUrl: string): Promise<void> {
  const path = extractPathFromPublicUrl(publicUrl);
  if (!path) return;

  const { error } = await supabaseAdmin.storage.from(BUCKET).remove([path]);
  if (error) {
    throw new Error(`Error borrando imagen: ${error.message}`);
  }
}

function extractPathFromPublicUrl(publicUrl: string): string | null {
  // Las URLs públicas de Supabase tienen el formato:
  // https://<project>.supabase.co/storage/v1/object/public/images/<folder>/<file>
  const marker = `/object/public/${BUCKET}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return null;
  return publicUrl.substring(idx + marker.length);
}
