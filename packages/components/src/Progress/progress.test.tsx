import { render, screen } from '../../utils/rtl-utils'
import { Progress } from './progress'

describe('Progress', () => {
  it('renders Bar if the value is equal to the minimum', () => {
    render(<Progress min={0} max={100} value={0} />)
    expect(screen.getByTestId('bar')).toBeInTheDocument()
  })

  it('renders Bar if the value is greater than the minimum', () => {
    render(<Progress min={0} max={100} value={50} />)
    expect(screen.getByTestId('bar')).toBeInTheDocument()
  })

  it('does not render Bar if the value is less than the minimum', () => {
    render(<Progress min={0} max={100} value={-10} />)
    expect(screen.queryByTestId('bar')).not.toBeInTheDocument()
  })

  it('if the value exceeds the maximum, the width of the Bar is the same as the width of the Background', () => {
    render(<Progress min={0} max={100} value={110} />)

    const background = screen.getByTestId('background')
    const bar = screen.getByTestId('bar')

    expect(background).toHaveStyle({ width: '100%' })
    expect(bar).toHaveStyle({ width: '100%' })
  })
})
