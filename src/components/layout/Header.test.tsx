import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/navigation';
import { Header } from './Header';

describe('Header', () => {
  it('renders desktop nav items and keeps mobile nav hidden when closed', () => {
    const { container } = render(
      <MemoryRouter>
        <Header mobileMenuOpen={false} onToggleMobileMenu={() => {}} />
      </MemoryRouter>,
    );

    const desktopNav = screen.getByTestId('desktop-navigation');
    expect(desktopNav).toHaveClass('hidden');
    expect(desktopNav).toHaveClass('md:flex');

    NAV_ITEMS.forEach((item) => {
      expect(within(desktopNav).getByRole('link', { name: new RegExp(item, 'i') })).toBeInTheDocument();
    });

    expect(container.querySelector('#mobile-navigation')).not.toBeInTheDocument();
  });

  it('mobile menu toggles open/close, aria-expanded updates, and nav link closes menu', () => {
    const onToggleMobileMenu = vi.fn();

    const { container, rerender } = render(
      <MemoryRouter>
        <Header mobileMenuOpen={false} onToggleMobileMenu={onToggleMobileMenu} />
      </MemoryRouter>,
    );

    const toggle = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(container.querySelector('#mobile-navigation')).not.toBeInTheDocument();

    fireEvent.click(toggle);
    expect(onToggleMobileMenu).toHaveBeenCalledTimes(1);

    rerender(
      <MemoryRouter>
        <Header mobileMenuOpen={true} onToggleMobileMenu={onToggleMobileMenu} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('button', { name: /toggle navigation menu/i })).toHaveAttribute('aria-expanded', 'true');
    expect(container.querySelector('#mobile-navigation')).toBeInTheDocument();

    const mobileNav = container.querySelector('#mobile-navigation') as HTMLElement;
    fireEvent.click(within(mobileNav).getByRole('link', { name: /home/i }));
    expect(onToggleMobileMenu).toHaveBeenCalledTimes(2);

    rerender(
      <MemoryRouter>
        <Header mobileMenuOpen={false} onToggleMobileMenu={onToggleMobileMenu} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('button', { name: /toggle navigation menu/i })).toHaveAttribute('aria-expanded', 'false');
    expect(container.querySelector('#mobile-navigation')).not.toBeInTheDocument();
  });
});
