"use client";
import { useActionState } from "react";
import type { FormState } from "@/actions/auth";

type Field = { name: string; label: string; type?: string; autoComplete?: string };

export function AuthForm({
  action, fields, submitLabel, next,
}: {
  action: (s: FormState, fd: FormData) => Promise<FormState>;
  fields: Field[];
  submitLabel: string;
  next?: string;
}) {
  // useActionState: conecta el formulario con la Server Action y nos da el estado (errores) y "pending"
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} className="space-y-4">
      {next && <input type="hidden" name="next" value={next} />}
      {fields.map((f) => (
        <label key={f.name} className="block text-sm">
          {f.label}
          <input
            name={f.name}
            type={f.type ?? "text"}
            required
            autoComplete={f.autoComplete}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </label>
      ))}
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600">{state.success}</p>}
      <button disabled={pending} className="w-full rounded-md bg-black py-2 text-white disabled:opacity-50">
        {pending ? "Procesando..." : submitLabel}
      </button>
    </form>
  );
}
