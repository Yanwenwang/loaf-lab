import { useState } from 'react'
import loafPhoto from './assets/images/home-page-loaf.jpg'
import { Header } from './components/layout/Header'
import { HeroContent } from './components/home/HeroContent'
import { HeroImage } from './components/home/HeroImage'

export const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#1C1A17]" style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontWeight: 300 }}>
      <Header mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen((open) => !open)} />

      <main className="grid min-h-[calc(100vh-72px)] w-full grid-cols-1 lg:grid-cols-2">
        <HeroContent />
        <HeroImage loafPhoto={loafPhoto} />
      </main>
    </div>
  )
}

