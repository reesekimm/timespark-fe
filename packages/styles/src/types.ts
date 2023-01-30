export interface ITheme {
  palette: {
    black: string
    white: string
    gray: {
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
      700: string
      800: string
      900: string
    }
    primary: string
    bg: string
    text: string
  }
  fontWeight: {
    thin: number
    extraLight: number
    light: number
    regular: number
    medium: number
    semiBold: number
    bold: number
    extraBold: number
    black: number
  }
}
