import { render, screen } from '@testing-library/react';
import { HeroImage } from './HeroImage';

describe('HeroImage', () => {
  it('renders image with expected alt text', () => {
    render(<HeroImage />);

    expect(screen.getByAltText('Fresh baked sourdough loaf')).toBeInTheDocument();
  });
});
