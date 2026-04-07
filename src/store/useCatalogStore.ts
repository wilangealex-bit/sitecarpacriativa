import { create } from 'zustand';
import { db } from '../lib/firebase';
import { ref, onValue, push, set as firebaseSet, update, remove } from 'firebase/database';

export interface CatalogItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

interface CatalogStore {
  items: CatalogItem[];
  isLoading: boolean;
  error: string | null;
  fetchItems: () => void;
  addItem: (item: Omit<CatalogItem, 'id'>) => Promise<void>;
  updateItem: (id: string, item: Partial<CatalogItem>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}

export const useCatalogStore = create<CatalogStore>((set) => ({
  items: [],
  isLoading: false,
  error: null,

  fetchItems: () => {
    set({ isLoading: true });
    const catalogRef = ref(db, 'catalog');
    const unsubscribe = onValue(catalogRef, (snapshot) => {
      const items: CatalogItem[] = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          items.push({ id: childSnapshot.key, ...childSnapshot.val() } as CatalogItem);
        });
      }
      set({ items, isLoading: false, error: null });
    }, (error) => {
      console.error("Error fetching catalog:", error);
      set({ error: error.message, isLoading: false });
    });
    
    return () => unsubscribe();
  },

  addItem: async (item) => {
    try {
      const newRef = push(ref(db, 'catalog'));
      await firebaseSet(newRef, item);
    } catch (error: any) {
      console.error("Error adding catalog item:", error);
      set({ error: error.message });
    }
  },

  updateItem: async (id, updatedItem) => {
    try {
      const itemRef = ref(db, `catalog/${id}`);
      await update(itemRef, updatedItem);
    } catch (error: any) {
      console.error("Error updating catalog item:", error);
      set({ error: error.message });
    }
  },

  deleteItem: async (id) => {
    try {
      await remove(ref(db, `catalog/${id}`));
    } catch (error: any) {
      console.error("Error deleting catalog item:", error);
      set({ error: error.message });
    }
  },
}));
