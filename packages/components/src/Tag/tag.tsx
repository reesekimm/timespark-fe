import { theme } from '@timespark/styles'
import { CSSProperties } from 'react'
import styled from 'styled-components'

export type TagSize = 'small' | 'medium' | 'large'

export type Props = {
  value: string
  color?: string
  style?: CSSProperties
}

export const Tag = ({
  value,
  color = theme.palette.gray[300],
  style
}: Props) => {
  return (
    <StyledTag color={color} style={style}>
      <span>{value}</span>
    </StyledTag>
  )
}

const StyledTag = styled.div`
  border-radius: 20px;
  background-color: ${({ color }) => color};
  padding: 1rem 1.7rem;
  width: fit-content;
  color: ${({ theme }) => theme.palette.white};
`
