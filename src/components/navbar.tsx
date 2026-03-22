"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { User, ShoppingBag, Search, X, Minus, Plus, Trash2 } from "lucide-react";
import { useSearch } from "./search-context";
import { useCart } from "./cart-context";

const navLinks = [
  { label: "Components", href: "/components" },
  { label: "Desktop PC", href: "/desktops" },
  { label: "Deals", href: "/" },
  { label: "Support", href: "/" },
];

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { query, setQuery } = useSearch();
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCart();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchAreaRef = useRef<HTMLDivElement>(null);
  const cartAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
    }
  }, [searchOpen]);

  const handleClose = useCallback(() => {
    setSearchOpen(false);
    setQuery("");
  }, [setQuery]);

  useEffect(() => {
    if (!searchOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (searchAreaRef.current && !searchAreaRef.current.contains(e.target as Node)) {
        handleClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen, handleClose]);

  useEffect(() => {
    if (!cartOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (cartAreaRef.current && !cartAreaRef.current.contains(e.target as Node)) {
        setCartOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cartOpen]);

  return (
    <header className="border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Arvut1
          </Link>
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div ref={searchAreaRef} className="flex items-center">
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{ width: searchOpen ? "200px" : "0px" }}
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full border-b border-gray-300 bg-transparent py-1 text-sm outline-none placeholder:text-gray-400"
                />
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
            {!searchOpen && (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Search className="h-5 w-5" strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button className="text-gray-600 hover:text-black transition-colors">
            <User className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <div ref={cartAreaRef} className="relative flex items-center">
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="text-gray-600 hover:text-black transition-colors relative"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            {cartOpen && (
              <div className="absolute right-0 top-10 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-sm">
                    Shopping Cart ({totalItems})
                  </h3>
                </div>

                {items.length === 0 ? (
                  <div className="p-6 text-center text-sm text-gray-500">
                    Your cart is empty
                  </div>
                ) : (
                  <>
                    <div className="max-h-72 overflow-y-auto">
                      {items.map((item) => (
                        <div
                          key={`${item.type}-${item.id}`}
                          className="p-4 border-b border-gray-50 last:border-0"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <Link
                              href={item.type === "desktop" ? `/desktops/${item.slug}` : `/product/${item.slug}`}
                              onClick={() => setCartOpen(false)}
                              className="text-sm font-medium hover:underline leading-tight flex-1 mr-2"
                            >
                              {item.name}
                            </Link>
                            <button
                              onClick={() => removeItem(item.id, item.type)}
                              className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)}
                                className="h-6 w-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-sm w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)}
                                className="h-6 w-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="text-sm font-medium">
                              {(item.price * item.quantity).toLocaleString("de-DE", {
                                style: "currency",
                                currency: "EUR",
                              })}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium">Total</span>
                        <span className="text-base font-bold">
                          {totalPrice.toLocaleString("de-DE", {
                            style: "currency",
                            currency: "EUR",
                          })}
                        </span>
                      </div>
                      <button className="w-full bg-black text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors">
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
