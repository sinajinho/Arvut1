import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { getDbSlug, getCategoryLabel } from "@/lib/categories";
import { PriceSort } from "@/components/price-sort";

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
                        <span className="font-medium text-gray-700">
                          {value}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
