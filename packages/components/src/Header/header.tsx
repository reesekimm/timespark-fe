import { FC } from 'react'
import styled from 'styled-components'
import { Anchor } from '../Anchor/anchor'

export const Header: FC = ({ ...rest }) => {
  return (
    <StyledHeader {...rest}>
      <SiteTitle>
        <Anchor href='#'>TimeSpark</Anchor>
      </SiteTitle>
      <Nav>
        <Anchor href='#'>Dashboard</Anchor>
        <Anchor href='#'>Settings</Anchor>
      </Nav>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SiteTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.heavy};
  font-size: ${({ theme }) => theme.fontSize.large};
  margin: 0;

  a {
    color: ${({ theme }) => theme.palette.text};
    font-family: ${({ theme }) => theme.fontFamily.heavy};
    font-size: ${({ theme }) => theme.fontSize.medium};
  }
`

const Nav = styled.nav`
  display: flex;

  a {
    font-family: ${({ theme }) => theme.fontFamily.extraBold};
    font-size: ${({ theme }) => theme.fontSize.small};
    color: ${({ theme }) => theme.palette.text};
    display: flex;
    align-items: center;

    &:nth-child(1) {
      margin-right: 1.4rem;
    }
  }
`
