import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Review {
  id: string;
  authorName: string;
  authorPhoto: string;
  rating: number;
  text: string;
  date: string;
}

interface ReviewsStore {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id'>) => void;
  updateReview: (id: string, review: Partial<Review>) => void;
  deleteReview: (id: string) => void;
}

export const useReviewsStore = create<ReviewsStore>()(
  persist(
    (set) => ({
      reviews: [
        {
          id: '1',
          authorName: 'João Silva',
          authorPhoto: 'https://ui-avatars.com/api/?name=João+Silva&background=0D8ABC&color=fff',
          rating: 5,
          text: 'Excelente trabalho! A fachada da minha loja ficou incrível, superou todas as expectativas. Recomendo muito a Carpa Criativa.',
          date: 'Há 2 semanas'
        },
        {
          id: '2',
          authorName: 'Maria Oliveira',
          authorPhoto: 'https://ui-avatars.com/api/?name=Maria+Oliveira&background=25D366&color=fff',
          rating: 5,
          text: 'Profissionais muito capacitados. O letreiro luminoso deu outra cara para o meu negócio. Atendimento nota 10!',
          date: 'Há 1 mês'
        },
        {
          id: '3',
          authorName: 'Carlos Mendes',
          authorPhoto: 'https://ui-avatars.com/api/?name=Carlos+Mendes&background=F59E0B&color=fff',
          rating: 5,
          text: 'Qualidade impecável na impressão digital. O material chegou no prazo e com acabamento perfeito.',
          date: 'Há 2 meses'
        }
      ],
      addReview: (review) =>
        set((state) => ({
          reviews: [...state.reviews, { ...review, id: Math.random().toString(36).substring(2, 9) }],
        })),
      updateReview: (id, updatedReview) =>
        set((state) => ({
          reviews: state.reviews.map((review) =>
            review.id === id ? { ...review, ...updatedReview } : review
          ),
        })),
      deleteReview: (id) =>
        set((state) => ({
          reviews: state.reviews.filter((review) => review.id !== id),
        })),
    }),
    {
      name: 'reviews-storage',
    }
  )
);
