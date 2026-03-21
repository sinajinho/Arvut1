"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { User, ShoppingBag, Search, X } from "lucide-react";
import { useSearch } from "./search-context";

const navLinks = [
  { label: "Components", href: "/components" },
  { label: "Desktop PC", href: "/desktops" },
  { label: "Deals", href: "/" },
  { label: "Support", href: "/" },
];

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { query, setQuery } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchAreaRef = useRef<HTMLDivElement>(null);

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
        </div>
        <div className="flex items-center gap-5">
          <button className="text-gray-600 hover:text-black transition-colors">
            <User className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button className="text-gray-600 hover:text-black transition-colors">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
          </button>
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
      </nav>
    </header>
  );
}
