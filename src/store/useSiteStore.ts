import { create } from 'zustand';
import { db } from '../lib/firebase';
import { ref, onValue, set as firebaseSet, update, get } from 'firebase/database';

export interface SiteSettings {
  logoUrl: string;
  whatsappProfileUrl: string;
  heroImage: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroTitle2: string;
  heroSubtitle: string;
  brandName: string;
  brandHighlight: string;
  contact: {
    address: string;
    phone: string;
    email: string;
    whatsapp: string;
  };
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
  };
}

const defaultSettings: SiteSettings = {
  logoUrl: '',
  whatsappProfileUrl: '',
  heroImage: 'https://picsum.photos/seed/neon-city/1920/1080?blur=2',
  heroTitle1: 'Fachadas de impacto podem aumentar suas',
  heroTitleHighlight: 'vendas em até 40%*',
  heroTitle2: '',
  heroSubtitle: 'Destaque sua marca com fachadas, letreiros e comunicação visual de alto impacto. Tenha projetos personalizados que unem tecnologia, inovação e qualidade para transformar seu negócio.',
  brandName: 'Carpa',
  brandHighlight: 'Criativa',
  contact: {
    address: 'Av. das Nações Unidas, 12345\nSão Paulo, SP - Brasil',
    phone: '+55 (11) 99999-9999',
    email: 'contato@carpacriativa.com',
    whatsapp: '5511999999999',
  },
  social: {
    instagram: 'https://instagram.com',
    facebook: '#',
    linkedin: '#',
  }
};

interface SiteStore {
  settings: SiteSettings;
  isLoading: boolean;
  error: string | null;
  fetchSettings: () => void;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  updateContact: (contact: Partial<SiteSettings['contact']>) => Promise<void>;
  updateSocial: (social: Partial<SiteSettings['social']>) => Promise<void>;
  initializeDefaultSettings: () => Promise<void>;
}

export const useSiteStore = create<SiteStore>((set, getStore) => ({
  settings: defaultSettings,
  isLoading: false,
  error: null,

  fetchSettings: () => {
    set({ isLoading: true });
    const settingsRef = ref(db, 'settings/main');
    const unsubscribe = onValue(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        const fetchedSettings = snapshot.val() || {};
        set({ 
          settings: { 
            ...defaultSettings, 
            ...fetchedSettings,
            contact: { ...defaultSettings.contact, ...(fetchedSettings.contact || {}) },
            social: { ...defaultSettings.social, ...(fetchedSettings.social || {}) }
          }, 
          isLoading: false, 
          error: null 
        });
      } else {
        // If document doesn't exist, initialize it with defaults
        getStore().initializeDefaultSettings();
      }
    }, (error) => {
      console.error("Error fetching settings:", error);
      set({ error: error.message, isLoading: false });
    });
    
    return () => unsubscribe();
  },

  updateSettings: async (newSettings) => {
    try {
      const settingsRef = ref(db, 'settings/main');
      await update(settingsRef, newSettings);
    } catch (error: any) {
      console.error("Error updating settings:", error);
      set({ error: error.message });
    }
  },

  updateContact: async (contact) => {
    try {
      const currentSettings = getStore().settings;
      const settingsRef = ref(db, 'settings/main');
      await update(settingsRef, {
        contact: { ...currentSettings.contact, ...contact }
      });
    } catch (error: any) {
      console.error("Error updating contact:", error);
      set({ error: error.message });
    }
  },

  updateSocial: async (social) => {
    try {
      const currentSettings = getStore().settings;
      const settingsRef = ref(db, 'settings/main');
      await update(settingsRef, {
        social: { ...currentSettings.social, ...social }
      });
    } catch (error: any) {
      console.error("Error updating social:", error);
      set({ error: error.message });
    }
  },

  initializeDefaultSettings: async () => {
    try {
      const settingsRef = ref(db, 'settings/main');
      const snapshot = await get(settingsRef);
      if (!snapshot.exists()) {
        await firebaseSet(settingsRef, defaultSettings);
      }
    } catch (error: any) {
      console.error("Error initializing default settings:\n", error.message);
    }
  }
}));
