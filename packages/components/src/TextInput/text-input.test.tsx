import { render, screen, userEvent } from '../../utils/rtl-utils'
import { TextInput } from './text-input'

describe('TextInput', () => {
  it('renders text that user types', async () => {
    render(<TextInput value='' onChange={jest.fn()} />)

    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()

    await userEvent.type(input, 'hello world')

    expect(input).toHaveValue('hello world')
  })

  it('when maxLength is set, renders remaining number of characters', async () => {
    render(<TextInput value='' onChange={jest.fn()} maxLength={5} />)

    const input = screen.getByRole('textbox')
    const remainingBefore = screen.queryByTestId('remaining')

    expect(remainingBefore).not.toBeInTheDocument()

    await userEvent.type(input, 'hello')

    const remainingAfter = screen.getByTestId('remaining')

    expect(remainingAfter).toBeInTheDocument()
    expect(remainingAfter).toHaveTextContent('0')
  })
})
