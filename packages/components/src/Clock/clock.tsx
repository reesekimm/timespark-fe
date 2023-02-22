import { CSSProperties } from 'react'
import styled from 'styled-components'

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

export function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60)
  const seconds = totalSeconds - hours * 3600 - minutes * 60
  return `${hours ? `${hours}:` : ''}${pad(minutes)}:${pad(seconds)}`
}

export type Props = {
  totalSeconds: number
  style?: CSSProperties
}

export const Clock = ({ totalSeconds, style }: Props) => {
  return (
    <StyledClock dateTime={formatTime(totalSeconds)} style={style}>
      {formatTime(totalSeconds)}
    </StyledClock>
  )
}

const StyledClock = styled.time`
  display: inline;
  font-family: ${({ theme }) => theme.fontFamily.regular};
  font-size: ${({ theme }) => theme.fontSize.large};
  color: ${({ theme }) => theme.palette.text};
`
