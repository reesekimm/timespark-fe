import {
  ChangeEvent,
  ChangeEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useMemo
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import styled, { css } from 'styled-components'

type InputSize = 'small' | 'medium' | 'large'

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  name?: string
  value?: string
  palceholder?: string
  inputSize?: InputSize
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
  { palceholder, inputSize = 'medium', onChange, ...rest }: Props,
  ref
) {
  const id = uuidv4()

  const handleChange = useMemo(
    () =>
      onChange
        ? (event: ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
              onChange(event)
            }
          }
        : undefined,
    [onChange]
  )

  return (
    <div>
      <label htmlFor={id}>
        <StyledInput
          id={id}
          ref={ref}
          type='text'
          placeholder={palceholder}
          inputSize={inputSize}
          onChange={handleChange}
          {...rest}
        />
      </label>
    </div>
  )
})

const StyledInput = styled.input<Props>`
  border: none;
  width: 100%;
  padding: 0;

  ::placeholder {
    color: ${({ theme }) => theme.palette.gray[300]};
  }

  &:focus {
    outline: none;
  }

  ${({ inputSize }) => inputSize && sizeMap[inputSize]}
`

const sizeMap = {
  small: css`
    font-size: ${({ theme }) => theme.fontSize.xsmall};
    padding: ${({ theme }) => theme.spacing.small};
    border-radius: 4px;
    box-shadow: ${({ theme }) => `0 0 0 1.3px ${theme.palette.gray[300]}`};
    &:focus {
      box-shadow: ${({ theme }) => `0 0 0 1.8px ${theme.palette.primary}`};
    }
  `,
  medium: css`
    font-size: ${({ theme }) => theme.fontSize.small};
    padding: ${({ theme }) => theme.spacing.medium};
    border-radius: 7px;
    box-shadow: ${({ theme }) => `0 0 0 1.7px ${theme.palette.gray[300]}`};
    &:focus {
      box-shadow: ${({ theme }) => `0 0 0 2.2px ${theme.palette.primary}`};
    }
  `,
  large: css`
    font-size: ${({ theme }) => theme.fontSize.medium};
    padding: ${({ theme }) => theme.spacing.large};
    border-radius: 10px;
    box-shadow: ${({ theme }) => `0 0 0 2.1px ${theme.palette.gray[300]}`};
    &:focus {
      box-shadow: ${({ theme }) => `0 0 0 3.6px ${theme.palette.primary}`};
    }
  `
}
