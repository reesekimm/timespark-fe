/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEventHandler, forwardRef, SelectHTMLAttributes } from 'react'
import { v4 as uuidv4 } from 'uuid'
import styled, { useTheme } from 'styled-components'
import { styleMap } from '../TextInput/text-input'
import { Icons } from '@timespark/styles'
import Label from '../Label/label'

type Option = {
  value: string | number
  label: string | number
}

type SelectSize = 'small' | 'medium' | 'large'

export type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  options?: Option[]
  onChange?: ChangeEventHandler<HTMLSelectElement>
  name?: string
  selectSize?: SelectSize
}

export const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { label, options, selectSize = 'medium', ...rest }: Props,
  ref
) {
  const id = uuidv4()
  const theme = useTheme()

  return (
    <div>
      {label ? <Label htmlFor={id} label={label} size={selectSize} /> : null}
      <div style={{ position: 'relative' }}>
        <StyledSelect id={id} ref={ref} selectSize={selectSize} {...rest}>
          {options?.map(({ value, label }, index) => (
            <option key={value.toString() + index} value={value}>
              {label}
            </option>
          ))}
        </StyledSelect>
        <Icons.GrFormDown
          size={iconSize[selectSize]}
          color={theme.palette.gray[300]}
          style={{
            position: 'absolute',
            zIndex: '-1',
            ...iconPosition[selectSize]
          }}
        />
      </div>
    </div>
  )
})

const StyledSelect = styled.select<Omit<Props, 'options' | 'label'>>`
  width: 100%;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.text};
  background: transparent;
  appearance: none;

  &:focus {
    outline: none;
  }

  ${({ selectSize }) => selectSize && styleMap[selectSize]}
`

const iconSize = {
  small: 24,
  medium: 28,
  large: 32
}

const iconPosition = {
  small: {
    top: '0.4rem',
    right: '0.6rem'
  },
  medium: {
    top: '0.7rem',
    right: '1rem'
  },
  large: {
    top: '1rem',
    right: '1.2rem'
  }
}
