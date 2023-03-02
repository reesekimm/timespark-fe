import { CSSProperties, useCallback, useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import update from 'immutability-helper'
import { itemType, TaskListItem } from './task-list-item'
import styled from 'styled-components'
import { Clock } from '../Clock/clock'
import { theme } from '@timespark/styles'

export type TaskState = 'created' | 'start' | 'pause' | 'continue' | 'end'

export type Task = {
  id: number
  createdTime: string
  startTime: string
  endTime: string
  state: TaskState
  categoryName: string
  tags: string[]
  title: string
  estimatedDuration: number
  actualDuration: number
}

export type TaskListProps = {
  data: Task[]
  onStart: (id: number) => void
  onDelete: (id: number) => void
  onDrop?: (currentData: Task[]) => void
  activeTaskId: number
  style?: CSSProperties
}

export const TaskList = ({
  data = [],
  onStart,
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
    (id: number) => {
      const row = rows.find((row) => row.id === id) as Task
      return { row, index: rows.indexOf(row) }
    },
    [rows]
  )

  const moveTask = useCallback(
    (id: number, atIndex: number) => {
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

  const dropTask = useCallback(() => {
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
        {rows.map((task) => (
          <TaskListItem
            key={task.id}
            data-testid={task.id}
            {...task}
            findTask={findTask}
            moveTask={moveTask}
            startTask={onStart}
            deleteTask={onDelete}
            dropTask={dropTask}
            isActive={activeTaskId === 0 || task.id === activeTaskId}
          />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <Td>
            <Clock
              totalSeconds={data.reduce(
                (total, { estimatedDuration }) => total + estimatedDuration,
                0
              )}
              style={{ fontFamily: theme.fontFamily.bold }}
            />
          </Td>
          <Td>
            <Clock
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
