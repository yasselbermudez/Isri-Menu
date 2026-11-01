interface AddToOrderBarProps {
  quantity: number;
  totalPrice: string;
  onAdd: () => void;
}

export function AddToOrderBar({ quantity, totalPrice, onAdd }: AddToOrderBarProps) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="mx-4 shadow-lg pb-3 pt-2.5 px-4 flex flex-col items-center active:bg-accent active:scale-95 transition-all disabled:opacity-70 disabled:active:scale-100 w-full bg-primary rounded-[33px]"
    >
      <div className="text-base font-semibold text-primary-foreground gap-2 flex items-center h-9 whitespace-nowrap">
        Añadir {quantity} al pedido <span>·</span>
        {totalPrice}
      </div>
    </button>
  );
}