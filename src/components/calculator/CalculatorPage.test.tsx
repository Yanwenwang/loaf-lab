import { fireEvent, render, screen, within } from '@testing-library/react';
import { CalculatorPage } from './CalculatorPage';

describe('CalculatorPage', () => {
  it('renders calculator controls and output region', () => {
    render(<CalculatorPage />);

    expect(screen.getByText(/precise ratios for/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /dough calculator/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/total dough weight/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/target hydration/i)).toBeInTheDocument();

    const output = screen.getByTestId('calculator-output');
    expect(within(output).getByText(/flour/i)).toBeInTheDocument();
    expect(within(output).getByText(/water/i)).toBeInTheDocument();
    expect(within(output).getByText(/salt/i)).toBeInTheDocument();
    expect(within(output).getByText(/effective hydration/i)).toBeInTheDocument();
  });

  it('updates hydration note when slider values change', () => {
    render(<CalculatorPage />);

    const output = screen.getByTestId('calculator-output');
    const before = within(output).getByText(/effective hydration:/i).textContent;

    fireEvent.change(screen.getByLabelText(/target hydration/i), { target: { value: '80' } });

    const after = within(output).getByText(/effective hydration:/i).textContent;
    expect(after).not.toEqual(before);
    expect(after).toContain('81.8%');
  });

  it('uses design-spec slider ranges', () => {
    render(<CalculatorPage />);

    expect(screen.getByLabelText(/total dough weight/i)).toHaveAttribute('min', '400');
    expect(screen.getByLabelText(/total dough weight/i)).toHaveAttribute('max', '2000');
    expect(screen.getByLabelText(/target hydration/i)).toHaveAttribute('min', '60');
    expect(screen.getByLabelText(/target hydration/i)).toHaveAttribute('max', '95');
    expect(screen.getByLabelText(/fresh milled percent/i)).toHaveAttribute('min', '0');
    expect(screen.getByLabelText(/fresh milled percent/i)).toHaveAttribute('max', '100');
  });
});
