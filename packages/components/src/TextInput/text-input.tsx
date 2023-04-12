import {
  ChangeEvent,
  ChangeEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import styled, { css } from 'styled-components'
import { Label } from '../Label/label'

type InputSize = 'small' | 'medium' | 'large'

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  label?: string
  name?: string
  placeholder?: string
  inputSize?: InputSize
  maxLength?: number
}

export const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
  {
    label,
    placeholder,
    value,
    inputSize = 'medium',
    onChange,
    maxLength,
    style,
    ...rest
  }: Props,
  ref
) {
  const id = uuidv4()

  const [currValue, setCurrValue] = useState(value)

  useEffect(() => {
    setCurrValue(value)
  }, [value])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e)
      setCurrValue(
        maxLength ? e.target.value.slice(0, maxLength) : e.target.value
      )
    },
    [maxLength, onChange]
  )

  return (
    <Wrapper style={style}>
      {label ? <Label htmlFor={id} label={label} size={inputSize} /> : null}
      <StyledInput
        id={id}
        ref={ref}
        type='text'
        value={currValue}
        placeholder={placeholder}
        inputSize={inputSize}
        onChange={handleChange}
        {...rest}
      />
      {maxLength && currValue.length >= 1 ? (
        <Remaining size={inputSize} data-testid='remaining'>
          {currValue.length > maxLength ? 0 : maxLength - currValue.length}
        </Remaining>
      ) : null}
    </Wrapper>
  )
})

const Wrapper = styled.div`
  position: relative;
`

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

type RemainingProps = { size: InputSize }

const Remaining = styled.div<RemainingProps>`
  position: absolute;
  ${({ size }) => size && remainingStyleMap[size]};
  text-align: center;
  background-color: ${({ theme }) => theme.palette.primary};
  border-radius: 7px;
  color: ${({ theme }) => theme.palette.white};
  opacity: 0.6;
`

const remainingStyleMap = {
  small: css`
    right: 0.4rem;
    bottom: 0.4rem;
    width: 3rem;
    padding: 0.6rem;
    font-size: ${({ theme }) => theme.fontSize.xsmall};
  `,
  medium: css`
    right: 0.6rem;
    bottom: 0.6rem;
    width: 3.6rem;
    padding: 0.7rem;
  `,
  large: css`
    right: 0.8rem;
    bottom: 0.7rem;
    width: 4.2rem;
    padding: 0.8rem;
    font-size: ${({ theme }) => theme.fontSize.medium};
  `
}
