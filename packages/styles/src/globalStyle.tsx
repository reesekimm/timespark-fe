import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html {
    font-size: 10px;
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: 'NanumSquareNeoBold';
  }

  * {
    letter-spacing: 0.1rem;
    box-sizing: border-box;
    font-size: ${({ theme }) => theme.fontSize.small};
  }

  a {
    text-decoration: none;
  }

`

export default GlobalStyle
