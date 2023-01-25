import type { StoryFn } from "@storybook/react";
import { GlobalStyle } from "@timespark/styles";

export const withGlobalStyle = (Story: StoryFn) => (
  <>
    <GlobalStyle />
    <Story />
  </>
);
