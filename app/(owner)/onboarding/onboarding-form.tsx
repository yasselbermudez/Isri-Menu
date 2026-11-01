"use client";
import { useActionState } from "react";
import { createStore } from "@/actions/store";

export function OnboardingForm() {
  const [state, action, pending] = useActionState(createStore, null);
  return (
    <form action={action} className="space-y-4">
      <input name="name" placeholder="Nombre de tu tienda" required className="w-full rounded-md border px-3 py-2" />
      <div className="flex items-center gap-1 text-sm">
        <span>tudominio.com/</span>
        <input name="slug" placeholder="mi-tienda" required className="flex-1 rounded-md border px-3 py-2" />
      </div>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button disabled={pending} className="w-full rounded-md bg-black py-2 text-white disabled:opacity-50">
        {pending ? "Creando..." : "Crear tienda"}
      </button>
    </form>
  );
}
