
"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { products, formatPrice } from "@/lib/products";
import { getCart, saveCart } from "@/lib/cart";
import { useCartCount } from "@/lib/use-cart-count";

type CartItem = {
  productId: string;
  quantity: number;
  size: string;
};

export default function ProductPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f5f4f0] text-[#191918]">
          <p className="text-xs tracking-[0.2em]">
            ZAVARO — LOADING
          </p>
        </main>
      }
    >
      <ProductPageContent />
    </Suspense>
  );
}

function ProductPageContent() {
  const cartCount = useCartCount();
  const params = useParams<{ id: string }>();
  const product = products.find((item) => item.id === params.id);

  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setAdded(false);
  }, [size, quantity]);

  function addToBag() {
  if (!product) return;

  const cart = getCart();

  const existing = cart.find(
    (item) => item.productId === product.id && item.size === size
  );

  if (existing) {
    saveCart(
      cart.map((item) =>
        item.productId === product.id && item.size === size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    );
  } else {
    saveCart([...cart, { productId: product.id, quantity, size }]);
  }

  setAdded(true);
}

  if (!product) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f5f4f0] px-6 text-[#191918]">
        <p className="text-xs tracking-[0.2em]">ZAVARO / COLLECTION 001</p>
        <h1 className="mt-6 text-4xl font-light">Product not found.</h1>
        <Link href="/shop" className="mt-8 border border-black px-6 py-4 text-xs tracking-widest">
          RETURN TO SHOP
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f4f0] text-[#191918]">
      <div className="border-b border-black/10 px-5 py-3 text-center text-[9px] tracking-[0.2em]">
        ZAVARO — CONSIDERED EVERYDAY DRESS
      </div>

      <header className="flex items-center justify-between border-b border-black/10 px-5 py-6 sm:px-10">
        <Link href="/shop" className="flex items-center gap-2 text-[10px] tracking-widest">
          <ArrowLeft size={15} />
          SHOP
        </Link>

        <Link href="/" className="text-xl tracking-[0.3em]">
          ZAVARO
        </Link>

        <Link href="/cart" aria-label={`Shopping bag, ${cartCount} items`}>
  <span className="relative inline-flex">
    <ShoppingBag size={19} strokeWidth={1.3} />

    <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#191918] px-1 text-[9px] text-white">
      {cartCount}
    </span>
  </span>
</Link>
      </header>


      <section className="grid grid-cols-1 gap-10 px-5 pb-20 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className="bg-[#e9e7e1]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="aspect-[3/4] w-full object-cover"
          />
        </div>

        <div className="flex flex-col pt-2 lg:sticky lg:top-10 lg:h-fit lg:pt-12">
          <p className="text-[10px] tracking-[0.22em] text-black/50">
            {product.category.toUpperCase()} / COLLECTION 001
          </p>

          <h1 className="mt-5 max-w-xl text-4xl font-light leading-tight tracking-[-0.045em] sm:text-5xl">
            {product.name}
          </h1>

          <p className="mt-6 text-sm">
            {formatPrice(product.price)}
          </p>

          <div className="my-8 border-t border-black/15" />

          <p className="max-w-md text-sm leading-7 text-black/65">
            {product.description}
          </p>

          <div className="mt-10">
            <div className="flex items-center justify-between">
              <p className="text-[10px] tracking-[0.18em]">SELECT SIZE</p>
              <p className="text-[10px] text-black/45">Size guide coming soon</p>
            </div>

           
<div className="mt-4 grid grid-cols-4 gap-2">
  {["S", "M", "L", "XL"].map((option) => (
    <button
      key={option}
      onClick={() => setSize(option)}
      aria-pressed={size === option}
      className={`border py-4 text-xs transition-colors duration-300 ${
        size === option
          ? "!border-[#191918] !bg-[#191918] !text-[#f5f4f0]"
          : "border-black/20 bg-transparent text-[#191918] hover:!border-[#191918] hover:!bg-[#e9e7e1] hover:!text-[#191918]"
      }`}
    >
      {option}
    </button>
  ))}
</div>

          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="text-[10px] tracking-[0.18em]">QUANTITY</p>

            <div className="flex items-center gap-6 border border-black/20 px-4 py-3">
              <button
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={13} />
              </button>

              <span className="min-w-3 text-center text-xs">{quantity}</span>

              <button
                onClick={() => setQuantity((value) => Math.min(10, value + 1))}
                aria-label="Increase quantity"
              >
                <Plus size={13} />
              </button>
            </div>
          </div>

          

<button
  onClick={addToBag}
  className="mt-8 flex w-full items-center justify-center gap-3 border border-[#191918] bg-[#191918] px-6 py-5 text-[10px] font-medium tracking-[0.2em] !text-[#f5f4f0] transition-colors duration-300 hover:!bg-[#292927] hover:!text-[#f5f4f0]"
>
  <ShoppingBag size={16} strokeWidth={1.4} />
  {added
    ? "ADDED TO BAG ✓"
    : "ADD TO BAG — " + formatPrice(product.price * quantity)}
</button>

          {added && (
            <Link
              href="/cart"
              className="mt-4 border border-black/20 px-6 py-4 text-center text-[10px] tracking-[0.18em] transition-colors hover:border-black"
            >
              VIEW YOUR BAG
            </Link>
          )}

          <div className="mt-8 border-t border-black/15 pt-5">
            <p className="text-xs leading-6 text-black/55">
              Designed for everyday wear. Product availability, fabric details,
              and delivery information should be confirmed before launch.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/15 px-5 py-8 text-[9px] tracking-widest text-black/50 sm:px-10">
        © 2026 ZAVARO. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}
