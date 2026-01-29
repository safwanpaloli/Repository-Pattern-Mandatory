import type { Task, TaskPriority, TaskStatus } from "~/types/task"
import { ElNotification } from 'element-plus'
import type { User } from "~/types/user";

export default function () {
    const { $axios } = useNuxtApp()
    const users = reactive<User[]>([])
    const priorities: TaskPriority[] = ["low", "medium", "high"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May"];
    const task = reactive<Partial<Task>>({
        priority: 'low',
        status: 'pending'
    })
    const taskList = reactive<Task[]>([])

    async function fetchUsers() {
        const { data: usersData } = await $axios.get<User[]>('/users')
        users.splice(0, users.length)
        usersData.forEach((user: User) => users.push(user))
        return users
    }

    const filteredUsers = computed(() => {
        return users.filter(user => user.role != 'admin')
    })

    async function fetchTasks() {
        const response = await $axios.get<Task[]>('/tasks')
        taskList.splice(0, taskList.length)
        response.data.data.forEach((task: Task) => taskList.push(task))

        return response.data
    }

    async function createTask() {
        await $axios.post('/tasks', task).then(() => {
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

    async function getAiSummary(taskId:number)
    {
       const {data: aiSummary} = await $axios.get(`tasks/${taskId}/ai-summary`)

       task.ai_summary = aiSummary.data.summary
       task.ai_priority = aiSummary.data.priority
    }

    return {
        getAiSummary,
        filteredUsers,
        users,
        fetchUsers,
        priorities,
        months,
        fetchTasks,
        task,
        taskList,
        createTask
    }
}