import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '../../constants/navigation'

type HeaderProps = {
  mobileMenuOpen: boolean
  onToggleMobileMenu: () => void
}

const NAV_ROUTES: Record<string, string> = {
  Home: '/',
  Advisor: '/advisor',
  Calculator: '/calculator',
  Gallery: '/gallery',
  About: '/about',
}

export const Header = ({ mobileMenuOpen, onToggleMobileMenu }: HeaderProps) => {
  return (
    <header className="border-b border-[#c4813a33] bg-[#FAF7F2]">
      <div className="flex h-[72px] w-full items-center justify-between px-6 md:px-12">
        <NavLink
          to="/"
          className="text-[22px] italic tracking-[-0.3px] text-[#8B5A2B]"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
        >
          loaf <span className="not-italic font-bold text-[#1C1A17]">lab</span>
        </NavLink>

        <nav data-testid="desktop-navigation" className="hidden items-center gap-9 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item}
              to={NAV_ROUTES[item]}
              className={({ isActive }) =>
                `text-[13px] font-normal uppercase tracking-[0.08em] transition ${
                  isActive ? 'text-[#C4813A]' : 'text-[#6B6560] hover:text-[#C4813A]'
                }`
              }
            >
              {item}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden text-[24px] leading-none text-[#6B6560] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5A2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF7F2]"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={onToggleMobileMenu}
        >
          ☰
        </button>
      </div>

      {mobileMenuOpen && (
        <nav id="mobile-navigation" className="border-t border-[#c4813a26] px-6 py-3 md:hidden">
          <div className="flex flex-col gap-1 text-[12px] uppercase tracking-[0.1em]">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item}
                to={NAV_ROUTES[item]}
                onClick={onToggleMobileMenu}
                className={({ isActive }) => `py-2 transition ${isActive ? 'text-[#C4813A]' : 'text-[#6B6560] hover:text-[#C4813A]'}`}
              >
                {item}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
