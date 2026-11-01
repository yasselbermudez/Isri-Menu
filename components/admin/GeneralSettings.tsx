import type { BusinessSettings} from "@/lib/types";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader"
import { updateBusiness, type UpdateBusinessInput } from "@/lib/api-client";
import { toast } from "../ui/toast";
import { FormLabel, TextArea, TextInput, Toggle, ScheduleEditor} from "./ui/genericos";


function notify(message: string, kind: 'success' | 'error' = 'success') {
  toast.add({ description: message, type: kind })
}

export default function GeneralSettingsSection({
  business,
}: {
  business: BusinessSettings;
}) {
  const [form, setForm] = useState<BusinessSettings>(business);
  const [saving, setSaving] = useState(false)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setForm(business), [business]);

  async function handleSaveBusiness(data: BusinessSettings) {
    const update: UpdateBusinessInput = {
      name: data.name,
      logo: data.logo,
      cover: data.heroImage instanceof File ? data.heroImage : undefined,
      description: data.description,
      phone: data.phone,
      email: data.email,
      instagram: data.instagram,
      facebook: data.facebook,
      youtube: data.youtube,
      currency: data.currency,
      delivery: data.delivery,
      pickup: data.pickup,
    };

    setSaving(true);
    try {
      await updateBusiness(data.id, update);
      notify('Datos del negocio actualizados');
    } catch {
      notify('No se pudieron guardar los cambios', 'error');
    } finally {
      setSaving(false);
    }
  }

  function set<K extends keyof BusinessSettings>(key: K, value: BusinessSettings[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="flex flex-col gap-6 pb-4">
      <ImageUploader label="Imagen destacada (hero)" value={form.heroImage} onChange={(url) => set('heroImage', url)} aspect="aspect-square" />

      <div>
        <FormLabel>Nombre del negocio</FormLabel>
        <TextInput value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Nombre visible para tus clientes" />
      </div>

      <div>
        <FormLabel>Descripción</FormLabel>
        <TextArea rows={4} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Cuéntale a tus clientes sobre tu negocio" />
      </div>

      <div className="flex gap-6">
        <Toggle checked={form.delivery} onChange={(v) => set('delivery', v)} label="Delivery disponible" />
        <Toggle checked={form.pickup} onChange={(v) => set('pickup', v)} label="Pickup disponible" />
      </div>

      <div>
        <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Horario de atención</span>
        <ScheduleEditor schedule={form.schedule} onChange={(s) => set('schedule', s)} />
      </div>

      <div>
        <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Contacto</span>
        <div className="flex flex-col gap-3">
          <div>
            <FormLabel>Teléfono</FormLabel>
            <TextInput value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+53 5 555 0111" />
          </div>
          <div>
            <FormLabel>WhatsApp</FormLabel>
            <TextInput value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} placeholder="+53 5 555 0111" />
          </div>
          <div>
            <FormLabel>Correo electrónico</FormLabel>
            <TextInput type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="contacto@negocio.com" />
          </div>
        </div>
      </div>

      <div>
        <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Redes sociales</span>
        <div className="flex flex-col gap-3">
          <div>
            <FormLabel>Instagram</FormLabel>
            <TextInput value={form.instagram} onChange={(e) => set('instagram', e.target.value)} placeholder="https://instagram.com/tu-negocio" />
          </div>
          <div>
            <FormLabel>Facebook</FormLabel>
            <TextInput value={form.facebook} onChange={(e) => set('facebook', e.target.value)} placeholder="https://facebook.com/tu-negocio" />
          </div>
          <div>
            <FormLabel>YouTube</FormLabel>
            <TextInput value={form.youtube} onChange={(e) => set('youtube', e.target.value)} placeholder="https://youtube.com/@tu-negocio" />
          </div>
        </div>
      </div>

      <div>
        <FormLabel>Moneda</FormLabel>
        <select
          value={form.currency}
          onChange={(e) => set('currency', e.target.value)}
          className="w-full rounded-lg bg-background border border-input px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="USD">USD</option>
          <option value="CUP">CUP</option>
          <option value="EUR">EUR</option>
        </select>
      </div>

      <div className="bg-card border-t border-border px-4 py-3 z-20">
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => handleSaveBusiness(form)}
            disabled={saving}
            className="w-full rounded-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold py-3 flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
          >
            {saving && <LoaderCircle className="w-5 h-5 animate-spin" />}
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}