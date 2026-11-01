import { X } from "lucide-react";
import type { DaySchedule } from "@/lib/types";

export function Modal({
  title,
  onClose,
  children,
  footer,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg max-h-[92vh] bg-card rounded-t-2xl sm:rounded-2xl border border-border flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-none">
          <h2 className="text-lg font-bold text-card-foreground">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="text-muted-foreground hover:text-card-foreground p-1 rounded-full hover:bg-accent transition-colors"
          >
            <X />
          </button>
        </div>
        <div className="px-5 py-4 overflow-y-auto">{children}</div>
        {footer && <div className="px-5 py-4 border-t border-border flex-none flex gap-3">{footer}</div>}
      </div>
    </div>
  );
}

export function FormLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">{children}</label>;
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg bg-background border border-input px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring ${props.className ?? ''}`}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg bg-background border border-input px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring resize-none ${props.className ?? ''}`}
    />
  );
}

/** Simula: seleccionar imagen -> subir al servicio de almacenamiento -> guardar la URL devuelta. */

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2"
      aria-pressed={checked}
    >
      <span
        className={`relative inline-flex h-6 w-11 flex-none items-center rounded-full transition-colors ${
          checked ? 'bg-primary' : 'bg-input'
        }`}
      >
        <span
          className={`inline-block h-[18px] w-[18px] transform rounded-full bg-primary-foreground transition-transform ${
            checked ? 'translate-x-[22px]' : 'translate-x-[3px]'
          }`}
        />
      </span>
      {label && <span className="text-sm text-secondary-foreground">{label}</span>}
    </button>
  );
}

export function ScheduleEditor({ schedule, onChange }: { schedule: DaySchedule[]; onChange: (s: DaySchedule[]) => void }) {
  function updateDay(index: number, patch: Partial<DaySchedule>) {
    const next = schedule.map((d, i) => (i === index ? { ...d, ...patch } : d));
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-2">
      {schedule.map((d, i) => (
        <div key={d.day} className="flex items-center gap-3 bg-background border border-border rounded-lg px-3 py-2.5">
          <span className="w-20 flex-none text-sm font-semibold text-card-foreground">{d.day}</span>
          <Toggle checked={d.isOpen} onChange={(v) => updateDay(i, { isOpen: v })} />
          {d.isOpen ? (
            <div className="flex items-center gap-2 flex-1 justify-end">
              <input
                type="time"
                value={d.openTime}
                onChange={(e) => updateDay(i, { openTime: e.target.value })}
                className="bg-card border border-input rounded-md px-2 py-1 text-xs text-card-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <span className="text-muted-foreground text-xs">a</span>
              <input
                type="time"
                value={d.closeTime}
                onChange={(e) => updateDay(i, { closeTime: e.target.value })}
                className="bg-card border border-input rounded-md px-2 py-1 text-xs text-card-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          ) : (
            <span className="flex-1 text-right text-xs text-muted-foreground">Cerrado</span>
          )}
        </div>
      ))}
    </div>
  );
}