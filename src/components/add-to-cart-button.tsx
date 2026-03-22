"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "./cart-context";

interface AddToCartButtonProps {
  id: number;
  type: "product" | "desktop";
  name: string;
  slug: string;
  price: number;
}

export function AddToCartButton({ id, type, name, slug, price }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem({ id, type, name, slug, price })}
      className="w-full bg-black text-white rounded-lg py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors mb-3"
    >
      <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />
      Add to cart
    </button>
  );
}
