
export type TaskPriority = 'Low' | 'Medium' | 'High'
export type TaskStatus = 'Todo' | 'InProgress' | 'Done'

export interface Task {
  id: number
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  due_date: Date,
  assignee: string,
  createdAt: Date,
  updatedAt: Date
}
