import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string;
}

const defaultClients: ClientLogo[] = [
  { id: '1', name: 'Cliente 1', logoUrl: 'https://picsum.photos/seed/client1/200/100' },
  { id: '2', name: 'Cliente 2', logoUrl: 'https://picsum.photos/seed/client2/200/100' },
  { id: '3', name: 'Cliente 3', logoUrl: 'https://picsum.photos/seed/client3/200/100' },
  { id: '4', name: 'Cliente 4', logoUrl: 'https://picsum.photos/seed/client4/200/100' },
  { id: '5', name: 'Cliente 5', logoUrl: 'https://picsum.photos/seed/client5/200/100' },
];

interface ClientsStore {
  clients: ClientLogo[];
  addClient: (client: Omit<ClientLogo, 'id'>) => void;
  deleteClient: (id: string) => void;
}

export const useClientsStore = create<ClientsStore>()(
  persist(
    (set) => ({
      clients: defaultClients,
      addClient: (client) =>
        set((state) => ({
          clients: [...state.clients, { ...client, id: Date.now().toString() }],
        })),
      deleteClient: (id) =>
        set((state) => ({
          clients: state.clients.filter((c) => c.id !== id),
        })),
    }),
    {
      name: 'clients-storage',
    }
  )
);
