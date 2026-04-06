import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  colSpan: string;
  rowSpan: string;
}

const initialProjects: PortfolioItem[] = [
  {
    id: 1,
    title: 'Neon Cyber',
    category: 'Letreiro Luminoso',
    image: 'https://picsum.photos/seed/neon1/800/1000',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-2',
  },
  {
    id: 2,
    title: 'Tech Hub',
    category: 'Fachada ACM',
    image: 'https://picsum.photos/seed/acm1/800/600',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
  },
  {
    id: 3,
    title: 'Future Print',
    category: 'Impressão Digital',
    image: 'https://picsum.photos/seed/print1/800/600',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
  },
  {
    id: 4,
    title: 'Glow Box',
    category: 'Letreiro Luminoso',
    image: 'https://picsum.photos/seed/neon2/800/600',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
  },
  {
    id: 5,
    title: 'Corporate HQ',
    category: 'Fachada ACM',
    image: 'https://picsum.photos/seed/acm2/800/600',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
  },
];

interface PortfolioStore {
  projects: PortfolioItem[];
  addProject: (project: Omit<PortfolioItem, 'id'>) => void;
  updateProject: (id: number, project: Partial<PortfolioItem>) => void;
  deleteProject: (id: number) => void;
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      projects: initialProjects,
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, { ...project, id: Date.now() }],
        })),
      updateProject: (id, updatedProject) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updatedProject } : p
          ),
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),
    }),
    {
      name: 'portfolio-storage',
    }
  )
);
