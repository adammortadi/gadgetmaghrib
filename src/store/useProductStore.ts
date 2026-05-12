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
  customHtml?: string;
  customCss?: string;
  created_at?: string;
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
}

type ProductRecord = Omit<Product, 'backgroundColor' | 'customHtml' | 'customCss'>;

const PRODUCT_COLUMNS = 'id,name,price,image,images,rating,reviews,badge,stock,created_at';

function toProductRecord(product: Product): ProductRecord {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    images: product.images,
    rating: product.rating,
    reviews: product.reviews,
    badge: product.badge,
    stock: product.stock,
    created_at: product.created_at,
  };
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: true,

  fetchProducts: async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(PRODUCT_COLUMNS)
        .order('created_at', { ascending: false });
      if (error) throw error;
      set({ products: data || [], isLoading: false });
    } catch (error) {
      console.error('Error fetching products:', error);
      set({ isLoading: false });
    }
  },

  addProduct: async (product) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([toProductRecord(product)])
        .select(PRODUCT_COLUMNS)
        .single();
      if (error) throw error;
      set((state) => ({ products: [data || toProductRecord(product), ...state.products] }));
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
