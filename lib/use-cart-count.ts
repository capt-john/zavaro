"use client";

import { useEffect, useState } from "react";
import { getCartCount } from "@/lib/cart";

export function useCartCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => setCount(getCartCount());

    updateCount();

    window.addEventListener("zavaro-cart-updated", updateCount);
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener("zavaro-cart-updated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  return count;
}