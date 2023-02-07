import { render, screen } from '../../utils/rtl-utils'
import { Anchor } from './anchor'

describe('Anchor', () => {
  it('renders default anchor', () => {
    render(<Anchor href='/'>Link</Anchor>)
    expect(screen.getByRole('link', { name: 'Link' })).toBeInTheDocument()
  })
})
