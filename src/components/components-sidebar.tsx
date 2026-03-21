"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/categories";

export function ComponentsSidebar() {
  const pathname = usePathname();

  const isAll = pathname === "/components";

  return (
    <nav className="w-52 shrink-0">
      <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-4">
        Categories
      </h2>
      <ul className="space-y-1">
        <li>
          <Link
            href="/components"
            className={`block px-3 py-2 rounded-md text-sm transition-colors ${
              isAll
                ? "bg-gray-100 font-semibold text-black"
                : "text-gray-600 hover:text-black hover:bg-gray-50"
            }`}
          >
            All Components
          </Link>
        </li>
        {categories.map((cat) => {
          const active = pathname === `/components/${cat.urlSlug}`;
          return (
            <li key={cat.urlSlug}>
              <Link
                href={`/components/${cat.urlSlug}`}
                className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                  active
                    ? "bg-gray-100 font-semibold text-black"
                    : "text-gray-600 hover:text-black hover:bg-gray-50"
                }`}
              >
                {cat.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
