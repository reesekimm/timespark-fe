import styled from "styled-components";
import { Message } from "@timespark/ui";

function App() {
  return (
    <Wrapper>
      Hello World
      <br />
      <Message message="hi" />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.main`
  color: coral;
`;
