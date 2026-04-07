import { create } from 'zustand';
import { db } from '../lib/firebase';
import { ref, onValue, update, get } from 'firebase/database';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  iconName: string;
  color: string;
  bg: string;
  border: string;
}

const defaultServices: ServiceItem[] = [
  {
    id: '1',
    title: 'Fachadas',
    description: 'Fachadas bem estruturadas e criativas são investimentos que fazem toda diferença e dão credibilidade, além agregar mais valor aos seus produtos. A OPEN possui equipe, estrutura e experiência de sobra para fazer um projeto para sua empresa de forma mais criativa, eficiente e com a maior qualidade possível. Trabalhamos com todos os tipos de materiais, sempre seguindo as tendências e demandas do mercado.',
    iconName: 'LayoutTemplate',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
    image: 'https://picsum.photos/seed/fachada/800/600?blur=1',
  },
  {
    id: '2',
    title: 'Letras Caixa',
    description: 'Os letreiros em letras caixa são uma opção moderna e sofisticada para a identificação da sua empresa ou comércio. Com a utilização de materiais como ACM, metal, PVC, acrílico, aço galvanizado e PVC expandido, as letras caixa ganham ainda mais beleza e durabilidade. Produzimos letras caixa com materiais de alta qualidade que se adequam ao seu orçamento, sem comprometer a excelência do resultado final.',
    iconName: 'CaseUpper',
    color: 'text-indigo-400',
    bg: 'bg-indigo-400/10',
    border: 'border-indigo-400/20',
    image: 'https://picsum.photos/seed/letras/800/600?blur=1',
  },
  {
    id: '3',
    title: 'Adesivos',
    description: 'Com a tecnologia avançada, o adesivo vinil de parede se tornou uma excelente opção para personalizar ambientes com elegância e sofisticação. Ao contrário dos papéis de parede, o adesivo vinil permite que você crie estampas únicas e exclusivas, adaptadas ao seu estilo e personalidade.',
    iconName: 'Sticker',
    color: 'text-sky-400',
    bg: 'bg-sky-400/10',
    border: 'border-sky-400/20',
    image: 'https://picsum.photos/seed/adesivo/800/600?blur=1',
  },
  {
    id: '4',
    title: 'Luminosos',
    description: 'Com o painel luminoso, é possível explorar diversas possibilidades de design e iluminação, proporcionando um resultado visual incrível. Utilizando materiais de alta qualidade, como o ACM e o acrílico, garantimos a durabilidade e resistência do seu painel.',
    iconName: 'Lightbulb',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
    image: 'https://picsum.photos/seed/luminoso/800/600?blur=1',
  },
  {
    id: '5',
    title: 'Envelopamento de Frotas',
    description: 'O envelopamento de frota é uma das formas mais eficientes de divulgar a sua empresa. Ele personaliza a sua frota e torna a sua marca visível por onde quer que os veículos circulem, transmitindo profissionalismo e credibilidade para o seu negócio. Com o envelopamento, as pequenas empresas também podem se destacar no mercado e atrair mais clientes, com a possibilidade de personalizar um único veículo ou a frota inteira.',
    iconName: 'Truck',
    color: 'text-indigo-400',
    bg: 'bg-indigo-400/10',
    border: 'border-indigo-400/20',
    image: 'https://picsum.photos/seed/frota/800/600?blur=1',
  },
  {
    id: '6',
    title: 'Sinalização',
    description: 'Na OPEN Comunicação Visual Criativa, estamos comprometidos em fornecer soluções completas de sinalização para seus ambientes comerciais. Oferecemos uma ampla variedade de placas, incluindo placas fotoluminescentes que são ideais para garantir a segurança e orientação dos frequentadores mesmo em situações de falta de luz.',
    iconName: 'Signpost',
    color: 'text-sky-400',
    bg: 'bg-sky-400/10',
    border: 'border-sky-400/20',
    image: 'https://picsum.photos/seed/sinalizacao/800/600?blur=1',
  },
];

interface ServicesStore {
  services: ServiceItem[];
  isLoading: boolean;
  error: string | null;
  fetchServices: () => void;
  updateService: (id: string, updatedService: Partial<ServiceItem>) => Promise<void>;
  initializeDefaultServices: () => Promise<void>;
}

export const useServicesStore = create<ServicesStore>((set) => ({
  services: [],
  isLoading: false,
  error: null,

  fetchServices: () => {
    set({ isLoading: true });
    const servicesRef = ref(db, 'services');
    const unsubscribe = onValue(servicesRef, (snapshot) => {
      const services: ServiceItem[] = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          services.push({ id: childSnapshot.key, ...childSnapshot.val() } as ServiceItem);
        });
        // Sort by ID to maintain order
        services.sort((a, b) => a.id.localeCompare(b.id));
      }
      set({ services, isLoading: false, error: null });
    }, (error) => {
      console.error("Error fetching services:", error);
      set({ error: error.message, isLoading: false });
    });
    
    return () => unsubscribe();
  },

  updateService: async (id, updatedService) => {
    try {
      const serviceRef = ref(db, `services/${id}`);
      await update(serviceRef, updatedService);
    } catch (error: any) {
      console.error("Error updating service:", error);
      set({ error: error.message });
    }
  },

  initializeDefaultServices: async () => {
    try {
      const servicesRef = ref(db, 'services');
      const snapshot = await get(servicesRef);
      if (!snapshot.exists()) {
        const updates: any = {};
        defaultServices.forEach((service) => {
          updates[service.id] = service;
        });
        await update(servicesRef, updates);
      }
    } catch (error: any) {
      console.error("Error initializing default services:\n", error.message);
    }
  }
}));
