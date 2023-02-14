import { LabelHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

export type Props = LabelHTMLAttributes<HTMLLabelElement> & {
  htmlFor: string
  label: string
  size?: 'small' | 'medium' | 'large'
}

const Label = ({ htmlFor, label, size = 'medium', ...rest }: Props) => {
  return (
    <StyledLabel htmlFor={htmlFor} size={size} {...rest}>
      {label}
    </StyledLabel>
  )
}

export default Label

const StyledLabel = styled.label<Pick<Props, 'size'>>`
  display: inline-block;
  font-family: ${({ theme }) => theme.fontFamily.extraBold};
  ${({ size }) => size && labelStyle[size]}
`

const labelStyle = {
  small: css`
    font-size: ${({ theme }) => theme.fontSize.xsmall};
    margin-bottom: 0.8rem;
  `,
  medium: css`
    font-size: ${({ theme }) => theme.fontSize.small};
    margin-bottom: 1rem;
  `,
  large: css`
    font-size: ${({ theme }) => theme.fontSize.medium};
    margin-bottom: 1rem;
  `
}
