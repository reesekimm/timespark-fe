import { render, screen } from '../../utils/rtl-utils'
import { Footer } from './footer'

describe('Footer', () => {
  it('renders properly', () => {
    render(<Footer />)
    expect(
      screen.getByText(`@${new Date().getFullYear()} Reese Kim`)
    ).toBeInTheDocument()
  })
})
