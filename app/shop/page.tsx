"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Search,
  X,
  ShoppingBag,
} from "lucide-react";
import { products, formatPrice } from "@/lib/products";
import { useCartCount } from "@/lib/use-cart-count";

const categories = ["All", "Tops", "Bottoms", "Outerwear"];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("featured");
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const cartCount = useCartCount();

  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      const matchesSearch =
        !query ||
        `${product.name} ${product.category} ${product.description}`
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });

    if (sortOrder === "low") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "high") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [activeCategory, sortOrder, searchQuery]);

  return (
    <main id="top" className="min-h-screen bg-[#f5f4f0] text-[#191918]">
      {/* Announcement */}
      <div className="border-b border-black/10 px-5 py-3 text-center text-[9px] tracking-[0.22em] sm:text-[10px]">
        ZAVARO — A STUDY IN EVERYDAY DRESS
      </div>

      {/* Header */}
      <header className="flex items-center justify-between border-b border-black/10 px-5 py-6 sm:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-[10px] tracking-widest"
        >
          <ArrowLeft size={15} strokeWidth={1.3} />
          HOME
        </Link>

        <Link
          href="/"
          className="text-xl font-medium tracking-[0.3em] sm:text-2xl"
        >
          ZAVARO
        </Link>

        <Link
          href="/cart"
          aria-label={`Shopping bag, ${cartCount} items`}
          className="flex items-center gap-2 text-[10px] tracking-widest transition-opacity hover:opacity-50"
        >
          <ShoppingBag size={17} strokeWidth={1.3} />
          BAG ({cartCount})
        </Link>
      </header>

      {/* Collection introduction */}
      <section className="px-5 pb-12 pt-16 sm:px-10 sm:pb-16 sm:pt-24">
        <p className="mb-5 text-[10px] tracking-[0.25em] text-black/50">
          COLLECTION 001 / 2026
        </p>

        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h1 className="text-5xl font-light tracking-[-0.055em] sm:text-7xl lg:text-8xl">
              The collection.
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-black/60">
              Considered essentials. Restrained silhouettes.
              Pieces made to become part of your everyday.
            </p>
          </div>

          <p className="text-[10px] tracking-[0.18em] text-black/50">
            {visibleProducts.length.toString().padStart(2, "0")} PIECES
          </p>
        </div>
      </section>

      <div className="mx-5 border-t border-black/15 sm:mx-10" />

      {/* Filters and search */}
      <section className="px-5 py-7 sm:px-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`text-[10px] tracking-[0.16em] transition-colors ${
                    activeCategory === category
                      ? "border-b border-black pb-1"
                      : "text-black/45 hover:text-black"
                  }`}
                >
                  {category.toUpperCase()}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-3 text-[10px] tracking-widest">
              SORT
              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="max-w-44 cursor-pointer border-0 bg-transparent py-2 text-[10px] outline-none"
              >
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
              <ArrowDown size={12} />
            </label>
          </div>

          <div className="flex items-center gap-3 border-b border-black/25 pb-3 sm:max-w-md">
            <Search size={17} strokeWidth={1.4} />

            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search the collection"
              aria-label="Search shop products"
              className="w-full bg-transparent text-sm outline-none placeholder:text-black/40"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="text-black/50 transition-colors hover:text-black"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Product grid */}
      {visibleProducts.length > 0 ? (
        <section className="grid grid-cols-2 gap-x-3 gap-y-10 px-3 pb-24 sm:gap-x-5 sm:gap-y-14 sm:px-10 lg:grid-cols-4">
          {visibleProducts.map((product, index) => (
            <article key={product.id} className="group">
              <Link
                href={`/shop/${product.id}`}
                className="relative block overflow-hidden bg-[#e9e7e1]"
                aria-label={`View ${product.name}`}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    loading={index < 2 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f4f0] transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={16} strokeWidth={1.2} />
                </span>
              </Link>

              <div className="flex items-start justify-between gap-2 pt-4">
                <div>
                  <p className="text-[9px] tracking-[0.16em] text-black/45">
                    {product.category.toUpperCase()}
                  </p>

                  <h2 className="mt-2 text-xs font-normal sm:text-sm">
                    {product.name}
                  </h2>
                </div>

                <p className="shrink-0 pt-5 text-[10px] sm:text-xs">
                  {formatPrice(product.price)}
                </p>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="flex min-h-[300px] flex-col items-center justify-center px-5 pb-20 text-center">
          <p className="text-[10px] tracking-[0.22em] text-black/45">
            NO MATCHES FOUND
          </p>

          <h2 className="mt-4 text-3xl font-light tracking-tight">
            Nothing here just yet.
          </h2>

          <p className="mt-3 max-w-sm text-sm leading-6 text-black/55">
            Try a different search or explore the full collection.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
            }}
            className="mt-7 border border-black px-6 py-4 text-[10px] tracking-[0.16em] transition-colors hover:bg-black hover:text-white"
          >
            CLEAR FILTERS
          </button>
        </section>
      )}

      {/* Footer */}
      <footer className="flex flex-col justify-between gap-5 border-t border-black/15 px-5 py-8 text-[9px] tracking-[0.16em] text-black/55 sm:flex-row sm:items-center sm:px-10">
        <Link href="/" className="text-lg tracking-[0.25em] text-black">
          ZAVARO
        </Link>

        <p>© 2026 ZAVARO. ALL RIGHTS RESERVED.</p>

        <a href="#top" className="hover:text-black">
          BACK TO TOP ↑
        </a>
      </footer>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f5f4f0] text-[#191918]">
          <p className="text-[10px] tracking-[0.2em]">
            ZAVARO — LOADING COLLECTION
          </p>
        </main>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
