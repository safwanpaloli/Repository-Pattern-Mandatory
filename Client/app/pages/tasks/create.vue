<script setup>
definePageMeta({ layout: 'dashboard' })


const { $api } = useNuxtApp()
const router = useRouter()


const form = reactive({
title: '',
description: '',
priority: 'low',
due_date: ''
})


const submit = async () => {
await $api('/tasks', { method: 'POST', body: form })
router.push('/tasks')
}
</script>


<template>
<form @submit.prevent="submit" class="bg-white p-6 rounded shadow max-w-xl">
<h1 class="text-xl font-bold mb-4">Create Task</h1>


<input v-model="form.title" placeholder="Title" class="border p-2 w-full mb-3" />
/

<textarea v-model="form.description" placeholder="Description" class="border p-2 w-full mb-3" />


<select v-model="form.priority" class="border p-2 w-full mb-3">
<option value="low">Low</option>
<option value="medium">Medium</option>
<option value="high">High</option>
</select>


<input type="date" v-model="form.due_date" class="border p-2 w-full mb-3" />


<button class="bg-black text-white px-4 py-2">Save</button>
</form>
</template>