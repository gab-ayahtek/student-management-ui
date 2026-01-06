<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getSpecificCourse, updateCourse } from '@/api/api';

const route = useRoute();
const router = useRouter();
const course = ref({
    title: '',
    description: '',
});

async function handleUpdate() {
    await updateCourse(route.params.id, course.value.title, course.value.description)
    router.back();
}

onMounted(async () => {
    course.value = await getSpecificCourse(route.params.id);
})

</script>
<template>
    <h1 class="mb-4">Edit Course</h1>
    <form @submit.prevent="handleUpdate()">
        <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input v-model="course.title" class="form-control" id="title" required />
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea v-model="course.description" class="form-control" id="description" required></textarea>
        </div>
        <button class="btn btn-warning">Update</button>
    </form>
</template>