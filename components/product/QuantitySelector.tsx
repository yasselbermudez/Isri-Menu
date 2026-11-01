"use client";

import { useState } from "react";

interface QuantitySelectorProps {
  //quantity: number;
//onChange: (q: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);
  
  const dec = () => setQuantity(Math.max(min, quantity - 1));
  const inc = () => setQuantity(Math.min(max, quantity + 1));

  

  return (
    <div className="flex gap-2 mx-auto">
      <button
        type="button"
        disabled={quantity <= min}
        onClick={dec}
        aria-label="Disminuir"
        className="w-8 h-8 text-primary-foreground rounded-full bg-primary flex items-center disabled:opacity-50 active:bg-accent transition-colors"
      >
        <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="w-5 h-5 mx-auto">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>
      </button>

      <input
        type="text"
        inputMode="numeric"
        value={quantity}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10);
          if (!Number.isNaN(v) && v >= min && v <= max) setQuantity(v);
        }}
        className="text-center w-14 font-semibold text-xl text-primary-accent bg-transparent focus:outline-none"
        aria-label="cantidad"
      />

      <button
        type="button"
        onClick={inc}
        aria-label="Añadir"
        className="w-8 h-8 text-primary-foreground rounded-full bg-primary flex items-center active:bg-accent transition-colors"
      >
        <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-5 h-5 mx-auto">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </div>
  );
}