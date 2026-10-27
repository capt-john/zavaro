
export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "zv-001",
    name: "Essential Oversized Tee",
    category: "Tops",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    description: "A considered everyday essential with a relaxed silhouette.",
  },
  {
    id: "zv-002",
    name: "Structured Everyday Jacket",
    category: "Outerwear",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85",
    description: "Clean lines and versatile styling for everyday wear.",
  },
  {
    id: "zv-003",
    name: "Relaxed Tailored Trousers",
    category: "Bottoms",
    price: 3200,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85",
    description: "An understated silhouette designed for effortless styling.",
  },
  {
    id: "zv-004",
    name: "Minimal Everyday Shirt",
    category: "Tops",
    price: 2400,
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=85",
    description: "A refined wardrobe staple with a timeless finish.",
  },
];

export function formatPrice(price: number) {
  return `ETB ${price.toLocaleString("en-US")}`;
}
