import axios from "axios"
import type { Task } from "~/types/task"


export default function () {
    const taskForm = reactive<Partial<Task>>({})

    const taskList = reactive<Task[]>([])

    async function fetchTasks() {
        const { data: tasks } = await axios.get<Task[]>('/api/tasks')

        taskList.splice(0, taskList.length)
        tasks.forEach((task: Task) => taskList.push(task))

        return tasks

    }

    async function createTask() {
        await axios.post('/api/create', taskForm)
    }
    return {
        fetchTasks,
        taskForm,
        taskList,
        createTask
    }
}