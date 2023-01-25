import styled, { ThemeProvider } from "styled-components";
import { Message } from "@timespark/components";
import { GlobalStyle, theme } from "@timespark/styles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        Hello World
        <br />
        <Message message="hi" />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;

const Wrapper = styled.main`
  color: ${({ theme }) => theme.light.palette.primary};
`;
