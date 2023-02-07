import { render, screen } from '../../utils/rtl-utils'
import { Header } from './header'

describe('Header', () => {
  it('default', () => {
    render(<Header />)
    expect(screen.getByText('TimeSpark')).toBeInTheDocument()
  })
})
