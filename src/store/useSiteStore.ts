import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

interface SiteStore {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  updateContact: (contact: Partial<SiteSettings['contact']>) => void;
  updateSocial: (social: Partial<SiteSettings['social']>) => void;
}

export const useSiteStore = create<SiteStore>()(
  persist(
    (set) => ({
      settings: {
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
      },
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),
      updateContact: (contact) => set((state) => ({
        settings: { ...state.settings, contact: { ...state.settings.contact, ...contact } }
      })),
      updateSocial: (social) => set((state) => ({
        settings: { ...state.settings, social: { ...state.settings.social, ...social } }
      })),
    }),
    { name: 'site-settings-storage' }
  )
);
