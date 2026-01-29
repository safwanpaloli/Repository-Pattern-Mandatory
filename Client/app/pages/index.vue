<template>
  <main class="max-w-7xl mx-auto px-4 py-6">
    <div class="space-y-8">
      <!-- Page Header -->
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 class="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p class="text-gray-500 text-sm">Overview of tasks & productivity</p>
        </div>

        <div class="actions flex gap-3">
          <!-- Tasks (Secondary) -->
          <NuxtLink
            to="/tasks"
            class="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
          >
            Tasks
          </NuxtLink>

          <!-- New Task (Primary) -->
          <NuxtLink
            to="/tasks/create"
            class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            + New Task
          </NuxtLink>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Tasks" :value="stats.total" color="blue" />
        <DashboardCard
          title="Completed"
          :value="stats.completed"
          color="green"
        />
        <DashboardCard title="Pending" :value="stats.pending" color="yellow" />
        <DashboardCard title="High Priority" :value="stats.high" color="red" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Chart -->
        <!-- <div class="lg:col-span-6 bg-white rounded-2xl shadow-sm border p-6">
          <h2 class="text-lg font-semibold mb-1">Task Distribution</h2>
          <p class="text-sm text-gray-500 mb-4">Overview of task statuses</p>

          <Bar :data="chartData" :options="chartOptions" />
        </div> -->
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">

const { 
  stats,
  chartData,
  chartOptions,
  fetchTasks
} = useDashboard()

await fetchTasks()
</script>