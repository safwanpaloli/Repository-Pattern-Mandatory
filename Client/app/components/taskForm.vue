<template>
  <div class="app">
    <!-- Header -->
    <header class="header">
      <h1>Edit Task</h1>
      <button class="btn-primary">+ New Task</button>
    </header>

    <!-- Filters -->
    <div class="filters">
      <input type="text" placeholder="Search Filter Task" />
      <select><option>Status</option></select>
      <select><option>All Medtech</option></select>
      <select><option>Priority</option></select>
    </div>

    <div class="layout">
      <!-- Main Edit Card -->
      <main class="card">
        <div class="card-header">
          <h2>Launch New Marketing Campaign</h2>
          <span class="dots">⋯</span>
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
          <input class="input" type="date" v-model="task.dueDate" />
        </div>

        <!-- Assign To -->
        <div class="section">
          <label>Assign To</label>
          <select class="input" v-model="task.assignee">
            <option>Samy Lerton</option>
            <option>Jane Doe</option>
            <option>Admin User</option>
          </select>
        </div>

        <button class="btn-save">Save Changes</button>
      </main>

      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="profile">
          <img src="https://i.pravatar.cc/80" />
          <h4>Admin User</h4>
        </div>

        <nav class="menu">
          <p class="active">Tasks</p>
          <p>Users <span>(Admin only)</span></p>
          <p>Logout</p>
        </nav>

        <div class="stats">
          <h4>Monthly Task Completion</h4>
          <div class="bars">
            <div v-for="m in months" :key="m" class="bar"></div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'

const {
    taskId
} = defineProps<{
    taskId?: number
}>()
const priorities = ['Low', 'Medium', 'High']

const task = reactive({
  title: 'Launch New Marketing Campaign',
  description:
    'Plan and execute a marketing campaign across channels with content creation and tracking.',
  priority: 'Low',
  dueDate: '2024-12-31',
  assignee: 'Samy Lerton',
})

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May']
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
  box-shadow: 0 20px 50px rgba(0,0,0,0.15);
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

/* Sidebar */
.sidebar {
  background: #fff;
  border-radius: 20px;
  padding: 20px;
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
</style>
