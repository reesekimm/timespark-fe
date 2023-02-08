import { render, screen } from './test/rtl-utils'
import App from './App'

describe('App', () => {
  it('render text', () => {
    render(<App />)
    expect(screen.getByText(/timespark/i)).toBeInTheDocument()
  })
})
