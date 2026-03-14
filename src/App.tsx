import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import loafPhoto from './assets/images/home-page-loaf.jpg';
import { AdvisorPage } from './components/advisor/AdvisorPage';
import { CalculatorPage } from './components/calculator/CalculatorPage';
import { GalleryPage } from './components/gallery/GalleryPage';
import { HeroContent } from './components/home/HeroContent';
import { HeroImage } from './components/home/HeroImage';
import { ComingSoonPage } from './components/layout/ComingSoonPage';
import { Header } from './components/layout/Header';

export const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F5F0E8] text-[#1C1A17]" style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontWeight: 300 }}>
        <Header mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen((open) => !open)} />

        <Routes>
          <Route
            path="/"
            element={
              <main className="grid min-h-[calc(100vh-72px)] w-full grid-cols-1 lg:grid-cols-2">
                <HeroContent />
                <HeroImage loafPhoto={loafPhoto} />
              </main>
            }
          />
          <Route path="/advisor" element={<AdvisorPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<ComingSoonPage title="About" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
