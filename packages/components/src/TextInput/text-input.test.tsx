import { render, screen, userEvent } from '../../utils/rtl-utils'
import { TextInput } from './text-input'

describe('TextInput', () => {
  it('renders text that user types', async () => {
    render(<TextInput />)

    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()

    await userEvent.type(input, 'hello world')

    expect(input).toHaveValue('hello world')
  })
})
