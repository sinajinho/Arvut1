import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getDbSlug, getCategoryLabel } from "@/lib/categories";
import { PriceSort } from "@/components/price-sort";
import { ComponentCard } from "@/components/component-card";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { sort?: string };
}) {
  const dbSlug = getDbSlug(params.category);
  if (!dbSlug) notFound();

  const label = getCategoryLabel(params.category)!;
  const order = searchParams.sort === "desc" ? "desc" : "asc";

  const products = await db.product.findMany({
    where: { category: { slug: dbSlug } },
    include: { category: true, brand: true },
    orderBy: { price: order },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{label}</h1>
        <PriceSort />
      </div>
      {products.length === 0 ? (
        <p className="text-gray-500">No products in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const specs: Record<string, string> = JSON.parse(product.specs);
            const specLines = Object.entries(specs).slice(0, 3) as [string, string][];

            return (
              <ComponentCard
                key={product.id}
                id={product.id}
                name={product.name}
                slug={product.slug}
                price={product.price}
                categoryName={product.category.name}
                specs={specLines}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
