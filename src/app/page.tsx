import { db } from "@/lib/db";
import { ProductListing } from "@/components/product-listing";

export default async function Home() {
  const [products, categories, brands] = await Promise.all([
    db.product.findMany({
      include: { category: true, brand: true },
      orderBy: { price: "asc" },
    }),
    db.category.findMany({ orderBy: { name: "asc" } }),
    db.brand.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <ProductListing
        products={products.map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          price: p.price,
          category: { name: p.category.name, slug: p.category.slug },
          brand: { name: p.brand.name, slug: p.brand.slug },
        }))}
        categories={categories}
        brands={brands}
      />
    </main>
  );
}
