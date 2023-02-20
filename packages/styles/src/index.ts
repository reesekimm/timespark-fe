import * as grommetIcons from 'react-icons/gr'
import { CgSpinnerAlt as Spinner } from 'react-icons/cg'
import defaultTheme from './defaultTheme'
import GlobalStyle from './globalStyle'

const Icons = { ...grommetIcons, Spinner }

export type ThemeType = typeof defaultTheme
export { defaultTheme as theme, GlobalStyle, Icons }
