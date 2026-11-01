import {Icons} from "../Icons"
import Link from 'next/link';

export default function CategoryHeader ({storeSlug,categorySlug,storeName}:{storeSlug:string,categorySlug:string,storeName:string}){

    return(
        <header 
            className="
                sticky top-0 z-30  h-14 w-full
                bg-card border-b border-border shadow-sm text-card-foreground
                flex px-4 items-center gap-2 ">
            <Link
                href={`/store/${storeSlug}`}
                aria-label="atras"
                className="flex-none flex items-center text-foreground"
            >
                <Icons.IcoArrowLeft className="h-6 w-6" />
            </Link>
            <div className="w-full min-w-0">
            <div className="line-clamp-1 text-muted-foreground text-xs pr-4">{storeName}</div>
            <h4 className="line-clamp-1 text-primary-accent font-bold text-sm uppercase">
                {categorySlug}
            </h4>
            </div>
            <div className="flex-none flex gap-4 items-center text-primary-accent">
            <button type="button" aria-label="Compartir categoría">
                <Icons.IcoShare className="w-6 h-6" />
            </button>
            <button type="button" aria-label="opciones">
                <Icons.IcoMenu className="w-6 h-6 fill-current" />
            </button>
            </div>
        </header>
    )
}