interface ProductInfoProps {
  name: string;
  price: string;
}

export function ProductInfo({ name, price }: ProductInfoProps) {
  return (
    <section className="px-4 pt-4 flex flex-col">
      <div className="text-base flex gap-2 flex-wrap mt-2">
        <span className="text-primary-accent font-semibold">{price}</span>
      </div>
      <div className="break-words">
        <h1 className="text-2xl font-semibold text-foreground leading-tight">
          {name}
        </h1>
      </div>
    </section>
  );
}