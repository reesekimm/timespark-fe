import { FC } from 'react'
import styled from 'styled-components'
import { Icons } from '@timespark/styles'

export const Header: FC = ({ ...rest }) => {
  return (
    <StyledHeader {...rest}>
      <Icons.Info /> TimeSpark
      <Nav />
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.palette.gray[200]};
  color: ${({ theme }) => theme.palette.white};
  font-family: ${({ theme }) => theme.fontFamily.heavy};
  font-size: ${({ theme }) => theme.fontSize.large};
  padding: 2rem;
  display: flex;
  align-items: center;
`

const Nav = styled.nav``
