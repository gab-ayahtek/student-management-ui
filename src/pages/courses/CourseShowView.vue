<script setup>
import { getSpecificCourse, getStudentsEnrolledInCourse, unenrollStudent } from '@/api/api';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const course = ref({
    title: '',
    description: '',
});

const enrolled = ref([]);

async function handleUnenroll(studentId) {
    if (confirm('Unenroll student?')) {
        await unenrollStudent(studentId, route.params.id)
        window.location.reload();
    }
}

onMounted(async () => {
    course.value = await getSpecificCourse(route.params.id);
    enrolled.value = await getStudentsEnrolledInCourse(route.params.id)
});

</script>
<template>
    <h1 class="mb-4">Show Course</h1>
    <div class="d-flex gap-2">
        <strong>Course ID:</strong>
        <p>{{ route.params.id }}</p>
    </div>
    <div class="d-flex gap-2">
        <strong>Title:</strong>
        <p>{{ course.title }}</p>
    </div>
    <div class="d-flex gap-2">
        <strong>Description:</strong>
        <p>{{ course.description }}</p>
    </div>
    <strong>Students enrolled:</strong>
    <div v-for="student in enrolled" class="d-flex gap-2 mt-2">
        <button @click="handleUnenroll(student.id)" class="btn btn-danger">Unenroll</button>
        <p>{{ student.name }}</p>
    </div>
</template>