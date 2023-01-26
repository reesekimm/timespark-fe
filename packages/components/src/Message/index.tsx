import type { FC } from 'react'
import { useTheme } from 'styled-components'

type Props = {
  message: string
  children?: never
}

export const Message: FC<Props> = ({ message }) => {
  const theme = useTheme()

  return <div style={{ color: theme.light.palette.primary }}>{message}</div>
}
