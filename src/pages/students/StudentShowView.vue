<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { coursesOfStudent, getSpecificStudent, unenrollStudent } from "@/api/api";

const student = ref({
  id: '',
  email: '',
  first_name: '',
  last_name: '',
  address: '',
});

const courses = ref([]);
const route = useRoute();

async function handleUnenroll(courseId) {
  await unenrollStudent(student.value.id, courseId)
  window.location.reload();
}

onMounted(async () => {
  student.value = await getSpecificStudent(route.params.id);
  courses.value = await coursesOfStudent(route.params.id);
})
</script>
<template>
  <h1 class="mb-3">Show student</h1>
  <div class="d-flex gap-2">
    <strong>Student ID: </strong>
    <p>{{ student.id }}</p>
  </div>
  <div class="d-flex gap-2">
    <strong>Full Name: </strong>
    <p>{{ student.first_name + ' ' + student.last_name }}</p>
  </div>
  <div class="d-flex gap-2">
    <strong>Email: </strong>
    <p>{{ student.email }}</p>
  </div>
  <div class="d-flex gap-2">
    <strong>Address: </strong>
    <p>{{ student.address }}</p>
  </div>
  <strong>Enrolled Courses:</strong>
  <div v-for="course in courses" class="d-flex gap-2 mt-3">
    <button @click="handleUnenroll(course.id)" class="btn btn-danger">Unenroll</button>
    <p>{{ course.title }}</p>
  </div>
</template>
