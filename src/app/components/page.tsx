import { db } from "@/lib/db";
import { PriceSort } from "@/components/price-sort";
import { ComponentCard } from "@/components/component-card";

export default async function ComponentsPage({
  searchParams,
}: {
  searchParams: { sort?: string };
}) {
  const order = searchParams.sort === "desc" ? "desc" : "asc";

  const products = await db.product.findMany({
    include: { category: true, brand: true },
    orderBy: { price: order },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">All Components</h1>
        <PriceSort />
      </div>
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
    </div>
  );
}
