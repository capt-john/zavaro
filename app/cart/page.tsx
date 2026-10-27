
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { products, formatPrice } from "@/lib/products";
import {
  getCart,
  saveCart as saveSharedCart,
  type CartItem,
} from "@/lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCart(getCart());
    setLoaded(true);
  }, []);

  function updateCart(nextCart: CartItem[]) {
    setCart(nextCart);
    saveSharedCart(nextCart);
  }

  function changeQuantity(
    productId: string,
    size: string,
    change: number
  ) {
    const updatedCart = cart
      .map((item) => {
        if (
          item.productId === productId &&
          item.size === size
        ) {
          return {
            ...item,
            quantity: item.quantity + change,
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  }

  function removeItem(productId: string, size: string) {
    updateCart(
      cart.filter(
        (item) =>
          !(item.productId === productId && item.size === size)
      )
    );
  }

  const cartItems = cart
    .map((item) => {
      const product = products.find(
        (product) => product.id === item.productId
      );

      return product ? { ...item, product } : null;
    })
    .filter((item) => item !== null);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const itemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f4f0] text-[#191918]">
        <p className="text-[10px] tracking-[0.3em]">
          ZAVARO — LOADING BAG
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f4f0] text-[#191918]">
      {/* Announcement */}
      <div className="bg-[#191918] px-4 py-3 text-center text-[9px] tracking-[0.18em] text-[#f5f4f0]/80">
        A CONSIDERED APPROACH TO EVERYDAY STYLE
      </div>

      {/* Header */}
      <header className="flex h-[76px] items-center justify-between border-b border-black/10 px-5 md:px-10">
        <Link
          href="/shop"
          className="flex items-center gap-2 text-[10px] tracking-[0.12em] transition-opacity hover:opacity-50"
        >
          <ArrowLeft size={15} strokeWidth={1.4} />
          CONTINUE SHOPPING
        </Link>

        <Link
          href="/"
          className="text-[25px] font-semibold tracking-[-0.09em]"
          aria-label="ZAVARO home"
        >
          ZAVARO
        </Link>

        <span className="text-[10px] tracking-[0.12em]">
          BAG ({itemCount})
        </span>
      </header>

      {/* Main content */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-20">
        <div className="mb-10 border-b border-black/15 pb-7 md:mb-14">
          <p className="mb-4 text-[9px] tracking-[0.25em] text-black/50">
            YOUR SELECTION
          </p>

          <h1 className="text-4xl font-light tracking-[-0.06em] md:text-6xl">
            Shopping bag
            <span className="ml-3 text-base text-black/40 md:text-xl">
              ({itemCount})
            </span>
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
            <ShoppingBag
              size={34}
              strokeWidth={1}
              className="mb-7 text-black/50"
            />

            <h2 className="mb-3 text-2xl font-light tracking-tight">
              Your bag is waiting.
            </h2>

            <p className="mb-8 max-w-sm text-sm leading-6 text-black/55">
              Discover considered essentials and find something
              that feels like you.
            </p>

            <Link
              href="/shop"
              className="border border-[#191918] px-9 py-4 text-[10px] tracking-[0.18em] transition-colors hover:bg-[#191918] hover:text-[#f5f4f0]"
            >
              EXPLORE THE COLLECTION
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_360px] lg:gap-20">
            {/* Products */}
            <div>
              <div className="mb-5 hidden grid-cols-[1fr_120px_100px] border-b border-black/15 pb-4 text-[9px] tracking-[0.16em] text-black/50 sm:grid">
                <span>PRODUCT</span>
                <span className="text-center">QUANTITY</span>
                <span className="text-right">TOTAL</span>
              </div>

              <div className="divide-y divide-black/10">
                {cartItems.map((item) => (
                  <article
                    key={`${item.productId}-${item.size}`}
                    className="grid grid-cols-[104px_1fr] gap-5 py-6 sm:grid-cols-[120px_1fr]"
                  >
                    <Link
                      href={`/shop/${item.product.id}`}
                      className="block aspect-[3/4] overflow-hidden bg-[#e9e7e1]"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <Link
                              href={`/shop/${item.product.id}`}
                              className="text-sm leading-6 transition-opacity hover:opacity-50"
                            >
                              {item.product.name}
                            </Link>

                            <p className="mt-1 text-xs text-black/50">
                              {item.product.category}
                            </p>

                            <p className="mt-3 text-[10px] tracking-[0.12em] text-black/65">
                              SIZE: {item.size}
                            </p>
                          </div>

                          <p className="shrink-0 text-xs sm:hidden">
                            {formatPrice(
                              item.product.price * item.quantity
                            )}
                          </p>
                        </div>

                        <p className="mt-3 text-xs text-black/60">
                          {formatPrice(item.product.price)} / item
                        </p>
                      </div>

                      <div className="mt-6 flex items-center justify-between gap-3">
                        <div className="flex h-9 items-center border border-black/15">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              changeQuantity(
                                item.productId,
                                item.size,
                                -1
                              )
                            }
                            className="flex h-full w-9 items-center justify-center transition-opacity hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <Minus size={12} />
                          </button>

                          <span className="min-w-7 text-center text-xs tabular-nums">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            aria-label="Increase quantity"
                            disabled={item.quantity >= 10}
                            onClick={() =>
                              changeQuantity(
                                item.productId,
                                item.size,
                                1
                              )
                            }
                            className="flex h-full w-9 items-center justify-center transition-opacity hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeItem(item.productId, item.size)
                          }
                          className="flex items-center gap-2 text-[9px] tracking-[0.12em] text-black/50 transition-colors hover:text-red-700"
                        >
                          <Trash2 size={13} strokeWidth={1.5} />
                          REMOVE
                        </button>
                      </div>
                    </div>

                    <p className="hidden text-right text-xs tabular-nums sm:block">
                      {formatPrice(
                        item.product.price * item.quantity
                      )}
                    </p>
                  </article>
                ))}
              </div>

              <Link
                href="/shop"
                className="mt-8 inline-flex items-center gap-2 text-[10px] tracking-[0.12em] text-black/60 transition-colors hover:text-black"
              >
                <ArrowLeft size={13} />
                CONTINUE SHOPPING
              </Link>
            </div>

            {/* Order summary */}
            <aside className="h-fit border border-black/10 p-6 md:p-8 lg:sticky lg:top-8">
              <p className="mb-7 text-[10px] tracking-[0.2em]">
                ORDER SUMMARY
              </p>

              <div className="flex justify-between gap-4 border-b border-black/10 pb-5 text-xs">
                <span className="text-black/60">
                  Subtotal · {itemCount} items
                </span>
                <span className="tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex justify-between gap-4 py-5 text-xs">
                <span className="text-black/60">Delivery</span>
                <span className="text-right text-black/50">
                  Calculated at checkout
                </span>
              </div>

              <div className="flex justify-between gap-4 border-t border-black/15 pt-5">
                <span className="text-xs tracking-[0.1em]">
                  ESTIMATED TOTAL
                </span>
                <span className="text-sm tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <p className="mt-4 text-[10px] leading-5 text-black/50">
                Delivery charges are not included in this estimate.
              </p>

              <button
                type="button"
                disabled
                className="mt-8 w-full cursor-not-allowed bg-[#191918]/40 px-5 py-5 text-[10px] tracking-[0.18em] text-white"
              >
                CHECKOUT — COMING SOON
              </button>

              <p className="mt-4 text-center text-[10px] leading-5 text-black/50">
                Secure checkout will be available once ordering
                and payment are configured.
              </p>
            </aside>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 px-5 py-8 md:px-10">
        <div className="flex flex-col items-center justify-between gap-4 text-[9px] tracking-[0.14em] text-black/50 sm:flex-row">
          <span>© 2026 ZAVARO</span>
          <span>CONSIDERED STYLE. EVERYDAY FORM.</span>
          <Link href="/shop" className="hover:text-black">
            SHOP THE COLLECTION
          </Link>
        </div>
      </footer>
    </main>
  );
}
