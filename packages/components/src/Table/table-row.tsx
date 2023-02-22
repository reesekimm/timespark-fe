import { Icons } from '@timespark/styles'
import { useDrag, useDrop } from 'react-dnd'
import styled, { css } from 'styled-components'
import { Data } from './table'
import { formatTime } from '../../utils/misc'
import { Progress } from '../Progress/progress'

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
    <Tr ref={(node) => drag(drop(node))} isDragging={isDragging}>
      <DragIcon>
        <Icons.GrDrag />
      </DragIcon>
      <TaskWrapper>
        <Task>
          [{category}] {title}
        </Task>
        <Progress
          value={estimatedDuration - actualDuration}
          max={estimatedDuration}
          color={
            (estimatedDuration - actualDuration) / estimatedDuration < 0.3
              ? 'RGBA(255,101,80,0.3)'
              : 'RGBA(118,255,179,0.3)'
          }
          backgroundColor='white'
          style={{ height: '7rem' }}
        />
      </TaskWrapper>
      <Timer>{formatTime(estimatedDuration * 60)}</Timer>
      <Timer>{formatTime(actualDuration * 60)}</Timer>
      <Td></Td>
      <LastTd></LastTd>
    </Tr>
  )
}

const TdCommonStyle = css`
  border: ${({ theme }) => `1px solid ${theme.palette.gray[200]}`};
  background-color: ${({ theme }) => theme.palette.white};
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.palette.gray[500]};
  font-size: ${({ theme }) => theme.fontSize.medium};
`

const DraggingStyle = css`
  opacity: 0.2;
  color: white;
`

const Tr = styled.tr<{ isDragging: boolean }>`
  td {
    ${({ isDragging }) => isDragging && DraggingStyle}
  }
`

const DragIcon = styled.td`
  ${TdCommonStyle}
  border-right: none;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  svg {
    cursor: move;
  }
`

const TaskWrapper = styled.td`
  ${TdCommonStyle}
  padding: 0;
  text-align: left;
  border-left: none;
  border-right: none;
  position: relative;
  display: flex;
  min-width: 60rem;
`

const Task = styled.div`
  position: absolute;
  left: 1.5rem;
  top: 2.7rem;
  color: ${({ theme }) => theme.palette.gray[500]};
  font-size: ${({ theme }) => theme.fontSize.small};
`

const Timer = styled.td`
  ${TdCommonStyle}
  border-left: none;
  border-right: none;
  font-family: ${({ theme }) => theme.fontFamily.regular};
  font-size: ${({ theme }) => theme.fontSize.large};
  color: ${({ theme }) => theme.palette.gray[400]};
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
