<script setup>
definePageMeta({ layout: "dashboard" });
const { $api } = useNuxtApp();

const tasks = ref([]);

onMounted(async () => {
  const res = await $api("/tasks");
  tasks.value = res.data;
});
</script>
<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Tasks</h1>

    <div class="bg-white shadow rounded">
      <table class="w-full">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left">Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Due</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id" class="border-t">
            <td class="p-3">{{ task.title }}</td>
            <td>{{ task.status }}</td>
            <td>{{ task.priority }}</td>
            <td>{{ task.due_date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>