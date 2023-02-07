import styled, { ThemeProvider } from 'styled-components'
import { Footer } from '@timespark/components'
import { GlobalStyle, theme } from '@timespark/styles'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        Hello World
        <br />
        <Footer />
      </Wrapper>
    </ThemeProvider>
  )
}

export default App

const Wrapper = styled.main`
  color: ${({ theme }) => theme.palette.primary};
`
