import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HeroContent } from './HeroContent'

describe('HeroContent', () => {
  it('renders headline and both CTA links', () => {
    render(
      <MemoryRouter>
        <HeroContent />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /bake with/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ask the advisor/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /see the gallery/i })).toBeInTheDocument()
  })
})
