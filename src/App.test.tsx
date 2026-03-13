import { render, screen } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it('renders Header, HeroContent, and HeroImage', () => {
    const { container } = render(<App />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /bake with/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /fresh baked sourdough loaf/i })).toBeInTheDocument()
    expect(container.querySelector('main')).toBeInTheDocument()
  })

  it('passes a basic layout smoke test', () => {
    const { container } = render(<App />)

    expect(container.firstElementChild).toHaveClass('min-h-screen')
    expect(container.querySelector('main')).toHaveClass('grid')
  })

  it('wires CTA links to existing section ids', () => {
    const { container } = render(<App />)

    const advisorLink = screen.getByRole('link', { name: /ask the advisor/i })
    const galleryLink = screen.getByRole('link', { name: /see the gallery/i })

    expect(advisorLink).toHaveAttribute('href', '#advisor')
    expect(galleryLink).toHaveAttribute('href', '#gallery')
    expect(container.querySelector('#advisor')).toBeInTheDocument()
    expect(container.querySelector('#gallery')).toBeInTheDocument()
  })


})
