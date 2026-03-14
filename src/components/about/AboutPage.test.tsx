import { render, screen } from '@testing-library/react';
import { AboutPage } from './AboutPage';

describe('AboutPage', () => {
  it('renders about copy and image content', () => {
    render(<AboutPage />);

    expect(screen.queryByText(/^about$/i)).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /hi, i'm yanwen/i })).toBeInTheDocument();
    expect(screen.getByText(/i'm a software engineer who debugs bread/i)).toBeInTheDocument();
    expect(screen.getByText(/so i built loaf lab/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /cat inspecting a sourdough loaf/i })).toBeInTheDocument();
    expect(screen.getByText(/official loaf inspector/i)).toBeInTheDocument();
  });
});
