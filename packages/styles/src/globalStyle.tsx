import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'
import NanumSquareNeoLight from '../fonts/NanumSquareNeo-light.woff2'
import NanumSquareNeo from '../fonts/NanumSquareNeo-regular.woff2'
import NanumSquareNeoBold from '../fonts/NanumSquareNeo-bold.woff2'
import NanumSquareNeoExtraBold from '../fonts/NanumSquareNeo-extrabold.woff2'
import NanumSquareNeoHeavy from '../fonts/NanumSquareNeo-heavy.woff2'

const GlobalStyle = createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: 'NanumSquareNeoLight';
    src: url(${NanumSquareNeoLight}) format('woff2');
    font-weight: 100;
  }
  @font-face {
    font-family: 'NanumSquareNeo';
    src: url(${NanumSquareNeo}) format('woff2');
    font-weight: 200;
  }
  @font-face {
    font-family: 'NanumSquareNeoBold';
    src: url(${NanumSquareNeoBold}) format('woff2');
    font-weight: 500;
  }
  @font-face {
    font-family: 'NanumSquareNeoExtraBold';
    src: url(${NanumSquareNeoExtraBold}) format('woff2');
    font-weight: 600;
  }
  @font-face {
    font-family: 'NanumSquareNeoHeavy';
    src: url(${NanumSquareNeoHeavy}) format('woff2');
    font-weight: 700;
  }

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
    font-size: ${({ theme }) => theme.fontSize.medium};
  }

  a {
    text-decoration: none;
  }

`

export default GlobalStyle
