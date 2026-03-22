import { db } from "@/lib/db";
import { PriceSort } from "@/components/price-sort";
import { DesktopCard } from "@/components/desktop-card";

export default async function DesktopsPage({
  searchParams,
}: {
  searchParams: { sort?: string };
}) {
  const order = searchParams.sort === "desc" ? "desc" : "asc";

  const desktops = await db.desktop.findMany({
    orderBy: { price: order },
  });

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Desktop PC</h1>
        <PriceSort />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {desktops.map((desktop) => (
          <DesktopCard
            key={desktop.id}
            id={desktop.id}
            name={desktop.name}
            slug={desktop.slug}
            price={desktop.price}
            cpu={desktop.cpu}
            ram={desktop.ram}
            ssd={desktop.ssd}
            gpu={desktop.gpu}
          />
        ))}
      </div>
    </main>
  );
}
