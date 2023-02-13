import { FC } from 'react'
import styled from 'styled-components'

export const Footer: FC = ({ ...rest }) => {
  return (
    <StyledFooter {...rest}>@{new Date().getFullYear()} Reese Kim</StyledFooter>
  )
}

const StyledFooter = styled.footer`
  color: ${({ theme }) => theme.palette.gray[300]};
  background-color: ${({ theme }) => theme.palette.white};
  padding: 1.2rem;
  text-align: center;
`
