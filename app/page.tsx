"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartCount } from "@/lib/use-cart-count";
import { products, formatPrice } from "@/lib/products";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  ArrowUpRight,
  Plus,
} from "lucide-react";

const links = [
  { label: "New Arrivals", href: "/shop" },
  { label: "Shop All", href: "/shop" },
  { label: "Essentials", href: "/shop" },
  { label: "Our Story", href: "#story" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
const [searchOpen, setSearchOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState("");
const cartCount = useCartCount();

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f4f0] text-[#191918]">
      {/* Announcement */}
      <div className="flex h-8 items-center justify-center bg-[#191918] px-3 text-center text-[9px] tracking-[0.2em] text-white sm:text-[10px]">
        INTRODUCING ZAVARO — THE FIRST COLLECTION
      </div>

      {/* Header */}
      <header className="relative z-40 bg-[#f5f4f0]">
        <div className="flex h-[76px] items-center justify-between border-b border-black/10 px-5 sm:px-10 lg:px-14">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
            <span className="hidden text-[10px] tracking-[0.16em] sm:block">
              {menuOpen ? "CLOSE" : "MENU"}
            </span>
          </button>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-[22px] font-medium tracking-[0.28em] sm:text-[26px]"
          >
            ZAVARO
          </Link>

          <div className="flex items-center gap-5 sm:gap-7">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-expanded={searchOpen}
            >
              <Search size={19} strokeWidth={1.4} />
            </button>

            <Link
              href="/cart"
              aria-label={`Shopping bag, ${cartCount} items`}
              className="flex items-center gap-2"
            >
              <ShoppingBag size={19} strokeWidth={1.4} />
              <span className="text-[10px] tabular-nums">{cartCount}</span>
            </Link>
          </div>
        </div>

        {/* Navigation menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 top-full w-full overflow-hidden border-b border-black/10 bg-[#f5f4f0]"
            >
              <div className="grid gap-7 px-6 py-10 sm:px-12 sm:py-14">
                <p className="text-[9px] tracking-[0.24em] text-black/45">
                  EXPLORE ZAVARO
                </p>

                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center justify-between text-2xl font-light tracking-tight sm:text-4xl"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={21}
                      className="opacity-40 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Search panel */}
        <AnimatePresence>
  {searchOpen && (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="absolute left-0 top-full w-full border-b border-black/10 bg-[#f5f4f0] px-6 py-7 sm:px-12"
    >
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-4 border-b border-black/30 pb-3">
          <Search size={18} />

          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            autoFocus
            placeholder="Search the collection"
            aria-label="Search products"
            className="w-full bg-transparent text-sm outline-none placeholder:text-black/40"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <X size={17} />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setSearchOpen(false);
              setSearchQuery("");
            }}
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {searchQuery.trim() && (
          <div className="pt-5">
            {products
              .filter((product) =>
                `${product.name} ${product.category}`
                  .toLowerCase()
                  .includes(searchQuery.trim().toLowerCase())
              )
              .map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.id}`}
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="flex items-center justify-between border-b border-black/10 py-4 text-sm transition-opacity hover:opacity-60"
                >
                  <span>{product.name}</span>
                  <span className="text-xs text-black/55">
                    {formatPrice(product.price)}
                  </span>
                </Link>
              ))}

            {products.filter((product) =>
              `${product.name} ${product.category}`
                .toLowerCase()
                .includes(searchQuery.trim().toLowerCase())
            ).length === 0 && (
              <p className="py-5 text-sm text-black/50">
                No products found. Try another search.
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )}
</AnimatePresence>

      </header>

      {/* Hero campaign */}
      <section className="relative mx-3 mt-3 h-[72vh] min-h-[520px] overflow-hidden bg-[#b7b1a8] sm:mx-5 sm:mt-5 sm:h-[84vh]">
        <img
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2200&q=90"
          alt="Fashion campaign for the ZAVARO collection"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-x-0 top-6 flex justify-between px-5 text-[9px] tracking-[0.17em] text-white sm:px-8">
          <span>COLLECTION 001</span>
          <span>CONTEMPORARY WARDROBE</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-x-0 bottom-12 px-5 text-center text-white sm:bottom-16"
        >
          <p className="mb-5 text-[9px] tracking-[0.3em] sm:text-[11px]">
            FORM / FUNCTION / FEELING
          </p>

          <h1 className="text-5xl font-light leading-[0.98] tracking-[-0.045em] sm:text-7xl lg:text-[100px]">
            A study in
            <br />
            simplicity.
          </h1>

          <Link
            href="/shop"
className="mt-8 inline-flex min-h-12 items-center gap-5 border border-white/70 bg-transparent px-6 text-[9px] text-white tracking-[0.2em] transition-colors duration-300 hover:bg-white hover:!text-black sm:px-8 sm:text-[10px]"          >
            DISCOVER THE COLLECTION
            <ArrowUpRight size={15} />
          </Link>
        </motion.div>
      </section>

      {/* Editorial introduction */}
      <section
        id="story"
        className="grid scroll-mt-8 gap-8 px-5 py-20 sm:px-10 sm:py-28 lg:grid-cols-2 lg:items-end lg:px-14"
      >
        <p className="text-[9px] tracking-[0.24em] text-black/45">
          AN EXERCISE IN RESTRAINT — 001
        </p>

        <p className="max-w-xl text-xl font-light leading-relaxed tracking-tight sm:text-2xl lg:justify-self-end">
          Clothing without excess. Form without distraction. A modern
          wardrobe built around the pieces you return to.
        </p>
      </section>

      {/* Collection */}
      <section
        id="collection"
        className="scroll-mt-8 px-5 pb-20 sm:px-10 sm:pb-28 lg:px-14"
      >
        <div className="mb-8 flex items-end justify-between border-b border-black/15 pb-5 sm:mb-10">
          <div>
            <p className="mb-3 text-[9px] tracking-[0.22em] text-black/45">
              SEASONAL SELECTION
            </p>

            <h2 className="text-3xl font-light tracking-tight sm:text-5xl">
              The collection
            </h2>
          </div>

          <Link
            href="/shop"
            className="flex items-center gap-2 pb-1 text-[9px] tracking-[0.14em] sm:text-[10px]"
          >
            VIEW ALL <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-14 lg:grid-cols-4">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group"
            >
              <Link
                href={`/shop/${product.id}`}
                className="block"
                aria-label={`View ${product.name}`}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#e7e4dd]">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />

                  <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f4f0] transition-transform duration-300 group-hover:rotate-90">
                    <Plus size={17} strokeWidth={1.3} />
                  </span>
                </div>

                <div className="pt-4">
                  <p className="mb-2 text-[8px] tracking-[0.16em] text-black/45 sm:text-[9px]">
                    {product.category.toUpperCase()}
                  </p>

                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                    <h3 className="text-xs font-normal sm:text-sm">
                      {product.name}
                    </h3>

                    <p className="text-xs sm:whitespace-nowrap">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Closing campaign */}
      <section className="relative mx-3 mb-3 min-h-[380px] overflow-hidden bg-[#d7d1c7] sm:mx-5 sm:mb-5 sm:min-h-[480px]">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=85"
          alt="Contemporary fashion editorial"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="relative flex min-h-[380px] flex-col items-center justify-center px-5 py-16 text-center text-white sm:min-h-[480px]">
          <p className="mb-5 text-[9px] tracking-[0.26em]">
            THE ZAVARO POINT OF VIEW
          </p>

          <h2 className="text-4xl font-light tracking-tight sm:text-6xl">
            Wear what remains.
          </h2>

          <Link
            href="/shop"
className="mt-8 border border-white/70 bg-transparent px-7 py-4 text-[9px] text-white tracking-[0.18em] transition-colors hover:bg-white hover:!text-black"          >
            EXPLORE ZAVARO
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-5 pb-8 pt-12 sm:px-10 sm:pt-16 lg:px-14">
        <div className="grid gap-10 border-b border-black/15 pb-10 sm:grid-cols-2">
          <div>
            <Link
              href="/"
              className="text-2xl font-medium tracking-[0.25em]"
            >
              ZAVARO
            </Link>

            <p className="mt-4 max-w-xs text-xs leading-6 text-black/50">
              A considered approach to contemporary fashion. Designed around
              the essentials.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-[9px] tracking-[0.13em] sm:justify-self-end sm:gap-16">
            <div className="flex flex-col gap-4">
              <p className="mb-1 text-black/40">EXPLORE</p>
              <Link href="/shop">COLLECTION</Link>
              <Link href="#story">OUR STORY</Link>
              <Link href="/contact">CONTACT</Link>
            </div>

            <div className="flex flex-col gap-4">
              <p className="mb-1 text-black/40">INFORMATION</p>
              <Link href="/shipping">SHIPPING</Link>
              <Link href="/returns">RETURNS</Link>
              <Link href="/privacy">PRIVACY</Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-5 text-[8px] tracking-[0.13em] text-black/45 sm:flex-row sm:justify-between">
          <p>© 2026 ZAVARO. ALL RIGHTS RESERVED.</p>
          <p>MADE WITH INTENTION.</p>
        </div>
      </footer>
    </main>
  );
}
