import * as grommetIcons from 'react-icons/gr'
import { ImSpinner as Spinner } from 'react-icons/im'
import defaultTheme from './defaultTheme'
import GlobalStyle from './globalStyle'

const Icons = { ...grommetIcons, Spinner }

export type ThemeType = typeof defaultTheme
export { defaultTheme as theme, GlobalStyle, Icons }
