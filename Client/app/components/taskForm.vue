<template>
  <div class="app">
    <!-- Header -->
    <header class="header">
      <div class="header-left">
        <h1>{{ taskId ? "Edit Task" : "Add Task" }}</h1>
      </div>

      <button class="btn-primary" v-if="taskId">+ New Task</button>
    </header>

    <!-- Filters -->
    <div class="filters">
      <input type="text" placeholder="Search Filter Task" />
      <select>
        <option>Status</option>
      </select>
      <select>
        <option>All Medtech</option>
      </select>
      <select>
        <option>Priority</option>
      </select>
    </div>

    <div class="layout">
      <!-- Main Edit Card -->
      <main class="card">
        <div class="card-header">
          <h2 class="text-xl font-semibold" v-if="task.title">{{ task.title }}</h2>
        </div>

        <!-- Title -->
        <input
          class="input"
          type="text"
          placeholder="e.g. Launch New Campaign"
          v-model="task.title"
        />

        <!-- Description -->
        <textarea
          class="textarea"
          rows="4"
          placeholder="Task description"
          v-model="task.description"
        ></textarea>

        <!-- Priority -->
        <div class="section">
          <label>Priority</label>
          <div class="priority">
            <button
              v-for="p in priorities"
              :key="p"
              :class="['pill', { active: task.priority === p }]"
              @click="task.priority = p"
            >
              {{ p }}
            </button>
          </div>
        </div>

        <!-- Due Date -->
        <div class="section">
          <label>Due Date</label>
          <input class="input" type="date" v-model="task.due_date" />
        </div>

        <!-- Assign To -->
        <div class="section">
          <label>Assign To</label>
          <select class="input" v-model="task.assigned_to">
            <option
              v-for="user in filteredUsers"
              :key="user.id"
              :value="user.id"
            >
              {{ user.name }}
            </option>
          </select>
        </div>

        <button @click="createTask" class="btn-save">Save Changes</button>
      </main>

      <!-- Sidebar -->
      <aside class="sidebar">
        <adminPanel />
      </aside>
    </div>
  </div>
</template>
<script setup lang="ts">
import useTask from "../composables/useTask";
import moment from "moment";

const { taskId } = defineProps<{
  taskId?: number;
}>();

const {
  taskList,
  filteredUsers,
  users,
  fetchUsers,
  priorities,
  task,
  fetchTasks,
  createTask,
} = useTask();

await fetchUsers();

if (!taskId && filteredUsers.value.length) {
  task.assigned_to = filteredUsers.value[0].id;
}

if (taskId) {
  await fetchTasks();

  const existingTask = taskList.find((t) => t.id == taskId);

  if (existingTask) {
    for (const key in existingTask) {
      if (key === "due_date") {
        task[key] = moment(existingTask[key]).format("YYYY-MM-DD");
      } else {
        task[key] = existingTask[key];
      }
    }
  }
}
</script>
<style scoped>
.app {
  min-height: 100vh;
  padding: 30px;
  background: linear-gradient(135deg, #1f2937, #111827);
  font-family: Inter, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  color: #fff;
}

.filters {
  display: flex;
  gap: 12px;
  margin: 20px 0;
}

.filters input,
.filters select {
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
}

/* Layout */
.layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

/* Card */
.card {
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
}

.input,
.textarea {
  width: 100%;
  margin-top: 14px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ddd;
}

.section {
  margin-top: 18px;
}

.priority {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.pill {
  padding: 8px 16px;
  border-radius: 999px;
  border: none;
  background: #e5e7eb;
  cursor: pointer;
}

.pill.active {
  background: #2563eb;
  color: #fff;
}

/* Buttons */
.btn-primary {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 12px;
}

.btn-save {
  margin-top: 24px;
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  border: none;
  background: #2563eb;
  color: #fff;
}

.profile {
  text-align: center;
}

.profile img {
  border-radius: 50%;
}

.menu p {
  margin: 12px 0;
  cursor: pointer;
}

.menu .active {
  color: #2563eb;
  font-weight: bold;
}

.stats {
  margin-top: 20px;
}

.bars {
  display: flex;
  gap: 6px;
  align-items: flex-end;
  height: 80px;
}

.bar {
  width: 20px;
  height: 100%;
  background: #3b82f6;
  border-radius: 6px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: linear-gradient(135deg, #020617, #0f172a);
  border-radius: 16px;
  margin-bottom: 24px;
}

.header-left h1 {
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.subtitle {
  font-size: 14px;
  color: #94a3b8;
  margin-top: 4px;
}

.btn-primary {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #fff;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
}
</style>
