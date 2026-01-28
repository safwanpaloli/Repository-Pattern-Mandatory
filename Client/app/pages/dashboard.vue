<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-white">Task List</h1>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
        + New Task
      </button>
    </div>

    <!-- Filters -->
    <div class="flex gap-4 mb-6">
      <input
        type="text"
        placeholder="Search Filter Task"
        class="px-4 py-2 rounded-lg w-64 bg-white"
      />
      <select class="px-4 py-2 rounded-lg bg-white">
        <option>Status</option>
      </select>
      <select class="px-4 py-2 rounded-lg bg-white">
        <option>All Msedec</option>
      </select>
      <select class="px-4 py-2 rounded-lg bg-white">
        <option>Priority</option>
      </select>
    </div>

    <div class="grid grid-cols-12 gap-6">
      <!-- Task Cards -->
      <div class="col-span-9 grid grid-cols-2 gap-6">
        <div
          v-for="task in tasks"
          :key="task.id"
          class="bg-white rounded-xl p-5 shadow"
        >
          <div class="flex justify-between items-center mb-2">
            <span class="flex items-center gap-2 text-sm text-blue-600">
              ✔ In Progress
            </span>
            <span class="text-gray-400">•••</span>
          </div>

          <h2 class="font-semibold text-lg mb-2">
            {{ task.title }}
          </h2>

          <div class="flex gap-2 mb-3">
            <span class="px-2 py-1 text-xs bg-gray-200 rounded">
              Status
            </span>
            <span
              class="px-2 py-1 text-xs rounded text-white"
              :class="task.priority === 'High' ? 'bg-red-500' : 'bg-green-500'"
            >
              Priority {{ task.priority }}
            </span>
          </div>

          <p class="text-sm text-gray-600 mb-2">
            {{ task.description }}
          </p>

          <p class="text-sm text-gray-500">
            Due: {{ task.due }}
          </p>

          <div class="flex justify-end gap-2 mt-4">
            <button class="px-3 py-1 text-sm bg-gray-200 rounded">
              Edit
            </button>
            <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded">
              View
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="col-span-3 bg-white rounded-xl shadow p-4">
        <div class="flex items-center gap-3 mb-6">
          <img
            src="https://i.pravatar.cc/40"
            class="rounded-full"
          />
          <div>
            <p class="font-semibold">Admin User</p>
            <p class="text-sm text-gray-500">Administrator</p>
          </div>
        </div>

        <ul class="space-y-3 mb-6">
          <li class="text-blue-600 font-medium">Tasks</li>
          <li class="text-gray-600">Users</li>
          <li class="text-red-500">Logout</li>
        </ul>

        <div>
          <h3 class="font-semibold mb-3">Monthly Task Completion</h3>
          <div class="flex items-end gap-2 h-32">
            <div
              v-for="n in [40, 80, 60, 100]"
              :key="n"
              class="bg-blue-500 w-6 rounded"
              :style="{ height: n + 'px' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const tasks = [
  {
    id: 1,
    title: "Launch New Marketing",
    description: "Plan and execute marketing strategy",
    priority: "High",
    due: "2024-12-31"
  },
  {
    id: 2,
    title: "Develop API Campaign",
    description: "API integration for campaign module",
    priority: "High",
    due: "2024-12-31"
  },
  {
    id: 3,
    title: "Develop API Endpoints",
    description: "Create secure API endpoints",
    priority: "Low",
    due: "2024-12-31"
  },
  {
    id: 4,
    title: "Refactor API Endpoints",
    description: "Improve API performance",
    priority: "Low",
    due: "2024-12-31"
  }
]
</script>
