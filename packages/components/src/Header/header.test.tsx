import { render, screen } from '../../utils/rtl-utils'
import { Header } from './header'

describe('Header', () => {
  it('default', () => {
    render(<Header />)
    expect(
      screen.getByRole('heading', { level: 1, name: /timespark/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /settings/i })).toBeInTheDocument()
  })
})
