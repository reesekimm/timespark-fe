import { withGlobalStyle } from "./decorators/withGlobalStyle.decorator";
import { withTheme } from "./decorators/withTheme.decorator";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [withGlobalStyle, withTheme];
