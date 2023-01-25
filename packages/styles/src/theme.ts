import { ITheme } from "./types";

const common = {
  palette: {
    black: "#1b2631",
    white: "#ffffff",
    gray: {
      100: "#eaedef",
      200: "#d6dbdf",
      300: "#adb6bf",
      400: "#84929e",
      500: "#5d6d7d",
      600: "#33495e",
      700: "#2e4053",
      800: "#283747",
      900: "#212f3c",
    },
  },
  fontWeight: {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },
};

const light: ITheme = {
  ...common,
  palette: {
    ...common.palette,
    primary: "#6b48ff",
    bg: common.palette.white,
    text: common.palette.black,
  },
};

const dark: ITheme = {
  ...common,
  palette: {
    ...common.palette,
    primary: "#b0a2f2",
    bg: common.palette.gray[800],
    text: common.palette.white,
  },
};

export default { light, dark };
