import { Camera, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image"
import type { EditableImage } from "@/lib/types";

function FormLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">{children}</label>;
}

export default function ImageUploader({
  value,
  onChange,
  label,
  aspect = 'aspect-video',
}: {
  value: EditableImage;
  onChange: (file: File) => void;
  label: string;
  aspect?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(typeof value === "string" ? value : "");

  useEffect(() => {
    if (typeof value === "string") {
      setPreview(value);
      return;
    }

    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      onChange(file);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <label
        className={`relative flex ${aspect} w-full items-center justify-center rounded-lg border border-dashed border-gray-600 bg-gray-900 overflow-hidden cursor-pointer group`}
      >
        {preview ? (
          <Image src={preview} alt={label} fill className="object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-1 text-gray-500">
            <Camera className="w-7 h-7" />
            <span className="text-xs">Subir imagen</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          {uploading ? (
            <LoaderCircle className="w-5 h-5 animate-spin" />
          ) : (
            <span className="text-xs font-semibold text-white">{value ? 'Cambiar imagen' : 'Elegir imagen'}</span>
          )}
        </div>
        {uploading && !value && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
           <LoaderCircle className="w-5 h-5 animate-spin" />
          </div>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
      </label>
    </div>
  );
}