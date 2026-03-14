import { render, screen } from '@testing-library/react';
import { ComingSoonPage } from './ComingSoonPage';

describe('ComingSoonPage', () => {
  it('renders coming soon label and provided title', () => {
    render(<ComingSoonPage title="Calculator" />);

    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /calculator/i })).toBeInTheDocument();
  });
});
