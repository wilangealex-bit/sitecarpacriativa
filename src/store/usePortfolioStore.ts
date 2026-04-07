import { create } from 'zustand';
import { db } from '../lib/firebase';
import { ref, onValue, push, set as firebaseSet, update, remove } from 'firebase/database';

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  colSpan: string;
  rowSpan: string;
}

interface PortfolioStore {
  projects: PortfolioItem[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => void;
  addProject: (project: Omit<PortfolioItem, 'id'>) => Promise<void>;
  updateProject: (id: string, project: Partial<PortfolioItem>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: () => {
    set({ isLoading: true });
    const portfolioRef = ref(db, 'portfolio');
    const unsubscribe = onValue(portfolioRef, (snapshot) => {
      const projects: PortfolioItem[] = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          projects.push({ id: childSnapshot.key, ...childSnapshot.val() } as PortfolioItem);
        });
      }
      set({ projects, isLoading: false, error: null });
    }, (error) => {
      console.error("Error fetching portfolio:", error);
      set({ error: error.message, isLoading: false });
    });
    
    return () => unsubscribe();
  },

  addProject: async (project) => {
    try {
      const newRef = push(ref(db, 'portfolio'));
      await firebaseSet(newRef, project);
    } catch (error: any) {
      console.error("Error adding project:", error);
      set({ error: error.message });
    }
  },

  updateProject: async (id, updatedProject) => {
    try {
      const projectRef = ref(db, `portfolio/${id}`);
      await update(projectRef, updatedProject);
    } catch (error: any) {
      console.error("Error updating project:", error);
      set({ error: error.message });
    }
  },

  deleteProject: async (id) => {
    try {
      await remove(ref(db, `portfolio/${id}`));
    } catch (error: any) {
      console.error("Error deleting project:", error);
      set({ error: error.message });
    }
  },
}));
