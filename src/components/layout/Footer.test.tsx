import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders logo link and footer text', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    expect(screen.getByRole('link', { name: /loaf lab/i })).toHaveAttribute('href', '/');
    expect(screen.getByText(/built with react · typescript · node.js · and a lot of sourdough/i)).toBeInTheDocument();
  });
});
