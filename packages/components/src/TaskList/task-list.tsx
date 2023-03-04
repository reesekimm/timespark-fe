import { CSSProperties, useCallback, useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import update from 'immutability-helper'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { theme } from '@timespark/styles'
import { itemType, TaskListItem } from './task-list-item'
import { Clock } from '../Clock/clock'

export type TaskState = 'created' | 'start' | 'pause' | 'continue' | 'complete'

export type Task = {
  id: string
  createdTime: string
  startTime: string
  endTime: string
  state: TaskState
  categoryId: string
  categoryName: string
  tags: string[]
  title: string
  estimatedDuration: number
  actualDuration: number
}

export type TaskListProps = {
  data: Task[]
  onStart: (id: string) => void
  onPause: (id: string) => void
  onComplete: (id: string) => void
  onDelete: (id: string) => void
  onDrop?: (currentData: Task[]) => void
  activeTaskId: string
  style?: CSSProperties
}

export const TaskList = ({
  data = [],
  onStart,
  onPause,
  onComplete,
  onDelete,
  onDrop,
  activeTaskId,
  style
}: TaskListProps) => {
  const [rows, setRows] = useState(data)
  const [, drop] = useDrop(() => ({ accept: itemType }))

  useEffect(() => {
    setRows(data)
  }, [data])

  const findTask = useCallback(
    (id: string) => {
      const row = rows.find((row) => row.id === id) as Task
      return { row, index: rows.indexOf(row) }
    },
    [rows]
  )

  const moveTask = useCallback(
    (id: string, atIndex: number) => {
      const { row, index } = findTask(id)
      setRows(
        update(rows, {
          $splice: [
            [index, 1],
            [atIndex, 0, row]
          ]
        })
      )
    },
    [findTask, rows]
  )

  useEffect(() => {
    if (onDrop) onDrop(rows)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows])

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
        {rows.map((task) => (
          <TaskListItem
            key={uuidv4()}
            data-testid={task.id}
            {...task}
            findTask={findTask}
            moveTask={moveTask}
            startTask={onStart}
            pauseTask={onPause}
            completeTask={onComplete}
            deleteTask={onDelete}
            isActive={activeTaskId === '' || task.id === activeTaskId}
          />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <Td>
            <Clock
              data-testid='total-estimated-duration'
              totalSeconds={data.reduce(
                (total, { estimatedDuration }) => total + estimatedDuration,
                0
              )}
              style={{ fontFamily: theme.fontFamily.bold }}
            />
          </Td>
          <Td>
            <Clock
              data-testid='total-actual-duration'
              totalSeconds={data.reduce(
                (total, { actualDuration }) => total + actualDuration,
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
