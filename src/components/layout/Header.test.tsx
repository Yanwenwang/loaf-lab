import { fireEvent, render, screen, within } from '@testing-library/react'
import { NAV_ITEMS } from '../../constants/navigation'
import { Header } from './Header'

describe('Header', () => {
  it('renders desktop nav items and keeps mobile nav hidden when closed', () => {
    const { container } = render(<Header mobileMenuOpen={false} onToggleMobileMenu={() => {}} />)

    const desktopNav = screen.getByTestId('desktop-navigation')
    expect(desktopNav).toHaveClass('hidden')
    expect(desktopNav).toHaveClass('md:flex')

    NAV_ITEMS.forEach((item) => {
      expect(within(desktopNav).getByRole('button', { name: new RegExp(item, 'i') })).toBeInTheDocument()
    })

    expect(container.querySelector('#mobile-navigation')).not.toBeInTheDocument()
  })

  it('mobile menu toggles open/close and aria-expanded updates correctly', () => {
    const onToggleMobileMenu = vi.fn()

    const { container, rerender } = render(<Header mobileMenuOpen={false} onToggleMobileMenu={onToggleMobileMenu} />)

    const toggle = screen.getByRole('button', { name: /toggle navigation menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(container.querySelector('#mobile-navigation')).not.toBeInTheDocument()

    fireEvent.click(toggle)
    expect(onToggleMobileMenu).toHaveBeenCalledTimes(1)

    rerender(<Header mobileMenuOpen={true} onToggleMobileMenu={onToggleMobileMenu} />)
    expect(screen.getByRole('button', { name: /toggle navigation menu/i })).toHaveAttribute('aria-expanded', 'true')
    expect(container.querySelector('#mobile-navigation')).toBeInTheDocument()

    rerender(<Header mobileMenuOpen={false} onToggleMobileMenu={onToggleMobileMenu} />)
    expect(screen.getByRole('button', { name: /toggle navigation menu/i })).toHaveAttribute('aria-expanded', 'false')
    expect(container.querySelector('#mobile-navigation')).not.toBeInTheDocument()
  })
})
