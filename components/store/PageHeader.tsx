import Link from 'next/link';

export function PageHeader({
  title,
  subtitle,
  backHref,
}: {
  title: string;
  subtitle?: string;
  backHref: string;
}) {
  return (
    <header className="fixed top-0 inset-x-0 z-30 h-14 mx-auto max-w-lg flex items-center gap-3 px-3 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
      <Link
        href={backHref}
        aria-label="Atrás"
        className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 text-slate-700 dark:text-gray-200"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" fill="none">
          <path d="M15 6 9 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <div className="min-w-0">
        <h1 className="text-base font-bold text-emerald-500 leading-tight line-clamp-1">{title}</h1>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight line-clamp-1">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}