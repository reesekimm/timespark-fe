import styled from 'styled-components'
import { Anchor } from '@timespark/components'

function Header({ ...rest }) {
  return (
    <StyledHeader {...rest}>
      <SiteTitle>
        <Anchor type='link' to='/'>
          TimeSpark
        </Anchor>
      </SiteTitle>
      <Nav>
        <Anchor type='navLink' to='dashboard'>
          Dashboard
        </Anchor>
        <Anchor type='navLink' to='settings'>
          Settings
        </Anchor>
      </Nav>
    </StyledHeader>
  )
}

export default Header

const StyledHeader = styled.header`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SiteTitle = styled.h1`
  padding-bottom: 0.5rem;
  margin: 0;

  a {
    color: ${({ theme }) => theme.palette.text};
    font-family: ${({ theme }) => theme.fontFamily.heavy};
    font-size: ${({ theme }) => theme.fontSize.large};
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
