import { AnchorHTMLAttributes, ComponentType, ReactNode } from 'react'
import { Link, LinkProps, NavLink, NavLinkProps } from 'react-router-dom'
import styled from 'styled-components'

type AnchorType = 'a' | 'link' | 'navLink'

interface AnchorComponentProps {
  a: AnchorHTMLAttributes<HTMLAnchorElement>
  link: LinkProps
  navLink: NavLinkProps
}

const AnchorComponent = {
  a: 'a',
  link: Link,
  navLink: NavLink
}

export type Props<T extends AnchorType = AnchorType> =
  AnchorComponentProps[T] & {
    type?: AnchorType
    disabled?: boolean
    children: ReactNode
  }

export const Anchor = ({ type = 'a', disabled = false, ...rest }: Props) => {
  const Component = AnchorComponent[type] as ComponentType<Props>
  return <StyledAnchor as={Component} disabled={disabled} {...rest} />
}

const StyledAnchor = styled.a<Props>`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  color: ${({ theme }) => theme.palette.primary};
  padding: 0.1rem;
  &:hover,
  &:active {
    box-shadow: ${({ theme }) => `0 0 0 2px ${theme.palette.secondary}`};
  }
`
