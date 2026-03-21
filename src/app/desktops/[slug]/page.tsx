import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { ChevronRight, ShoppingCart, Zap } from "lucide-react";

export default async function DesktopDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const desktop = await db.desktop.findUnique({
    where: { slug: params.slug },
  });

  if (!desktop) notFound();

  const specsObj: Record<string, string> = JSON.parse(desktop.specs);
  const specsEntries = Object.entries(specsObj);

  // Quick highlights: CPU, RAM, SSD, GPU
  const highlights = [
    { label: "CPU", value: desktop.cpu },
    { label: "RAM", value: desktop.ram },
    { label: "SSD", value: desktop.ssd },
    { label: "GPU", value: desktop.gpu },
  ];

  return (
    <main className="max-w-6xl mx-auto px-6 py-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/desktops" className="hover:text-black transition-colors">
          Desktop PC
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-black">{desktop.name}</span>
      </nav>

      {/* Product layout: 3 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-8">
        {/* Left: Image placeholder */}
        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center max-h-[280px]">
          <span className="text-gray-400 text-sm font-medium">Desktop PC</span>
        </div>

        {/* Middle: Product info */}
        <div>
          <h1 className="text-2xl font-bold leading-tight mb-4">
            {desktop.name}
          </h1>

          {/* Quick spec chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {highlights.map((h) => (
              <span
                key={h.label}
                className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-sm"
              >
                <span className="text-gray-500">{h.label}:</span>{" "}
                <span className="font-medium">{h.value}</span>
              </span>
            ))}
          </div>

          {/* Description */}
          {desktop.description && (
            <p className="text-gray-600 leading-relaxed mb-8">
              {desktop.description}
            </p>
          )}

          {/* Technical Details */}
          {specsEntries.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Technical Details</h2>
              <table className="w-full">
                <tbody>
                  {specsEntries.map(([key, value], i) => (
                    <tr
                      key={key}
                      className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="py-2.5 px-3 text-sm text-gray-500 font-medium w-2/5">
                        {key.toUpperCase()}
                      </td>
                      <td className="py-2.5 px-3 text-sm text-right">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right: Price & actions */}
        <div>
          <div className="border border-gray-200 rounded-lg p-6 sticky top-6">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Price
            </p>
            <p className="text-3xl font-bold mb-6">
              {desktop.price.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </p>

            <button className="w-full bg-black text-white rounded-lg py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors mb-3">
              <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />
              Add to cart
            </button>

            <button className="w-full border border-gray-300 rounded-lg py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <Zap className="h-4 w-4" strokeWidth={1.5} />
              Buy now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
