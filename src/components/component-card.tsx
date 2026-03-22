"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./cart-context";

interface ComponentCardProps {
  id: number;
  name: string;
  slug: string;
  price: number;
  categoryName: string;
  specs: [string, string][];
}

export function ComponentCard({
  id,
  name,
  slug,
  price,
  categoryName,
  specs,
}: ComponentCardProps) {
  const { addItem } = useCart();

  return (
    <div className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/product/${slug}`}>
        <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
          <span className="text-sm text-gray-400 font-medium">
            {categoryName}
          </span>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="inline-block bg-black text-white text-sm font-bold px-3 py-1 rounded">
            {price.toLocaleString("de-DE", {
              minimumFractionDigits: 2,
            })}{" "}
            &euro;
          </div>
          <button
            onClick={() => addItem({ id, type: "product", name, slug, price })}
            className="opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 hover:bg-gray-800"
          >
            <ShoppingCart className="h-3.5 w-3.5" strokeWidth={1.5} />
            Add to cart
          </button>
        </div>
        <Link href={`/product/${slug}`}>
          <h3 className="font-medium text-sm leading-tight mb-3">{name}</h3>
        </Link>
        <div className="space-y-1 text-xs text-gray-600">
          {specs.map(([key, value]) => (
            <p key={key}>
              <span className="text-gray-400">{key}:</span>{" "}
              <span className="font-medium text-gray-700">{value}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
