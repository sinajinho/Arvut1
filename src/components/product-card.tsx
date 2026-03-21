import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  name: string;
  slug: string;
  price: number;
  category: string;
  brand: string;
}

export function ProductCard({
  name,
  slug,
  price,
  category,
  brand,
}: ProductCardProps) {
  return (
    <Link
      href={`/product/${slug}`}
      className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-square bg-gray-100 flex items-center justify-center">
        <span className="text-sm text-gray-400 font-medium">{category}</span>
      </div>
      <div className="p-4 space-y-2">
        <Badge variant="secondary" className="text-xs font-normal">
          {brand}
        </Badge>
        <h3 className="font-medium text-sm leading-tight line-clamp-2">
          {name}
        </h3>
        <p className="text-lg font-semibold">
          {price.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
        </p>
      </div>
    </Link>
  );
}
