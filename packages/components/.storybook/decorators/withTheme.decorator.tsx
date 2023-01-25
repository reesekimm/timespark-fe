import { ThemeProvider } from "styled-components";
import type { StoryFn } from "@storybook/react";
import { theme } from "@timespark/styles";

export const withTheme = (Story: StoryFn) => (
  <ThemeProvider theme={theme}>
    <Story />
  </ThemeProvider>
);
