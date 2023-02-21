import { Icons } from '@timespark/styles'
import { useDrag, useDrop } from 'react-dnd'
import { Data } from './table'

export const itemType = 'row'

export type TableRowProps = Data & {
  findRow: (id: number) => { row: Data; index: number }
  moveRow: (id: number, atIndex: number) => void
  dropRow?: () => void
}

export const TableRow = ({
  id,
  category,
  title,
  estimatedDuration,
  actualDuration,
  findRow,
  moveRow,
  dropRow
}: TableRowProps) => {
  const originalIndex = findRow(id).index
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: itemType,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveRow(droppedId, originalIndex)
        } else {
          if (dropRow) dropRow()
        }
      }
    }),
    [id, originalIndex, moveRow]
  )

  const [, drop] = useDrop(
    () => ({
      accept: itemType,
      hover({ id: draggedId }: Pick<TableRowProps, 'id'>) {
        if (draggedId !== id) {
          const { index: overIndex } = findRow(id)
          moveRow(draggedId, overIndex)
        }
      }
    }),
    [findRow, moveRow]
  )

  return (
    <tr
      ref={(node) => drag(drop(node))}
      style={{
        border: '1px solid coral',
        background: isDragging ? 'green' : 'white'
      }}
    >
      <td>
        <Icons.GrDrag style={{ cursor: 'move' }} />
      </td>
      <td style={{ padding: '2rem' }}>{category}</td>
      <td style={{ padding: '2rem' }}>{title}</td>
      <td style={{ padding: '2rem' }}>{estimatedDuration}</td>
      <td style={{ padding: '2rem' }}>{actualDuration}</td>
    </tr>
  )
}
