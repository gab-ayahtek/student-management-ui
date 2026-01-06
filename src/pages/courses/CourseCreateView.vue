<script setup>
import { createCourse } from '@/api/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const form = ref({
    title: '',
    description: '',
});

async function handleSubmit() {
    await createCourse(form);
    router.back();
}

</script>
<template>
    <h1 class="mb-3">Create Course</h1>
    <form @submit.prevent="handleSubmit()">
        <div class="mb-3">
            <label class="form-label" for="title">Title</label>
            <input class="form-control" id="title" required v-model="form.title" />
        </div>
        <div class="mb-3">
            <label class="form-label" for="description">Description</label>
            <textarea id="description" class="form-control" v-model="form.description" required></textarea>
        </div>
        <button class="btn btn-primary">Submit</button>
    </form>
</template>