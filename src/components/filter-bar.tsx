"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  categories: { id: number; name: string; slug: string }[];
  brands: { id: number; name: string; slug: string }[];
  selectedCategory: string;
  selectedBrand: string;
  onCategoryChange: (value: string) => void;
  onBrandChange: (value: string) => void;
}

export function FilterBar({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  onCategoryChange,
  onBrandChange,
}: FilterBarProps) {
  return (
    <div className="py-10 space-y-2">
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-light text-black">
          I&apos;m looking for
        </span>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="text-4xl font-light h-auto border-0 bg-transparent p-0 text-gray-300 hover:text-gray-400 transition-colors focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Any Component" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Component</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-light text-black">from</span>
        <Select value={selectedBrand} onValueChange={onBrandChange}>
          <SelectTrigger className="text-4xl font-light h-auto border-0 bg-transparent p-0 text-gray-300 hover:text-gray-400 transition-colors focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Any Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Brand</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={brand.slug}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
