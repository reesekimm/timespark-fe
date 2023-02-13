import { render, screen, userEvent } from '../../utils/rtl-utils'
import { Button, Props } from './button'

const initialProps: Props = {
  label: 'Default',
  variant: 'default',
  size: 'small',
  onClick: undefined,
  disabled: false
}
function renderButton(args?: Props | undefined) {
  const props: Props = { ...initialProps, ...args }
  render(<Button {...props} />)
}

describe('Button', () => {
  it('renders children first when children and label are both provided', () => {
    renderButton({
      label: 'label',
      children: <span>Hi, I am your children</span>
    })

    expect(screen.queryByText('label')).toBeNull()
    expect(
      screen.getByText('i am your children', { exact: false })
    ).toBeInTheDocument()
  })

  it('executes onClick when clicked', async () => {
    const onClick = jest.fn()

    renderButton({ onClick })

    const button = screen.getByRole('button', { name: 'Default' })

    await userEvent.click(button)

    expect(button).toBeEnabled()
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not execute onClick when it is disabled', async () => {
    const onClick = jest.fn()

    renderButton({ onClick, disabled: true })

    const button = screen.getByRole('button', { name: 'Default' })

    await userEvent.click(button)

    expect(button).toBeDisabled()
    expect(onClick).not.toHaveBeenCalled()
  })
})
