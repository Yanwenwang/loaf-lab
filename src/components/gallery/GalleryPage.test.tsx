import { render, screen } from '@testing-library/react';
import { GalleryPage } from './GalleryPage';

describe('GalleryPage', () => {
  it('renders gallery placeholders with metadata', () => {
    render(<GalleryPage />);

    expect(screen.getByText(/the bake log/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /baked with love by yanwen/i })).toBeInTheDocument();
    expect(screen.getByRole('article', { name: /hard red wheat, 75% hydration/i })).toBeInTheDocument();
    expect(screen.getByText(/jan 2026 · 65% hydration/i)).toBeInTheDocument();
    expect(screen.getAllByText(/nov 2025 · 80% hydration/i)).toHaveLength(2);
  });

  it('renders all five gallery items for easy photo swap later', () => {
    render(<GalleryPage />);

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(5);
  });
});
