import { render, screen } from '../../utils/rtl-utils'
import { Clock } from './clock'

describe('Clock', () => {
  it('renders hours if existㄴ', () => {
    const totalSeconds = 60 * 60 * 2
    render(<Clock totalSeconds={totalSeconds} />)
    expect(screen.getByText(/2:00:00/i)).toBeInTheDocument()
  })

  it("does not renders hours if it doesn't exist", () => {
    const totalSeconds = 60 * 50
    render(<Clock totalSeconds={totalSeconds} />)
    expect(screen.getByText(/50:00/i)).toBeInTheDocument()
  })
})
