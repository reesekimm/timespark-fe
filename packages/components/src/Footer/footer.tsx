import { CSSProperties, FC } from 'react'
import styled from 'styled-components'

type Props = {
  style?: CSSProperties
}

export const Footer: FC = ({ style }: Props) => {
  return (
    <StyledFooter style={style}>
      @{new Date().getFullYear()} Reese Kim
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  color: ${({ theme }) => theme.palette.gray[300]};
  background-color: ${({ theme }) => theme.palette.white};
  padding: 1.2rem;
  text-align: center;
`
