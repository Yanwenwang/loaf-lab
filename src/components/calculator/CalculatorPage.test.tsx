import { fireEvent, render, screen } from '@testing-library/react'
import { CalculatorPage } from './CalculatorPage'

describe('CalculatorPage', () => {
  it('renders calculator sliders and default output', () => {
    render(<CalculatorPage />)

    expect(screen.getByText(/precise ratios for/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /dough calculator/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/total dough weight/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/target hydration/i)).toBeInTheDocument()
    expect(screen.getByText(/flour: 503g/i)).toBeInTheDocument()
  })

  it('updates formula output immediately when sliders change', () => {
    render(<CalculatorPage />)

    fireEvent.change(screen.getByLabelText(/total dough weight/i), { target: { value: '1000' } })

    expect(screen.getByText(/flour: 559g/i)).toBeInTheDocument()
  })

  it('uses design-spec slider ranges', () => {
    render(<CalculatorPage />)

    expect(screen.getByLabelText(/total dough weight/i)).toHaveAttribute('min', '400')
    expect(screen.getByLabelText(/total dough weight/i)).toHaveAttribute('max', '2000')
    expect(screen.getByLabelText(/target hydration/i)).toHaveAttribute('min', '60')
    expect(screen.getByLabelText(/target hydration/i)).toHaveAttribute('max', '95')
    expect(screen.getByLabelText(/fresh milled percent/i)).toHaveAttribute('min', '0')
    expect(screen.getByLabelText(/fresh milled percent/i)).toHaveAttribute('max', '100')
  })
})
