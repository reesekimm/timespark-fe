import { base } from 'grommet-icons'
import { deepMerge } from './utils'

const icon = deepMerge(base, {
  global: {
    colors: {
      icon: '#666666'
    }
  },
  icon: {
    size: {
      small: '12px',
      medium: '22px',
      large: '30px',
      xlarge: '48px'
    }
  }
})

const defaultTheme = {
  palette: {
    primary: '#6b48ff',
    bg: '#ffffff',
    text: '#1b2631',
    black: '#1b2631',
    white: '#ffffff',
    gray: {
      100: '#eaedef',
      200: '#d6dbdf',
      300: '#adb6bf',
      400: '#84929e',
      500: '#5d6d7d',
      600: '#33495e',
      700: '#2e4053',
      800: '#283747',
      900: '#212f3c'
    }
  },
  fontFamily: {
    light: 'NanumSquareNeoLight',
    regular: 'NanumSquareNeo',
    bold: 'NanumSquareNeoBold',
    extraBold: 'NanumSquareNeoExtraBold',
    heavy: 'NanumSquareNeoHeavy'
  },
  fontSize: {
    xsmall: '0.8rem',
    small: '1.2rem',
    medium: '1.6rem',
    large: '2rem',
    xlarge: '3rem'
  },
  breakPoints: {
    sm: '576px',
    medium: '768px',
    large: '992px',
    xlarge: '1200px',
    xxlarge: '1400px'
  },
  ...icon
}

export default defaultTheme
