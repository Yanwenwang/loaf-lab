import { fireEvent, render, screen, within } from '@testing-library/react';
import { CalculatorPage } from './CalculatorPage';

describe('CalculatorPage', () => {
  it('renders calculator controls and output region', () => {
    render(<CalculatorPage />);

    expect(screen.getByText(/precise ratios for/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /dough calculator/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/^total dough weight$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^target hydration$/i)).toBeInTheDocument();

    const output = screen.getByTestId('calculator-output');
    expect(within(output).getByText(/flour/i)).toBeInTheDocument();
    expect(within(output).getByText(/water/i)).toBeInTheDocument();
    expect(within(output).getByText(/salt/i)).toBeInTheDocument();
    expect(within(output).getByText(/effective hydration/i)).toBeInTheDocument();
  });

  it('updates output when number input value changes', () => {
    render(<CalculatorPage />);

    const output = screen.getByTestId('calculator-output');
    const before = within(output).getByText(/effective hydration:/i).textContent;

    fireEvent.change(screen.getByLabelText(/^target hydration$/i), { target: { value: '80' } });

    const after = within(output).getByText(/effective hydration:/i).textContent;
    expect(after).not.toEqual(before);
    expect(after).toContain('81.8%');
  });

  it('updates output when slider value changes', () => {
    render(<CalculatorPage />);

    const output = screen.getByTestId('calculator-output');
    const before = within(output).getByText(/effective hydration:/i).textContent;

    fireEvent.change(screen.getByLabelText(/target hydration slider/i), { target: { value: '80' } });

    const after = within(output).getByText(/effective hydration:/i).textContent;
    expect(after).not.toEqual(before);
    expect(after).toContain('81.8%');
  });

  it('clamps number input to slider range on blur', () => {
    render(<CalculatorPage />);

    const weightInput = screen.getByLabelText(/^total dough weight$/i);
    fireEvent.change(weightInput, { target: { value: '9999' } });
    fireEvent.blur(weightInput);
    expect(weightInput).toHaveValue(2000);

    fireEvent.change(weightInput, { target: { value: '10' } });
    fireEvent.blur(weightInput);
    expect(weightInput).toHaveValue(400);

    const hydrationInput = screen.getByLabelText(/^target hydration$/i);
    fireEvent.change(hydrationInput, { target: { value: '99' } });
    fireEvent.blur(hydrationInput);
    expect(hydrationInput).toHaveValue(95);

    fireEvent.change(hydrationInput, { target: { value: '10' } });
    fireEvent.blur(hydrationInput);
    expect(hydrationInput).toHaveValue(60);

    const freshMilledInput = screen.getByLabelText(/^fresh milled percent$/i);
    fireEvent.change(freshMilledInput, { target: { value: '200' } });
    fireEvent.blur(freshMilledInput);
    expect(freshMilledInput).toHaveValue(100);

    fireEvent.change(freshMilledInput, { target: { value: '-5' } });
    fireEvent.blur(freshMilledInput);
    expect(freshMilledInput).toHaveValue(0);
  });

  it('uses design-spec slider ranges', () => {
    render(<CalculatorPage />);

    expect(screen.getByLabelText(/total dough weight slider/i)).toHaveAttribute('min', '400');
    expect(screen.getByLabelText(/total dough weight slider/i)).toHaveAttribute('max', '2000');
    expect(screen.getByLabelText(/target hydration slider/i)).toHaveAttribute('min', '60');
    expect(screen.getByLabelText(/target hydration slider/i)).toHaveAttribute('max', '95');
    expect(screen.getByLabelText(/fresh milled percent slider/i)).toHaveAttribute('min', '0');
    expect(screen.getByLabelText(/fresh milled percent slider/i)).toHaveAttribute('max', '100');
  });
});
