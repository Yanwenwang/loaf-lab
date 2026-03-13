import { NAV_ITEMS } from '../../constants/navigation'

type HeaderProps = {
  mobileMenuOpen: boolean
  onToggleMobileMenu: () => void
}

export const Header = ({ mobileMenuOpen, onToggleMobileMenu }: HeaderProps) => {
  return (
    <header className="border-b border-[#c4813a33] bg-[#FAF7F2]">
      <div className="flex h-[72px] w-full items-center justify-between px-6 md:px-12">
        <div
          className="text-[22px] italic tracking-[-0.3px] text-[#8B5A2B]"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
        >
          loaf <span className="not-italic font-bold text-[#1C1A17]">lab</span>
        </div>

        <nav data-testid="desktop-navigation" className="hidden items-center gap-9 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              className="text-[13px] font-normal uppercase tracking-[0.08em] text-[#6B6560] transition hover:text-[#C4813A]"
            >
              {item}
            </button>
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
          <div className="flex flex-col gap-1 text-[12px] uppercase tracking-[0.1em] text-[#6B6560]">
            {NAV_ITEMS.map((item) => (
              <button key={item} type="button" className="py-2 text-left transition hover:text-[#C4813A]">
                {item}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

