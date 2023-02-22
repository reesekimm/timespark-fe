import { Icons } from '@timespark/styles'
import styled from 'styled-components'

export type Props = {
  description?: string
}

export const Empty = ({ description = 'No data' }: Props) => {
  return (
    <StyledSection role='section'>
      <Icons.GrArchive size='5rem' />
      <Text>{description}</Text>
    </StyledSection>
  )
}

const StyledSection = styled.section`
  width: 100%;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Text = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.extraBold};
  margin-top: 2rem;
`
