import { Icons, theme } from '@timespark/styles'
import { useDrag, useDrop } from 'react-dnd'
import styled, { css } from 'styled-components'
import { Task as TaskType } from './task-list'
import { Progress } from '../Progress/progress'
import { Clock } from '../Clock/clock'
import { Button } from '../Button/button'

export const itemType = 'row'

export type TaskListItemProps = TaskType & {
  startTask: (id: number) => void
  deleteTask: (id: number) => void
  isActive: boolean
  findTask: (id: number) => { row: TaskType; index: number }
  moveTask: (id: number, atIndex: number) => void
  dropTask?: () => void
}

export const TaskListItem = ({
  id,
  state,
  categoryName,
  title,
  estimatedDuration,
  actualDuration,
  findTask,
  moveTask,
  startTask,
  deleteTask,
  dropTask,
  isActive
}: TaskListItemProps) => {
  const originalIndex = findTask(id).index
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
          moveTask(droppedId, originalIndex)
        } else {
          if (dropTask) dropTask()
        }
      }
    }),
    [id, originalIndex, moveTask]
  )

  const [, drop] = useDrop(
    () => ({
      accept: itemType,
      hover({ id: draggedId }: Pick<TaskListItemProps, 'id'>) {
        if (draggedId !== id) {
          const { index: overIndex } = findTask(id)
          moveTask(draggedId, overIndex)
        }
      }
    }),
    [findTask, moveTask]
  )

  return (
    <Tr
      ref={(node) => drag(drop(node))}
      isDragging={isDragging}
      isActive={isActive}
    >
      <TaskWrapper>
        <Task>
          <DragIcon />
          <div>
            [{categoryName}] {title}
          </div>
        </Task>
        <Progress
          value={estimatedDuration - actualDuration}
          max={estimatedDuration}
          color={
            (estimatedDuration - actualDuration) / estimatedDuration < 0.3
              ? 'RGBA(239,83,80,0.3)'
              : 'RGBA(107,72,255,0.3)'
          }
          backgroundColor='transparent'
          style={{
            height: '7rem',
            borderTopLeftRadius: '10px',
            borderBottomLeftRadius: '10px'
          }}
        />
      </TaskWrapper>
      <Td>
        <Clock
          totalSeconds={estimatedDuration}
          style={{ color: theme.palette.gray[400] }}
        />
      </Td>
      <Td>
        <Clock
          totalSeconds={actualDuration}
          style={{ color: theme.palette.gray[400] }}
        />
      </Td>
      <IconWrapper>
        {state === 'created' ? (
          <Button
            variant='text'
            aria-labelledby={`Start ${title}`}
            onClick={() => startTask(id)}
            disabled={!isActive}
          >
            <StartIcon title={`Start ${title}`} size='2rem' />
          </Button>
        ) : null}
        {state === 'start' || state === 'continue' ? (
          <>
            <Button
              variant='text'
              aria-labelledby={`Pause ${title}`}
              onClick={() => console.log('puase')}
              disabled={!isActive}
            >
              <PauseIcon title={`Pause ${title}`} size='2rem' />
            </Button>
            <Button
              variant='text'
              aria-labelledby={`End ${title}`}
              disabled={!isActive}
            >
              <EndIcon title={`End ${title}`} size='2.5rem' />
            </Button>
          </>
        ) : null}
        {state === 'pause' ? (
          <>
            <Button
              variant='text'
              aria-labelledby={`Resume ${title}`}
              onClick={() => startTask(id)}
              disabled={!isActive}
            >
              <StartIcon title={`Resume ${title}`} size='2rem' />
            </Button>
            <Button
              variant='text'
              aria-labelledby={`End ${title}`}
              disabled={!isActive}
            >
              <EndIcon title={`End ${title}`} size='2.5rem' />
            </Button>
          </>
        ) : null}
        {state === 'end' ? (
          <Button
            variant='text'
            aria-labelledby={`Resume ${title}`}
            disabled={!isActive}
          >
            <DoneIcon title={`Resume ${title}`} size='3rem' />
          </Button>
        ) : null}
      </IconWrapper>
      <LastTd>
        <Button
          variant='text'
          aria-labelledby={`Delete ${title}`}
          onClick={() => deleteTask(id)}
          disabled={!isActive || state === 'start' || state === 'continue'}
        >
          <DeleteIcon
            title={`Delete ${title}`}
            size='2rem'
            style={{
              opacity: state === 'start' || state === 'continue' ? 0.3 : 1
            }}
          />
        </Button>
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

  button {
    &:disabled {
      svg {
        cursor: not-allowed;
      }
    }
  }
`

const DraggingStyle = css`
  opacity: 0.3;
`

const Tr = styled.tr<{ isDragging: boolean; isActive: boolean }>`
  opacity: ${({ isActive }) => (isActive ? 1 : 0.4)};

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
  width: 69rem;
  position: relative;
`

const Task = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  top: 2.8rem;
  color: ${({ theme }) => theme.palette.gray[500]};
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

const IconCommonStyle = css<{ isActive?: boolean }>`
  cursor: pointer;
`

const DragIcon = styled(Icons.GrDrag)`
  margin: 0 2rem;
  cursor: move;
  path {
    stroke: ${({ theme }) => theme.palette.gray[500]};
  }
`

const StartIcon = styled(Icons.GrPlay)`
  ${IconCommonStyle}
  polygon {
    stroke: ${({ theme }) => theme.palette.gray[500]};
    fill: ${({ theme }) => theme.palette.gray[500]};
  }
`

const PauseIcon = styled(Icons.GrPause)`
  ${IconCommonStyle}
  path {
    stroke: ${({ theme }) => theme.palette.gray[500]};
    fill: ${({ theme }) => theme.palette.gray[500]};
  }
`

const EndIcon = styled(Icons.GrStatusGood)`
  ${IconCommonStyle}
  margin-left: 1.4rem;
  path {
    stroke: ${({ theme }) => theme.palette.success};
  }
`

const DoneIcon = styled(Icons.GrStatusGood)`
  ${IconCommonStyle}
  path {
    stroke: ${({ theme }) => theme.palette.white};
    fill: ${({ theme }) => theme.palette.success};
  }
`

const IconWrapper = styled.td`
  ${TdCommonStyle}
  border-left: none;
  border-right: none;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 12rem;
  height: 7.2rem;
  margin: 0;
`

const DeleteIcon = styled(Icons.GrTrash)`
  ${IconCommonStyle}
  path {
    stroke: ${({ theme }) => theme.palette.danger};
  }
`
