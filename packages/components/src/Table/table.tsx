import { useCallback, useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import update from 'immutability-helper'
import { Icons } from '@timespark/styles'
import { itemType, TableRow } from './table-row'

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
}

export const Table = ({
  data = [],
  onDrop,
  emptyStatePlaceholder = 'No data'
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
    <table style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th></th>
          <th>category</th>
          <th>title</th>
          <th>Estimated Dur. (min)</th>
          <th>Actual Dur. (min)</th>
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
    </table>
  )
}
