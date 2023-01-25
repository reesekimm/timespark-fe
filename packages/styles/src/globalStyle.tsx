import { createGlobalStyle } from "styled-components";
import NanumSquareNeoLight from "../fonts/NanumSquareNeo-light.woff2";
import NanumSquareNeo from "../fonts/NanumSquareNeo-regular.woff2";
import NanumSquareNeoBold from "../fonts/NanumSquareNeo-bold.woff2";
import NanumSquareNeoExtraBold from "../fonts/NanumSquareNeo-extrabold.woff2";
import NanumSquareNeoHeavy from "../fonts/NanumSquareNeo-heavy.woff2";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'NanumSquareNeoLight';
    src: url(${NanumSquareNeoLight}) format('woff2');
  }
  @font-face {
    font-family: 'NanumSquareNeo';
    src: url(${NanumSquareNeo}) format('woff2');
  }
  @font-face {
    font-family: 'NanumSquareNeoBold';
    src: url(${NanumSquareNeoBold}) format('woff2');
  }
  @font-face {
    font-family: 'NanumSquareNeoExtraBold';
    src: url(${NanumSquareNeoExtraBold}) format('woff2');
  }
  @font-face {
    font-family: 'NanumSquareNeoHeavy';
    src: url(${NanumSquareNeoHeavy}) format('woff2');
  }

  body {
    font-family: 'NanumSquareNeo';
  }
`;

export default GlobalStyle;
