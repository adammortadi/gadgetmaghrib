import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  badge?: string;
  stock: number;
  backgroundColor?: string;
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: true,

  fetchProducts: async () => {
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      set({ products: data || [], isLoading: false });
    } catch (error) {
      console.error('Error fetching products:', error);
      set({ isLoading: false });
    }
  },

  addProduct: async (product) => {
    try {
      const { error } = await supabase.from('products').insert([product]);
      if (error) throw error;
      set((state) => ({ products: [product, ...state.products] }));
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  removeProduct: async (id) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
    } catch (error) {
      console.error('Error removing product:', error);
      throw error;
    }
  },
}));
