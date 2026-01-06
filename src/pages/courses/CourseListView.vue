<script lang="ts" setup>
import { getCourseList } from '../../api/api'
import { ref, onMounted } from 'vue'

const courses = ref([])

async function fetchCourses() {
  courses.value = await getCourseList()
}

onMounted(fetchCourses)
</script>
<template>
  <h2 class="mb-4">Course List</h2>

  <div class="table-responsive">
    <table class="table table-striped table-hover table-bordered mb-0">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="course in courses" :key="course.id" v-if="courses.length > 0">
          <td>{{ course.id }}</td>
          <td>{{ course.title }}</td>
          <td>{{ course.description }}</td>
          <td class="text-nowrap">
            <button class="btn btn-primary me-2">View</button>
            <button class="btn btn-warning me-2">Update</button>
            <button class="btn btn-danger">Delete</button>
          </td>
        </tr>

        <tr v-else>
          <td colspan="6" class="text-center text-muted">No courses found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
