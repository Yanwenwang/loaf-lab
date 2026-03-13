import { fireEvent, render, screen, within } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it('renders homepage by default', () => {
    window.history.pushState({}, '', '/')
    render(<App />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /bake with/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /fresh baked sourdough loaf/i })).toBeInTheDocument()
  })

  it('shows Advisor page after clicking nav link', () => {
    window.history.pushState({}, '', '/')
    render(<App />)

    const desktopNav = screen.getByTestId('desktop-navigation')
    fireEvent.click(within(desktopNav).getByRole('link', { name: /^advisor$/i }))

    expect(screen.getByRole('heading', { name: /real answers from/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/advisor input/i)).toBeInTheDocument()
  })

  it('renders coming-soon pages for calculator, gallery, and about routes', () => {
    window.history.pushState({}, '', '/calculator')
    const calculatorView = render(<App />)
    expect(screen.getByRole('heading', { name: /calculator/i })).toBeInTheDocument()
    calculatorView.unmount()

    window.history.pushState({}, '', '/gallery')
    const galleryView = render(<App />)
    expect(screen.getByRole('heading', { name: /gallery/i })).toBeInTheDocument()
    galleryView.unmount()

    window.history.pushState({}, '', '/about')
    render(<App />)
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument()
  })

  it('redirects unknown routes to home', () => {
    window.history.pushState({}, '', '/not-a-route')
    render(<App />)

    expect(screen.getByRole('heading', { name: /bake with/i })).toBeInTheDocument()
  })
})
