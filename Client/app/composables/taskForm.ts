import type { Task } from "~/types/task"
import { ElNotification } from 'element-plus'

ElNotification({
  title: 'Success',
  message: 'Task created successfully',
  type: 'success',
})

export default function () {
    const { $axios } = useNuxtApp()
    const taskForm = reactive<Partial<Task>>({})

    const taskList = reactive<Task[]>([])

    async function fetchTasks() {
        const { data: tasks } = await $axios.get<Task[]>('/api/tasks')

        taskList.splice(0, taskList.length)
        tasks.forEach((task: Task) => taskList.push(task))

        return tasks

    }

    async function createTask() {
        $axios.post('/api/tasks', taskForm).then(() => {
            ElNotification({
                title: 'Success',
                message: 'Task created successfully',
                type: 'success',
            })
        }).catch(() => {
            ElNotification({
                title: 'Error',
                message: 'Failed to create task',
                type: 'error',
            })
        })
    }

    return {
        fetchTasks,
        taskForm,
        taskList,
        createTask
    }
}