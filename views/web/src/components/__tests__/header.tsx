import { render, screen } from '../../utils/rtl-utils'
import Header from '../Header'

describe('Header', () => {
  it('renders logo and navigation menu', () => {
    render(<Header />)
    expect(
      screen.getByRole('heading', { level: 1, name: /timespark/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /settings/i })).toBeInTheDocument()
  })
})
