import { create } from 'zustand';
import { db } from '../lib/firebase';
import { ref, onValue, push, set as firebaseSet, remove } from 'firebase/database';

export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string;
}

interface ClientsStore {
  clients: ClientLogo[];
  isLoading: boolean;
  error: string | null;
  fetchClients: () => void;
  addClient: (client: Omit<ClientLogo, 'id'>) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
}

export const useClientsStore = create<ClientsStore>((set) => ({
  clients: [],
  isLoading: false,
  error: null,

  fetchClients: () => {
    set({ isLoading: true });
    const clientsRef = ref(db, 'clients');
    const unsubscribe = onValue(clientsRef, (snapshot) => {
      const clients: ClientLogo[] = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          clients.push({ id: childSnapshot.key, ...childSnapshot.val() } as ClientLogo);
        });
      }
      set({ clients, isLoading: false, error: null });
    }, (error) => {
      console.error("Error fetching clients:", error);
      set({ error: error.message, isLoading: false });
    });
    
    return () => unsubscribe();
  },

  addClient: async (client) => {
    try {
      const newRef = push(ref(db, 'clients'));
      await firebaseSet(newRef, client);
    } catch (error: any) {
      console.error("Error adding client:", error);
      set({ error: error.message });
    }
  },

  deleteClient: async (id) => {
    try {
      await remove(ref(db, `clients/${id}`));
    } catch (error: any) {
      console.error("Error deleting client:", error);
      set({ error: error.message });
    }
  },
}));
