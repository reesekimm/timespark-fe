import { CSSProperties, useCallback, useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import update from 'immutability-helper'
import { Icons } from '@timespark/styles'
import { itemType, TableRow } from './table-row'
import styled from 'styled-components'

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
  emptyStatePlaceholder?: string
  style?: CSSProperties
}

export const Table = ({
  data = [],
  onDrop,
  emptyStatePlaceholder = 'No data',
  style,
  ...rest
}: TableProps) => {
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
    <StyledTable style={style} {...rest}>
      <thead>
        <tr>
          <Th>Task</Th>
          <Th>
            Estimated Dur.
            <br />
            (min)
          </Th>
          <Th>
            Actual Dur.
            <br />
            (min)
          </Th>
          <Th></Th>
          <Th></Th>
        </tr>
      </thead>
      <tbody ref={drop}>
        {rows.length > 0 ? (
          rows.map((d) => (
            <TableRow
              key={d.id}
              data-testid={d.id}
              {...d}
              findRow={findRow}
              moveRow={moveRow}
              dropRow={dropRow}
            />
          ))
        ) : (
          <tr>
            <td>
              <Icons.GrArchive />
              <span>{emptyStatePlaceholder}</span>
            </td>
          </tr>
        )}
      </tbody>
    </StyledTable>
  )
}

const StyledTable = styled.table`
  width: 100%;
  max-width: 120rem;
  border-collapse: separate;
  border-spacing: 0 1rem;
`

const Th = styled.th`
  font-family: ${({ theme }) => theme.fontFamily.extraBold};
  line-height: 1.5;
`
