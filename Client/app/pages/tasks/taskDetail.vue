  <template>
    <div
      class="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"
    >
      <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-semibold text-white">
            Task Detail + AI Summary
          </h1>

          <NuxtLink
            to="/tasks/create"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          >
            + New Task
          </NuxtLink>
        </div>

        <div class="flex flex-wrap gap-4 mb-8">
          <input
            type="text"
            placeholder="Search Filter Task"
            class="px-4 py-2 rounded-lg bg-white w-60"
          />

          <select class="px-4 py-2 rounded-lg bg-white">
            <option>Status</option>
          </select>

          <select class="px-4 py-2 rounded-lg bg-white">
            <option>All Meedech</option>
          </select>

          <select class="px-4 py-2 rounded-lg bg-white">
            <option>Priority</option>
          </select>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-8">
            <div
              v-if="taskDetail"
              class="bg-white rounded-2xl shadow-xl p-8 space-y-6"
            >
              <div class="flex justify-between items-start">
                <h2 class="text-2xl font-semibold">
                  {{ taskDetail.title }}
                </h2>
              </div>

              <!-- Badges -->
              <div class="flex gap-4">
                <span class="px-3 py-1 rounded-full bg-slate-100 text-sm">
                  Status · {{ taskDetail.status }}
                </span>
                <span class="px-3 py-1 rounded-full bg-slate-100 text-sm">
                  Priority · {{ taskDetail.priority }}
                </span>
              </div>

              <!-- Description -->
              <div class="bg-slate-50 rounded-xl p-5 space-y-3">
                <h3 class="font-semibold">Description</h3>

                <p class="text-sm text-gray-600">
                  Assigned to: {{ taskDetail.user.name }}
                </p>

                <input
                  v-model="dueDate"
                  type="date"
                  class="w-full px-4 py-2 rounded-lg border"
                />

                <p class="text-gray-600 text-sm">
                  {{ taskDetail.description }}
                </p>
              </div>
              <!-- AI Summary -->
              <div class="bg-slate-50 rounded-xl p-5 space-y-3">
                <h3 class="font-semibold">AI-Generated Summary</h3>
                <p class="text-sm text-gray-600">
                  This task focuses on executing a multi-channel marketing
                  campaign with priority alignment and content delivery.
                </p>
              </div>
              <div class="bg-slate-50 rounded-xl p-5">
                <p class="text-sm text-gray-600">
                  <strong>AI Summary: </strong>{{taskDetail.ai_summary}} Priority: {{ taskDetail.ai_priority }}.
                </p>
              </div>
              <div class="flex justify-center pt-4">
                <button @click="createTask"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow"
                >
                  Save Changes
                </button>
              </div>
            </div>

            <div v-else class="bg-white rounded-2xl shadow-xl p-10 text-center">
              <h2 class="text-2xl font-semibold text-gray-700 mb-2">
                Task Not Found
              </h2>

              <p class="text-gray-500 mb-6">
                The task you’re looking for doesn’t exist or was deleted.
              </p>

              <NuxtLink
                to="/tasks"
                class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                Back to Task List
              </NuxtLink>
            </div>
          </div>

          <div class="lg:col-span-4">
            <AdminPanel>
              <button @click="getAiSummary(taskId)"
                class="w-full bg-white rounded-xl py-3 shadow text-blue-600 font-medium flex justify-center gap-2"
              >
                Refresh AI Summary
              </button>
            </AdminPanel>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import AdminPanel from "@/components/AdminPanel.vue";
  import useTask from "../../composables/useTask";

  const { taskList, fetchTasks, getAiSummary,createTask,task } = useTask();

  const route = useRoute();
  const taskId = +route.query.id;

  await fetchTasks();
  // await getAiSummary(taskId);
  const taskDetail = computed(() => {
    if (!taskId) {
      return taskList[0] ?? null;
    }

    return taskList.find((task) => task.id === taskId) ?? null;
  });

  const dueDate = computed({
    get() {
      if (!taskDetail.value?.due_date) return "";
      return taskDetail.value.due_date.split("T")[0];
    },
    set(value) {
      if (taskDetail.value) {
        taskDetail.value.due_date = value;
      }
    },
  });
  </script>