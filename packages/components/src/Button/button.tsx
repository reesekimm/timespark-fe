import { ButtonHTMLAttributes, forwardRef, MouseEventHandler } from 'react'
import styled, { css } from 'styled-components'

type ButtonSize = 'small' | 'medium' | 'large'

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string
  variant?: 'primary' | 'default' | 'text'
  size?: ButtonSize
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      label = '',
      variant = 'default',
      size = 'medium',
      onClick,
      disabled = false,
      children = undefined,
      ...rest
    }: Props,
    ref
  ) => {
    return (
      <StyledButton
        ref={ref}
        variant={variant}
        size={size}
        onClick={onClick}
        disabled={disabled}
        {...rest}
      >
        {children ?? label}
      </StyledButton>
    )
  }
)

const StyledButton = styled.button<Props>`
  border: none;
  background-color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.palette.primary : theme.palette.white};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.palette.white : theme.palette.primary};
  font-family: ${({ theme }) => theme.fontFamily.extraBold};

  ${({ size }) => size && sizeMap[size]}
  ${({ size, variant }) =>
    variant !== 'text' && size && outlinedStyleSizeMap[size]};
  transition: box-shadow 0.1s ease-in-out;

  &:disabled {
    color: ${({ theme, variant }) =>
      variant === 'primary' ? theme.palette.white : theme.palette.gray[300]};
    background-color: ${({ theme, variant }) =>
      variant === 'primary' ? theme.palette.gray[300] : theme.palette.white};
  }
`

const sizeMap = {
  small: css`
    font-size: ${({ theme }) => theme.fontSize.xsmall};
  `,
  medium: css`
    font-size: ${({ theme }) => theme.fontSize.small};
  `,
  large: css`
    font-size: ${({ theme }) => theme.fontSize.medium};
  `
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const outlinedStyleSizeMap: { [key in ButtonSize]: any } = {
  small: css`
    padding: ${({ theme }) => theme.spacing.small};
    border-radius: 4px;
    box-shadow: ${({ theme }) => `0 0 0 1.5px ${theme.palette.primary}`};
    &:hover {
      box-shadow: ${({ theme }) => `0 0 0 3px ${theme.palette.primary}`};
    }
    &:disabled {
      box-shadow: ${({ theme }) => `0 0 0 1.5px ${theme.palette.gray[300]}`};
    }
  `,
  medium: css`
    padding: ${({ theme }) => theme.spacing.medium};
    border-radius: 7px;
    box-shadow: ${({ theme }) => `0 0 0 2px ${theme.palette.primary}`};
    &:hover {
      box-shadow: ${({ theme }) => `0 0 0 3.5px ${theme.palette.primary}`};
    }
    &:disabled {
      box-shadow: ${({ theme }) => `0 0 0 2px ${theme.palette.gray[300]}`};
    }
  `,
  large: css`
    padding: ${({ theme }) => theme.spacing.large};
    border-radius: 10px;
    box-shadow: ${({ theme }) => `0 0 0 2.5px ${theme.palette.primary}`};
    &:hover {
      box-shadow: ${({ theme }) => `0 0 0 4px ${theme.palette.primary}`};
    }
    &:disabled {
      box-shadow: ${({ theme }) => `0 0 0 2.5px ${theme.palette.gray[300]}`};
    }
  `
}

Button.displayName = 'Button'

export { Button }
