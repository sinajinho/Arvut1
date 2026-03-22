"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "./cart-context";

interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  brand: string;
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  category,
  brand,
}: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/product/${slug}`}>
        <div className="aspect-square bg-gray-100 flex items-center justify-center">
          <span className="text-sm text-gray-400 font-medium">{category}</span>
        </div>
      </Link>
      <div className="p-4 space-y-2">
        <Link href={`/product/${slug}`}>
          <h3 className="font-medium text-sm leading-tight line-clamp-2">
            {name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold">
            {price.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
          </p>
          <Badge variant="secondary" className="text-xs font-normal">
            {brand}
          </Badge>
        </div>
        <button
          onClick={() => addItem({ id, type: "product", name, slug, price })}
          className="opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 hover:bg-gray-800 w-full justify-center"
        >
          <ShoppingCart className="h-3.5 w-3.5" strokeWidth={1.5} />
          Add to cart
        </button>
      </div>
    </div>
  );
}
