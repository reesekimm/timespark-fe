import {
  ChangeEvent,
  ChangeEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useMemo
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import styled, { css } from 'styled-components'
import Label from '../Label/label'

type InputSize = 'small' | 'medium' | 'large'

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  name?: string
  value?: string
  placeholder?: string
  inputSize?: InputSize
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
  { label, placeholder, inputSize = 'medium', onChange, style, ...rest }: Props,
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
    <div style={style}>
      {label ? <Label htmlFor={id} label={label} size={inputSize} /> : null}
      <StyledInput
        id={id}
        ref={ref}
        type='text'
        placeholder={placeholder}
        inputSize={inputSize}
        onChange={handleChange}
        {...rest}
      />
    </div>
  )
})

const StyledInput = styled.input<Props>`
  display: block;
  border: none;
  width: 100%;
  padding: 0;

  ::placeholder {
    color: ${({ theme }) => theme.palette.gray[300]};
  }

  &:focus {
    outline: none;
  }

  ${({ inputSize }) => inputSize && styleMap[inputSize]}
`

export const styleMap = {
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
