import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { SearchProvider } from "@/components/search-context";
import { CartProvider } from "@/components/cart-context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arvut1 — PC Components",
  description: "Desktop computers and PC components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <CartProvider>
          <SearchProvider>
            <Navbar />
            {children}
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}
