import type { User } from "./user"

export type TaskPriority = 'low' | 'medium' | 'high'
export type TaskStatus = 'pending' | 'in_progress' | 'completed'

export interface Task {
  id: number,
  title: string,
  description: string,
  priority: TaskPriority,
  status: TaskStatus,
  due_date: Date,
  ai_summary: string,
  ai_priority: TaskPriority,
  assigned_to: string,
  createdAt: Date,
  updatedAt: Date,
  user: User
}
