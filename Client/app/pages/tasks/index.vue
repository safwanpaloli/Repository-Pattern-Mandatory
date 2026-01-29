<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 p-4 sm:p-6"
  >
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6"
    >
      <h1 class="text-3xl font-bold text-white">Task List</h1>

      <NuxtLink
        to="/tasks/create"
        class="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg shadow"
      >
        + New Task
      </NuxtLink>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-3 mb-6">
      <input
        type="text"
        placeholder="Search task..."
        class="px-4 py-2 rounded-lg w-full sm:w-64 bg-white"
      />

      <select class="px-4 py-2 rounded-lg bg-white">
        <option>Status</option>
      </select>

      <select class="px-4 py-2 rounded-lg bg-white">
        <option>All Modules</option>
      </select>

      <select class="px-4 py-2 rounded-lg bg-white">
        <option>Priority</option>
      </select>
    </div>

    <div class="grid grid-cols-12 gap-6">
      <!-- Task Section -->
      <div class="col-span-12 lg:col-span-9">
        <!-- Empty State -->
        <div
          v-if="!taskList.length"
          class="bg-white rounded-xl p-10 text-center shadow"
        >
          <h2 class="text-xl font-semibold text-gray-700 mb-2">
            No Tasks Found
          </h2>
          <p class="text-gray-500 mb-4">You haven’t created any tasks yet.</p>

          <NuxtLink
            to="/tasks/create"
            class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Create Your First Task
          </NuxtLink>
        </div>

        <!-- Task Grid -->
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <div
            v-for="task in taskList"
            :key="task.id"
            class="bg-white rounded-xl p-5 shadow hover:shadow-lg transition"
          >
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm text-blue-600 font-medium">
                ✔ {{ task.status }}
              </span>
            </div>

            <h2 class="font-semibold text-lg mb-2">
              {{ task.title }}
            </h2>

            <div class="flex flex-wrap gap-2 mb-3">
              <span class="px-2 py-1 text-xs bg-gray-200 rounded">
                Status: {{ task.status }}
              </span>

              <span
                class="px-2 py-1 text-xs rounded text-white"
                :class="
                  task.priority === 'high'
                    ? 'bg-red-500'
                    : task.priority === 'medium'
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                "
              >
                Priority: {{ task.priority }}
              </span>
            </div>

            <p class="text-sm text-gray-600 mb-3 line-clamp-3">
              {{ task.description }}
            </p>

            <p class="text-sm text-gray-500">
              Due: {{ moment(task.due_date).format("YYYY-MM-DD") }}
            </p>

            <div class="flex justify-end gap-2 mt-4">
              <NuxtLink
                :to="`/tasks/edit?id=${task.id}`"
                class="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
              >
                Edit
              </NuxtLink>

              <NuxtLink
                :to="`/tasks/taskDetail?id=${task.id}`"
                class="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                View
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="col-span-12 lg:col-span-3">
        <adminPanel />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";

const { taskList, fetchTasks } = useTask();

await fetchTasks();
</script>
