/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { useSiteStore } from './store/useSiteStore';
import { usePortfolioStore } from './store/usePortfolioStore';
import { useCatalogStore } from './store/useCatalogStore';
import { useServicesStore } from './store/useServicesStore';
import { useClientsStore } from './store/useClientsStore';
import { useReviewsStore } from './store/useReviewsStore';

export default function App() {
  const fetchSettings = useSiteStore((state) => state.fetchSettings);
  const fetchProjects = usePortfolioStore((state) => state.fetchProjects);
  const fetchCatalog = useCatalogStore((state) => state.fetchItems);
  const fetchServices = useServicesStore((state) => state.fetchServices);
  const initializeDefaultServices = useServicesStore((state) => state.initializeDefaultServices);
  const fetchClients = useClientsStore((state) => state.fetchClients);
  const fetchReviews = useReviewsStore((state) => state.fetchReviews);

  useEffect(() => {
    // Initialize default data if needed
    initializeDefaultServices();

    // Setup real-time listeners
    const unsubSettings = fetchSettings();
    const unsubProjects = fetchProjects();
    const unsubCatalog = fetchCatalog();
    const unsubServices = fetchServices();
    const unsubClients = fetchClients();
    const unsubReviews = fetchReviews();

    // Cleanup listeners on unmount
    return () => {
      if (unsubSettings) unsubSettings();
      if (unsubProjects) unsubProjects();
      if (unsubCatalog) unsubCatalog();
      if (unsubServices) unsubServices();
      if (unsubClients) unsubClients();
      if (unsubReviews) unsubReviews();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}
