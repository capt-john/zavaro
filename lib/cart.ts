export type CartItem = {
  productId: string;
  quantity: number;
  size: string;
};

const CART_KEY = "zavaro-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? (JSON.parse(saved) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("zavaro-cart-updated"));
}

export function getCartCount(): number {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}