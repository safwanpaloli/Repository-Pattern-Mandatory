<template>
  <div class="edit-task">
    <TaskForm :taskId="taskId" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const route = useRoute();
const taskId = ref(route.query.id);
</script>