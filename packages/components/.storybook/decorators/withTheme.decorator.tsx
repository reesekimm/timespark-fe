import { ThemeProvider } from "styled-components";
import { theme } from "@timespark/styles";

export const withTheme = (Story: any) => (
  <ThemeProvider theme={theme}>
    <Story />
  </ThemeProvider>
);
