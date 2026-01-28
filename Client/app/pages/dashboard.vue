
<script setup lang="ts">
definePageMeta({ layout: "dashboard" });

const { $api } = useNuxtApp();

const stats = ref({
  total: 0,
  completed: 0,
  pending: 0,
  high: 0,
});

onMounted(async () => {
  const res = await $api("/tasks");

  stats.value.total = res.meta.total;
  stats.value.completed = res.data.filter(
    (t) => t.status === "completed"
  ).length;
  stats.value.pending = res.data.filter((t) => t.status === "pending").length;
  stats.value.high = res.data.filter((t) => t.priority === "high").length;
});
</script>
<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded shadow">
        <p class="text-gray-500">Total Tasks</p>
        <h2 class="text-2xl font-bold">{{ stats.total }}</h2>
      </div>

      <div class="bg-green-100 p-4 rounded shadow">
        <p class="text-gray-500">Completed</p>
        <h2 class="text-2xl font-bold">{{ stats.completed }}</h2>
      </div>

      <div class="bg-yellow-100 p-4 rounded shadow">
        <p class="text-gray-500">Pending</p>
        <h2 class="text-2xl font-bold">{{ stats.pending }}</h2>
      </div>
      <div class="bg-red-100 p-4 rounded shadow">
        <p class="text-gray-500">High Priority</p>
        <h2 class="text-2xl font-bold">{{ stats.high }}</h2>
      </div>
    </div>
  </div>
</template>