import "styled-components";
import ITheme from "../src/types";

declare module "styled-components" {
  export interface DefaultTheme {
    light: ITheme;
    dark: ITheme;
  }
}
