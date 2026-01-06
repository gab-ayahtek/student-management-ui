<script lang="ts" setup>
import { getCourseList } from '../../api/api'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();
const courses = ref([])

async function fetchCourses() {
  courses.value = await getCourseList()
}

function createCourse() {
  router.push('/courses/create')
}

onMounted(fetchCourses)
</script>
<template>
  <div class="d-flex justify-content-between mb-4">
    <div>
      <h2>Course List</h2>
    </div>
    <div>
      <button class="btn btn-primary" @click="createCourse()">Create</button>
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-striped table-hover table-bordered mb-0">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="course in courses" :key="course.id" v-if="courses.length > 0">
          <td>{{ course.title }}</td>
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
