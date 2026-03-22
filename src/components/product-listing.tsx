"use client";

import { useState, useMemo } from "react";
import { FilterBar } from "./filter-bar";
import { ProductCard } from "./product-card";
import { useSearch } from "./search-context";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: { name: string; slug: string };
  brand: { name: string; slug: string };
}

interface ProductListingProps {
  products: Product[];
  categories: { id: number; name: string; slug: string }[];
  brands: { id: number; name: string; slug: string }[];
}

export function ProductListing({
  products,
  categories,
  brands,
}: ProductListingProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const { query } = useSearch();

  const availableBrands = useMemo(() => {
    if (selectedCategory === "all") return brands;
    const brandSlugs = new Set(
      products
        .filter((p) => p.category.slug === selectedCategory)
        .map((p) => p.brand.slug)
    );
    return brands.filter((b) => brandSlugs.has(b.slug));
  }, [selectedCategory, products, brands]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value !== "all") {
      const brandSlugs = new Set(
        products
          .filter((p) => p.category.slug === value)
          .map((p) => p.brand.slug)
      );
      if (selectedBrand !== "all" && !brandSlugs.has(selectedBrand)) {
        setSelectedBrand("all");
      }
    }
  };

  const filtered = products.filter((p) => {
    const matchCategory =
      selectedCategory === "all" || p.category.slug === selectedCategory;
    const matchBrand =
      selectedBrand === "all" || p.brand.slug === selectedBrand;
    const matchSearch =
      !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.name.toLowerCase().includes(query.toLowerCase());
    return matchCategory && matchBrand && matchSearch;
  });

  return (
    <>
      <FilterBar
        categories={categories}
        brands={availableBrands}
        selectedCategory={selectedCategory}
        selectedBrand={selectedBrand}
        onCategoryChange={handleCategoryChange}
        onBrandChange={setSelectedBrand}
      />

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          No products found matching your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              slug={product.slug}
              price={product.price}
              category={product.category.name}
              brand={product.brand.name}
            />
          ))}
        </div>
      )}
    </>
  );
}
