import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CatalogItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const initialCatalog: CatalogItem[] = [
  {
    id: 1,
    title: 'Adesivo Fosco',
    category: 'Impressão',
    image: 'https://picsum.photos/seed/print2/800/600',
    description: 'Impressão de alta qualidade em adesivo fosco para vitrines e painéis.',
  },
  {
    id: 2,
    title: 'Papel de Parede Geométrico',
    category: 'Papel de Parede',
    image: 'https://picsum.photos/seed/wallpaper1/800/600',
    description: 'Papel de parede com texturas geométricas modernas para escritórios.',
  },
  {
    id: 3,
    title: 'Lona Brilho 440g',
    category: 'Impressão',
    image: 'https://picsum.photos/seed/print3/800/600',
    description: 'Lona de alta resistência para fachadas e outdoors.',
  },
  {
    id: 4,
    title: 'Papel de Parede Floral',
    category: 'Papel de Parede',
    image: 'https://picsum.photos/seed/wallpaper2/800/600',
    description: 'Estampas florais exclusivas para ambientes internos.',
  },
  {
    id: 5,
    title: 'Adesivo Transparente',
    category: 'Impressão',
    image: 'https://picsum.photos/seed/print4/800/600',
    description: 'Adesivo transparente ideal para divisórias de vidro.',
  },
  {
    id: 6,
    title: 'Papel de Parede Infantil',
    category: 'Papel de Parede',
    image: 'https://picsum.photos/seed/wallpaper3/800/600',
    description: 'Decoração lúdica para quartos infantis e brinquedotecas.',
  },
  {
    id: 7,
    title: 'Banner Roll-up',
    category: 'Impressão',
    image: 'https://picsum.photos/seed/print5/800/600',
    description: 'Estrutura portátil com impressão em lona para eventos.',
  },
];

interface CatalogStore {
  items: CatalogItem[];
  addItem: (item: Omit<CatalogItem, 'id'>) => void;
  updateItem: (id: number, item: Partial<CatalogItem>) => void;
  deleteItem: (id: number) => void;
}

export const useCatalogStore = create<CatalogStore>()(
  persist(
    (set) => ({
      items: initialCatalog,
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, { ...item, id: Date.now() }],
        })),
      updateItem: (id, updatedItem) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, ...updatedItem } : i
          ),
        })),
      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
    }),
    {
      name: 'catalog-storage',
    }
  )
);
