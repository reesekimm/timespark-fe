import { Icons } from '@timespark/styles'
import { CSSProperties, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'

export type SpinnerSize = 'small' | 'medium' | 'large'

export type Props = {
  size?: SpinnerSize | string
  color?: string
  style?: CSSProperties
}

const sizeMap: { [key in SpinnerSize]: string } = {
  small: '2rem',
  medium: '4rem',
  large: '6rem'
}

export const Spinner = ({ size = 'medium', color, style }: Props) => {
  const spinnerSize = useMemo(() => {
    if (['small', 'medium', 'large'].includes(size)) {
      return sizeMap[size as SpinnerSize]
    } else {
      return size
    }
  }, [size])

  return <StyledSpinner size={spinnerSize} color={color} style={style} />
}

const spin = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
`

const StyledSpinner = styled(Icons.Spinner)`
  animation: ${spin} 1s linear infinite;
`
