import { CSSProperties, useCallback, useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import update from 'immutability-helper'
import { itemType, TableRow } from './table-row'
import styled from 'styled-components'
import { Clock } from '../Clock/clock'
import { theme } from '@timespark/styles'

export type Data = {
  id: number
  category: string
  tags: string[]
  title: string
  estimatedDuration: number
  actualDuration: number
}

export type TableProps = {
  data: Data[]
  onDrop?: (currentData: Data[]) => void
  style?: CSSProperties
}

export const Table = ({ data = [], onDrop, style }: TableProps) => {
  const [rows, setRows] = useState(data)
  const [, drop] = useDrop(() => ({ accept: itemType }))

  useEffect(() => {
    setRows(data)
  }, [data])

  const findRow = useCallback(
    (id: number) => {
      const row = rows.find((row) => row.id === id) as Data
      return { row, index: rows.indexOf(row) }
    },
    [rows]
  )

  const moveRow = useCallback(
    (id: number, atIndex: number) => {
      const { row, index } = findRow(id)
      setRows(
        update(rows, {
          $splice: [
            [index, 1],
            [atIndex, 0, row]
          ]
        })
      )
    },
    [findRow, rows]
  )

  const dropRow = useCallback(() => {
    if (onDrop) onDrop(rows)
  }, [onDrop, rows])

  return (
    <StyledTable style={style}>
      <thead>
        <tr>
          <Th>Task</Th>
          <Th>Est.</Th>
          <Th>Act.</Th>
          <Th></Th>
          <Th></Th>
        </tr>
      </thead>
      <tbody ref={drop}>
        {rows.map((d) => (
          <TableRow
            key={d.id}
            data-testid={d.id}
            {...d}
            findRow={findRow}
            moveRow={moveRow}
            dropRow={dropRow}
          />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <Td>
            <Clock
              totalSeconds={data.reduce(
                (total, { estimatedDuration }) =>
                  total + estimatedDuration * 60,
                0
              )}
              style={{ fontFamily: theme.fontFamily.bold }}
            />
          </Td>
          <Td>
            <Clock
              totalSeconds={data.reduce(
                (total, { actualDuration }) => total + actualDuration * 60,
                0
              )}
              style={{ fontFamily: theme.fontFamily.bold }}
            />
          </Td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </StyledTable>
  )
}

const StyledTable = styled.table`
  width: 100%;
  max-width: 120rem;
  border-collapse: separate;
  border-spacing: 0 1rem;
  color: ${({ theme }) => theme.palette.text};
`

const Th = styled.th`
  font-family: ${({ theme }) => theme.fontFamily.extraBold};
  line-height: 1.5;
`

const Td = styled.td`
  padding: 2rem;
  text-align: center;
`
