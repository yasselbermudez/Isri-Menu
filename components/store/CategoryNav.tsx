'use client';

import { useEffect, useRef, useState } from 'react';
import type { Category } from '../../lib/types';

// Header 56px + nav 56px. Ajusta si cambias alturas.
const OFFSET = 112;
// Ventana durante la cual ignoramos el scroll-spy tras un click
// (para no pelear con el scroll suave nativo).
const CLICK_SCROLL_TIMEOUT = 1000;

export function CategoryNav({ categories }: { categories: Category[] }) {
  // Estado inicial derivado del hash (para recargas / enlaces directos)
  const [active, setActive] = useState<string>(() => {
    if (typeof window === 'undefined') return categories[0]?.id ?? '';
    const slug = window.location.hash.replace('#', '').replace(/^cat-/, '');
    if (slug) {
      const cat = categories.find((c) => c.slug === slug);
      if (cat) return cat.id;
    }
    return categories[0]?.id ?? '';
  });

  const navRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const clickScrollUntil = useRef<number>(0);
  // Espejo de `active` para que el observer compare sin depender del closure
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Centra un chip en el contenedor horizontal SIN mover la página.
  // (scrollIntoView puede arrastrar el scroll vertical del documento.)
  const centerChip = (catId: string) => {
    const nav = navRef.current;
    const chip = chipRefs.current.get(catId);
    if (!nav || !chip) return;
    const navRect = nav.getBoundingClientRect();
    const chipRect = chip.getBoundingClientRect();
    const target =
      nav.scrollLeft +
      (chipRect.left - navRect.left) -
      (navRect.width - chipRect.width) / 2;
    nav.scrollTo({ left: target, behavior: 'smooth' });
  };

  // 1) Sincroniza desde la URL al montar, al cambiar el hash y al navegar atrás/adelante
  useEffect(() => {
    const syncFromHash = () => {
      const slug = window.location.hash.replace('#', '').replace(/^cat-/, '');
      if (!slug) return;
      const cat = categories.find((c) => c.slug === slug);
      if (!cat) return;                                        // hash inválido: no-op
      if (!document.getElementById(`cat-${slug}`)) return;    // sección ausente: no-op
      setActive(cat.id);
      centerChip(cat.id);
      // Nota: el navegador ya hizo el scroll nativo al ancla (y respeta scroll-margin-top)
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    window.addEventListener('popstate', syncFromHash);
    return () => {
      window.removeEventListener('hashchange', syncFromHash);
      window.removeEventListener('popstate', syncFromHash);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  // 2) Scroll-spy: resalta sección visible y actualiza la URL SIN ensuciar historial
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    categories.forEach((cat) => {
      const el = document.getElementById(`cat-${cat.slug}`);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          // Ignora observaciones mientras dura el scroll provocado por un click
          if (Date.now() < clickScrollUntil.current) return;

          // Sin cambios → no hacemos nada
          if (activeRef.current === cat.id) return;
          activeRef.current = cat.id;
          setActive(cat.id);

          // replaceState (NO push): el botón atrás sigue saliendo de la página
          const newHash = `#cat-${cat.slug}`;
          if (window.location.hash !== newHash) {
            history.replaceState(null, '', newHash);
          }
          centerChip(cat.id);
        },
        { rootMargin: `-${OFFSET}px 0px -60% 0px`, threshold: 0 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  // 3) Click en un chip → pushState + scroll nativo (respeta scroll-margin-top)
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    cat: Category
  ) => {
    const el = document.getElementById(`cat-${cat.slug}`);
    if (!el) {
      // Deja que el navegador lo intente y falle silenciosamente
      return;
    }
    e.preventDefault();
    clickScrollUntil.current = Date.now() + CLICK_SCROLL_TIMEOUT;

    // Una entrada de historial por click
    history.pushState(null, '', `#cat-${cat.slug}`);
    activeRef.current = cat.id;
    setActive(cat.id);
    centerChip(cat.id);

    // behavior: 'auto' → usa `scroll-behavior: smooth` del CSS
    // (y por tanto respeta prefers-reduced-motion)
    el.scrollIntoView({ block: 'start' });
  };

  return (
    <nav className="sticky top-14 z-20 bg-card border-b border-border">
      <div
        ref={navRef}
        className="flex overflow-x-auto scrollbar-hide px-4 py-3 gap-2"
      >
        {categories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <a
              key={cat.id}
              href={`#cat-${cat.slug}`}
              ref={(el) => {
                if (el) chipRefs.current.set(cat.id, el);
                else chipRefs.current.delete(cat.id);
              }}
              onClick={(e) => handleClick(e, cat)}
              aria-current={isActive ? 'true' : undefined}
              className={`whitespace-nowrap text-sm px-4 py-2 rounded-full border transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground border-primary font-semibold'
                  : 'text-foreground border-border hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              {cat.name}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

/* 
OLD
export function CategoryNav({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState<string>(categories[0]?.id ?? '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    categories.forEach((cat) => {
      const el = document.getElementById(`cat-${cat.slug}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(cat.id);
        },
        { rootMargin: '-120px 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [categories]);

  const scrollTo = (slug: string) => {
    document
      .getElementById(`cat-${slug}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="sticky top-14 z-20 bg-card border-b border-border">
      <div className="flex overflow-x-auto scrollbar-hide px-4 py-3 gap-2">
        {categories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => scrollTo(cat.slug)}
              className={`whitespace-nowrap text-sm px-4 py-2 rounded-full border transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground border-primary font-semibold'
                  : 'text-foreground border-border hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}*/