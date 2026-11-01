import { Box, Tag, Store } from 'lucide-react'
import { JSX } from 'react';

type SectionKey = 'general' | 'products' | 'categories';

const NAV_ITEMS: { key: SectionKey; label: string; icon: (c: string) => JSX.Element }[] = [
  { key: 'products',   label: 'Productos',        icon: (c) => <Box className={c} /> },
  { key: 'categories', label: 'Categorías',       icon: (c) => <Tag className={c} /> },
  { key: 'general',    label: 'Datos generales',  icon: (c) => <Store className={c} /> }
]

export default function DashboardNav({
  active,
  onChange,
}: {
  active: SectionKey;
  onChange: (key: SectionKey) => void;
}) {
  return (
    <nav className="bg-card border-b border-border sticky top-[65px] z-20">
      <div className="max-w-lg mx-auto px-4 py-3 flex flex-col gap-3">
        <div className="flex gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === active;
            return (
              <button
                key={item.key}
                onClick={() => onChange(item.key)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {item.icon('w-4 h-4')}
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}