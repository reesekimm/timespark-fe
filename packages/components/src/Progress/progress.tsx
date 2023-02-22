import { theme } from '@timespark/styles'
import { CSSProperties } from 'react'
import styled from 'styled-components'

export type Props = {
  value: number
  min?: number
  max?: number
  color?: string
  backgroundColor?: string
  style?: CSSProperties
}

export const Progress = ({
  value,
  min = 0,
  max = 100,
  color = theme.palette.secondary,
  backgroundColor = theme.palette.gray[100],
  style,
  ...rest
}: Props) => {
  return (
    <Background
      data-testid='background'
      backgroundColor={backgroundColor}
      style={style}
      {...rest}
    >
      {value >= min ? (
        <Bar
          data-testid='bar'
          color={color}
          value={(value > max ? 1 : value / max) * 100}
          style={style}
        ></Bar>
      ) : null}
    </Background>
  )
}

const Background = styled.div<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: 100%;
  min-height: 5rem;
`

const Bar = styled.div<{ color: string; value: number }>`
  background-color: ${({ color }) => color};
  height: 100%;
  min-height: 5rem;
  width: ${({ value }) => `${value}%`};
`
