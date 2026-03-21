import Link from "next/link";
import { db } from "@/lib/db";
import { PriceSort } from "@/components/price-sort";

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
          <Link
            key={desktop.id}
            href={`/desktops/${desktop.slug}`}
            className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
              <span className="text-sm text-gray-400 font-medium">
                Desktop PC
              </span>
            </div>
            <div className="p-4">
              <div className="inline-block bg-black text-white text-sm font-bold px-3 py-1 rounded mb-3">
                {desktop.price.toLocaleString("de-DE", {
                  minimumFractionDigits: 2,
                })}{" "}
                &euro;
              </div>
              <h3 className="font-medium text-sm leading-tight mb-3">
                {desktop.name}
              </h3>
              <div className="space-y-1 text-xs text-gray-600">
                <p>
                  <span className="text-gray-400">CPU:</span>{" "}
                  <span className="font-medium text-gray-700">
                    {desktop.cpu}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">RAM:</span>{" "}
                  <span className="font-medium text-gray-700">
                    {desktop.ram}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">SSD:</span>{" "}
                  <span className="font-medium text-gray-700">
                    {desktop.ssd}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">GPU:</span>{" "}
                  <span className="font-medium text-gray-700">
                    {desktop.gpu}
                  </span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
