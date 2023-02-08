import { render, screen } from '../../utils/rtl-utils'
import { Anchor } from './anchor'

describe('Anchor', () => {
  it('renders default anchor', () => {
    render(<Anchor href='/'>Link</Anchor>)
    expect(screen.getByRole('link', { name: 'Link' })).toBeInTheDocument()
  })

  it('renders router link', () => {
    render(
      <Anchor type='link' to='router'>
        Router Link
      </Anchor>
    )
    expect(
      screen.getByRole('link', { name: 'Router Link' })
    ).toBeInTheDocument()
  })

  it('renders nav link', () => {
    render(
      <Anchor type='navLink' to='nav'>
        Nav Link
      </Anchor>
    )
    expect(screen.getByRole('link', { name: 'Nav Link' })).toBeInTheDocument()
  })
})
