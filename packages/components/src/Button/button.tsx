import { theme } from '@timespark/styles'
import { ButtonHTMLAttributes, forwardRef, MouseEventHandler } from 'react'
import styled, { css } from 'styled-components'
import { Spinner } from '../Spinner/spinner'

type ButtonVariant = 'primary' | 'default' | 'text'
type ButtonSize = 'small' | 'medium' | 'large'

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string
  variant?: ButtonVariant
  size?: ButtonSize
  onClick?: MouseEventHandler<HTMLButtonElement>
  loading?: boolean
  disabled?: boolean
}

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    label = '',
    variant = 'default',
    size = 'medium',
    onClick,
    loading = false,
    disabled = false,
    children = undefined,
    ...rest
  }: Props,
  ref
) {
  return (
    <StyledButton
      ref={ref}
      variant={variant}
      size={size}
      onClick={onClick}
      $loading={loading}
      disabled={loading || disabled}
      {...rest}
    >
      {loading ? (
        <Spinner
          size={spinnerSizeMap[size]}
          color={
            variant === 'primary'
              ? theme.palette.white
              : theme.palette.gray[300]
          }
          style={{ marginRight: '0.5rem' }}
        />
      ) : null}
      {children ?? label}
    </StyledButton>
  )
})

type StyleProps = {
  variant: ButtonVariant
  size: ButtonSize
  $loading: boolean
  disabled: boolean
}

const StyledButton = styled.button<StyleProps>`
  border: none;
  height: fit-content;
  background-color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.palette.primary : theme.palette.white};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.palette.white : theme.palette.primary};
  font-family: ${({ theme }) => theme.fontFamily.extraBold};
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ size }) => size && fontSizeMap[size]}
  ${({ size, variant }) =>
    variant !== 'text' && size && outlinedStyleMap[size]};
  ${({ size, variant, $loading }) =>
    variant !== 'text' && size && $loading && loadingStyleMap[size]}

  transition: box-shadow 0.15s ease-in-out;

  &:disabled {
    color: ${({ theme, variant }) =>
      variant === 'primary' ? theme.palette.white : theme.palette.gray[300]};
    background-color: ${({ theme, variant }) =>
      variant === 'primary' ? theme.palette.gray[300] : theme.palette.white};
  }
`

const spinnerSizeMap: { [key in ButtonSize]: string } = {
  small: '1.5rem',
  medium: '2.2rem',
  large: '2.9rem'
}

const fontSizeMap = {
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

const outlinedStyleMap = {
  small: css`
    padding: ${({ theme }) => theme.spacing.small};
    border-radius: 4px;
    box-shadow: ${({ theme }) => `0 0 0 1.3px ${theme.palette.primary}`};
    &:hover {
      box-shadow: ${({ theme }) => `0 0 0 3px ${theme.palette.primary}`};
    }
    &:disabled {
      box-shadow: ${({ theme }) => `0 0 0 1.3px ${theme.palette.gray[300]}`};
    }
  `,
  medium: css`
    padding: ${({ theme }) => theme.spacing.medium};
    border-radius: 7px;
    box-shadow: ${({ theme }) => `0 0 0 1.7px ${theme.palette.primary}`};
    &:hover {
      box-shadow: ${({ theme }) => `0 0 0 3.5px ${theme.palette.primary}`};
    }
    &:disabled {
      box-shadow: ${({ theme }) => `0 0 0 1.7px ${theme.palette.gray[300]}`};
    }
  `,
  large: css`
    padding: ${({ theme }) => theme.spacing.large};
    border-radius: 10px;
    box-shadow: ${({ theme }) => `0 0 0 2.1px ${theme.palette.primary}`};
    &:hover {
      box-shadow: ${({ theme }) => `0 0 0 4px ${theme.palette.primary}`};
    }
    &:disabled {
      box-shadow: ${({ theme }) => `0 0 0 2.1px ${theme.palette.gray[300]}`};
    }
  `
}

const loadingStyleMap = {
  small: css`
    padding: 0.9rem;
  `,
  medium: css`
    padding: 1.05rem;
  `,
  large: css`
    padding: 1.1rem;
  `
}

export { Button }
