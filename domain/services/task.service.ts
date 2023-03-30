import {
  CreateTaskDto,
  DeleteTaskDto,
  GetTasksDto,
  TaskInboundPort,
  UpdateTaskDto
} from '../inbound-ports/task.inbound-port'
import { TaskOutboundPort } from '../outbound-ports/task.outbound-port'

export const taskService = (
  taskRepository: TaskOutboundPort
): TaskInboundPort => ({
  resetTasks: () => taskRepository.resetTaskDB(),
  clearTasks: () => taskRepository.clearTaskDB(),
  createTask: async (taskData: CreateTaskDto) =>
    taskRepository.createTask(taskData),
  getTasks: async (period: GetTasksDto) => taskRepository.getTasks(period),
  deleteTask: async ({ id }: DeleteTaskDto) =>
    taskRepository.deleteTask({ id }),
  updateTask: async (taskData: UpdateTaskDto) => {
    if (taskData.state === 'start' || taskData.state === 'continue') {
      return await taskRepository.startTask(taskData)
    } else if (taskData.state === 'pause') {
      return taskRepository.pauseTask(taskData)
    } else {
      return taskRepository.completeTask(taskData)
    }
  }
})
