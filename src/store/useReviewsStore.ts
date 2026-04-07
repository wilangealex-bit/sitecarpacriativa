import { create } from 'zustand';
import { db } from '../lib/firebase';
import { ref, onValue, push, set as firebaseSet, update, remove } from 'firebase/database';

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
  isLoading: boolean;
  error: string | null;
  fetchReviews: () => void;
  addReview: (review: Omit<Review, 'id'>) => Promise<void>;
  updateReview: (id: string, review: Partial<Review>) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
}

export const useReviewsStore = create<ReviewsStore>((set) => ({
  reviews: [],
  isLoading: false,
  error: null,

  fetchReviews: () => {
    set({ isLoading: true });
    const reviewsRef = ref(db, 'reviews');
    const unsubscribe = onValue(reviewsRef, (snapshot) => {
      const reviews: Review[] = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          reviews.push({ id: childSnapshot.key, ...childSnapshot.val() } as Review);
        });
      }
      set({ reviews, isLoading: false, error: null });
    }, (error) => {
      console.error("Error fetching reviews:", error);
      set({ error: error.message, isLoading: false });
    });
    
    return () => unsubscribe();
  },

  addReview: async (review) => {
    try {
      const newRef = push(ref(db, 'reviews'));
      await firebaseSet(newRef, review);
    } catch (error: any) {
      console.error("Error adding review:", error);
      set({ error: error.message });
    }
  },

  updateReview: async (id, updatedReview) => {
    try {
      const reviewRef = ref(db, `reviews/${id}`);
      await update(reviewRef, updatedReview);
    } catch (error: any) {
      console.error("Error updating review:", error);
      set({ error: error.message });
    }
  },

  deleteReview: async (id) => {
    try {
      await remove(ref(db, `reviews/${id}`));
    } catch (error: any) {
      console.error("Error deleting review:", error);
      set({ error: error.message });
    }
  },
}));
