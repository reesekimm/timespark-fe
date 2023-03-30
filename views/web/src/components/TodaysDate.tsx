import { CSSProperties } from 'react'
import { format } from 'date-fns'
import styled from 'styled-components'

interface Props {
  style?: CSSProperties
}

function TodaysDate({ style }: Props) {
  return (
    <StyledDate style={style}>
      {format(new Date(), 'eee, MMMM d, yyyy')}
    </StyledDate>
  )
}

export default TodaysDate

const StyledDate = styled.time`
  display: inline-block;
  color: ${({ theme }) => theme.palette.text};
  font-size: ${({ theme }) => theme.fontSize.medium};
`
