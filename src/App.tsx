import { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HeroContent } from './components/home/HeroContent';
import { HeroImage } from './components/home/HeroImage';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';

const AdvisorPage = lazy(() => import('./components/advisor/AdvisorPage').then((module) => ({ default: module.AdvisorPage })));
const CalculatorPage = lazy(() => import('./components/calculator/CalculatorPage').then((module) => ({ default: module.CalculatorPage })));
const GalleryPage = lazy(() => import('./components/gallery/GalleryPage').then((module) => ({ default: module.GalleryPage })));
const AboutPage = lazy(() => import('./components/about/AboutPage').then((module) => ({ default: module.AboutPage })));

export const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F5F0E8] text-[#1C1A17]" style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontWeight: 300 }}>
        <Header mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen((open) => !open)} />

        <Suspense fallback={<main className="min-h-[calc(100vh-72px)]" />}>
          <Routes>
            <Route
              path="/"
              element={
                <main className="grid min-h-[calc(100vh-72px)] w-full grid-cols-1 lg:grid-cols-2">
                  <HeroContent />
                  <HeroImage />
                </main>
              }
            />
            <Route path="/advisor" element={<AdvisorPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </BrowserRouter>
  );
};
