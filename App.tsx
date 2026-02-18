
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cuisines from './pages/Cuisines';
import DetailedMenu from './pages/DetailedMenu';
import LiveStations from './pages/LiveStations';
import Events from './pages/Events';
import Process from './pages/Process';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import AIConcierge from './components/AIConcierge';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col selection:bg-[#C6A15B] selection:text-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            
            <Route path="/cuisines" element={<Cuisines />} />
            <Route path="/menu" element={<DetailedMenu />} />
            <Route path="/stations" element={<LiveStations />} />
            <Route path="/events" element={<Events />} />
            <Route path="/process" element={<Process />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Internal Routes */}
            <Route path="/admin/dashboard" element={<Dashboard />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <AIConcierge />
      </div>
    </Router>
  );
};

export default App;
