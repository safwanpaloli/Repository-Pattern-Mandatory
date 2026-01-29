import type { Task } from "~/types/task"

export default function () {
    const { $axios } = useNuxtApp()

    const taskList = ref<Task[]>([])

    const stats = computed(() => {
        const total = taskList.value.length

        const completed = taskList.value.filter(
            task => task.status === 'completed'
        ).length

        const pending = taskList.value.filter(
            task => task.status === 'pending'
        ).length

        const high = taskList.value.filter(
            task => task.priority === 'high'
        ).length

        return {
            total,
            completed,
            pending,
            high,
        }
    })

    const chartData = computed(() => ({
        labels: ['Total', 'Completed', 'Pending', 'High Priority'],
        datasets: [
            {
                label: 'Tasks',
                data: [
                    stats.value.total,
                    stats.value.completed,
                    stats.value.pending,
                    stats.value.high,
                ],
                borderRadius: 8,
                backgroundColor: [
                    'rgba(59,130,246,0.8)',
                    'rgba(34,197,94,0.8)',
                    'rgba(234,179,8,0.8)',
                    'rgba(239,68,68,0.8)',
                ],
            },
        ],
    }))

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: {
                grid: { display: false },
                ticks: { stepSize: 10 },
            },
            x: {
                grid: { display: false },
            },
        },
    }

    async function fetchTasks() {
        const response = await $axios.get('/tasks')

        taskList.value = response.data.data
        console.log(taskList.value,'taskList')
        return response.data
    }

    return {
        taskList,
        stats,
        chartData,
        chartOptions,
        fetchTasks,
    }
}