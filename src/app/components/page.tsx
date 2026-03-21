import Link from "next/link";
import { db } from "@/lib/db";
import { PriceSort } from "@/components/price-sort";

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
          const specLines = Object.entries(specs).slice(0, 3);

          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                <span className="text-sm text-gray-400 font-medium">
                  {product.category.name}
                </span>
              </div>
              <div className="p-4">
                <div className="inline-block bg-black text-white text-sm font-bold px-3 py-1 rounded mb-3">
                  {product.price.toLocaleString("de-DE", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  &euro;
                </div>
                <h3 className="font-medium text-sm leading-tight mb-3">
                  {product.name}
                </h3>
                <div className="space-y-1 text-xs text-gray-600">
                  {specLines.map(([key, value]) => (
                    <p key={key}>
                      <span className="text-gray-400">{key}:</span>{" "}
                      <span className="font-medium text-gray-700">{value}</span>
                    </p>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
