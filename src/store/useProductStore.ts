import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string; // Keep this as the main thumbnail
  images?: string[]; // Array of additional images
  rating: number;
  reviews: number;
  badge?: string;
  stock: number;
}

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  setProducts: (products: Product[]) => void;
}

const INITIAL_PRODUCTS: Product[] = [];

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: INITIAL_PRODUCTS,
      addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
      removeProduct: (id) => set((state) => ({ products: state.products.filter(p => p.id !== id) })),
      setProducts: (products) => set({ products }),
    }),
    {
      name: 'gdm-products-storage',
    }
  )
);
