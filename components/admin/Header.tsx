import { LogOut } from 'lucide-react';
import Image from 'next/image';
import type { SellerUser, Business } from '@/lib/types';

export default function DashboardHeader({
  user,
  business,
}: {
  user: SellerUser;
  business: Business;
}) {
  return (
    <header className="sticky top-0 z-30 bg-card border-b border-border">
      <div className="max-w-lg mx-auto flex items-center gap-3 px-4 py-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-none relative">
          <Image
            src={business.logo || '/img/logo-placeholder.png'}
            alt={business.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>· Panel de administracion</span>
          </div>
          <p className="text-sm font-bold text-primary-accent truncate">
            {business.name}
          </p>
        </div>

        <div className="flex-none flex items-center gap-3">
          <div className="text-right hidden xs:block">
            <p className="text-xs font-semibold text-card-foreground leading-tight">
              {user.name}
            </p>
            <p className="text-[11px] text-muted-foreground leading-tight">
              {user.email}
            </p>
          </div>

          <button
            aria-label="Cerrar sesión"
            className="w-9 h-9 rounded-full bg-secondary text-secondary-foreground hover:text-destructive hover:bg-accent flex items-center justify-center transition-colors"
          >
            <LogOut className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </header>
  );
}