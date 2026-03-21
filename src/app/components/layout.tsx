import { ComponentsSidebar } from "@/components/components-sidebar";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex gap-8">
        <ComponentsSidebar />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </main>
  );
}
