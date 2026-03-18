import { fireEvent, render, screen } from '@testing-library/react';
import { AdvisorPage } from './AdvisorPage';

describe('AdvisorPage', () => {
  it('renders empty state before first message', () => {
    render(<AdvisorPage />);

    expect(screen.getByRole('heading', { name: /real answers from/i })).toBeInTheDocument();
    expect(screen.getByText(/what are you baking\?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /gummy crumb/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/advisor input/i)).toBeInTheDocument();
  });

  it('shows typing indicator then assistant fallback reply after selecting a starter prompt', async () => {
    render(<AdvisorPage />);

    fireEvent.click(screen.getByRole('button', { name: /gummy crumb/i }));

    expect(screen.getByRole('button', { name: '…' })).toBeDisabled();
    expect(screen.getByText(/my crumb is gummy near the base/i)).toBeInTheDocument();
    expect(await screen.findByText(/loaf lab advisor/i)).toBeInTheDocument();
    expect(await screen.findByText(/sorry — i hit an api error\. please try again\./i)).toBeInTheDocument();
  });

  it('cleans up pending timeout on unmount', () => {
    vi.useFakeTimers();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { unmount } = render(<AdvisorPage />);
    fireEvent.click(screen.getByRole('button', { name: /gummy crumb/i }));

    unmount();
    vi.runAllTimers();

    expect(errorSpy).not.toHaveBeenCalled();

    errorSpy.mockRestore();
    vi.useRealTimers();
  });
});
