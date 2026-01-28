<script setup>
definePageMeta({ layout: "dashboard" });

const { $api } = useNuxtApp();
const route = useRoute();

const task = ref(null);

onMounted(async () => {
  task.value = await $api(`/tasks/${route.params.id}`);
});
</script>


<template>
  <div v-if="task" class="bg-white p-6 rounded shadow">
    <h1 class="text-xl font-bold">{{ task.title }}</h1>
    <p class="mt-2">{{ task.description }}</p>

    <div class="mt-4 bg-gray-100 p-4 rounded">
      <h2 class="font-semibold">AI Summary</h2>
      <p>{{ task.ai_summary }}</p>
    </div>
  </div>
</template>