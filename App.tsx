
import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AIConcierge from './components/AIConcierge';

// Executive-level Code Splitting: Lazy load all page components
const Home = lazy(() => import('./pages/Home'));
const Cuisines = lazy(() => import('./pages/Cuisines'));
const DetailedMenu = lazy(() => import('./pages/DetailedMenu'));
const LiveStations = lazy(() => import('./pages/LiveStations'));
const Events = lazy(() => import('./pages/Events'));
const Process = lazy(() => import('./pages/Process'));
const Contact = lazy(() => import('./pages/Contact'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Privacy = lazy(() => import('./pages/Privacy'));

/**
 * Reset scroll position on navigation for a seamless user experience.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/**
 * A refined, minimalist loading state for route transitions.
 */
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F6F6F4]">
    <div className="flex flex-col items-center animate-pulse">
      <div className="w-12 h-[1px] bg-[#C6A15B] mb-4"></div>
      <span className="text-[10px] tracking-[0.5em] uppercase text-[#7A7A7A] italic">Synchronizing...</span>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col selection:bg-[#C6A15B] selection:text-white bg-[#F6F6F4]">
        <Header />
        <main className="flex-grow">
          {/* Suspense boundary manages the loading state of lazily loaded components */}
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/" element={<Home />} />
              
              <Route path="/cuisines" element={<Cuisines />} />
              <Route path="/menu" element={<DetailedMenu />} />
              <Route path="/stations" element={<LiveStations />} />
              <Route path="/events" element={<Events />} />
              <Route path="/process" element={<Process />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              
              {/* Internal Operations Routes */}
              <Route path="/admin/dashboard" element={<Dashboard />} />

              {/* Catch-all redirection to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <AIConcierge />
      </div>
    </Router>
  );
};

export default App;
