import { Icons, theme } from '@timespark/styles'
import { useDrag, useDrop } from 'react-dnd'
import styled, { css } from 'styled-components'
import { Data } from './table'
import { Progress } from '../Progress/progress'
import { Clock } from '../Clock/clock'

export const itemType = 'row'

export type TableRowProps = Data & {
  findRow: (id: number) => { row: Data; index: number }
  moveRow: (id: number, atIndex: number) => void
  deleteRow: (id: number) => void
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
  deleteRow,
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
    <Tr ref={(node) => drag(drop(node))} isDragging={isDragging}>
      <TaskWrapper>
        <Task>
          <DragIcon />
          <div>
            [{category}] {title}
          </div>
        </Task>
        <Progress
          value={estimatedDuration - actualDuration}
          max={estimatedDuration}
          color={
            (estimatedDuration - actualDuration) / estimatedDuration < 0.3
              ? 'RGBA(239,83,80,0.3)'
              : 'RGBA(118,255,179,0.3)'
          }
          backgroundColor='white'
          style={{
            height: '7rem',
            borderTopLeftRadius: '10px',
            borderBottomLeftRadius: '10px'
          }}
        />
      </TaskWrapper>
      <Td>
        <Clock
          totalSeconds={estimatedDuration * 60}
          style={{ color: theme.palette.gray[400] }}
        />
      </Td>
      <Td>
        <Clock
          totalSeconds={actualDuration * 60}
          style={{ color: theme.palette.gray[400] }}
        />
      </Td>
      <Td></Td>
      <LastTd>
        <DeleteIcon
          title='delete'
          size='1.5rem'
          onClick={() => deleteRow(id)}
        />
      </LastTd>
    </Tr>
  )
}

const TdCommonStyle = css`
  border: ${({ theme }) => `1px solid ${theme.palette.gray[100]}`};
  background-color: ${({ theme }) => theme.palette.white};
  padding: 2rem;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.small};
`

const DraggingStyle = css`
  opacity: 0.3;
`

const Tr = styled.tr<{ isDragging: boolean }>`
  td {
    ${({ isDragging }) => isDragging && DraggingStyle}
  }
`

const TaskWrapper = styled.td`
  ${TdCommonStyle}
  padding: 0;
  border-right: none;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  min-width: 60rem;
  position: relative;
`

const Task = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  top: 2.8rem;
`

const Td = styled.td`
  ${TdCommonStyle}
  border-left: none;
  border-right: none;
`

const LastTd = styled.td`
  ${TdCommonStyle}
  border-left: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`

const DragIcon = styled(Icons.GrDrag)`
  margin: 0 2rem;
  cursor: move;
  path {
    stroke: ${({ theme }) => theme.palette.gray[300]};
  }
`

const DeleteIcon = styled(Icons.GrTrash)`
  cursor: pointer;
  path {
    stroke: ${({ theme }) => theme.palette.danger};
  }
`
