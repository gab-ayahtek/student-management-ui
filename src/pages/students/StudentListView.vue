<script lang="ts" setup>
import { getStudentList, deleteStudent, getCourseList, addStudentToCourse } from '../../api/api'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const students = ref([])
const selectedStudent = ref({
  id: '',
  name: '',
})
const selectedCourse = ref('Choose an option');
const courses = ref([])

async function getCourses() {
  if (courses.value.length < 1) {
    console.log("fetching...");
    courses.value = await getCourseList();
  }
}

async function fetchStudents() {
  students.value = await getStudentList()
}

function selectStudent(student) {
  selectedStudent.value = {
    id: student.id,
    name: student.first_name + " " + student.last_name,
  }
}

function createStudent() {
  router.push('/students/create')
}

function viewStudent(studentId: string) {
  router.push(`/students/${studentId}`)
}

function editStudent(student) {
  router.push(`/students/${student.id}/edit`)
}

async function handleDelete(studentId) {
  if (window.confirm('Are you sure?')) {
    await deleteStudent(studentId)
    window.location.reload()
  }
}

async function handleEnroll() {
  await addStudentToCourse(selectedStudent.value.id, selectedCourse.value)

}

onMounted(() => {
  fetchStudents();
  getCourses();
})

</script>
<template>
  <div class="d-flex justify-content-between">
    <div>
      <h2 class="mb-4">Student List</h2>
    </div>
    <div>
      <button @click="createStudent()" class="btn btn-primary">Create</button>
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-striped table-hover table-bordered mb-0">
      <thead>
        <tr>
          <th scope="col">Email</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="student in students" :key="student.id" v-if="students.length > 0">
          <td>{{ student.email }}</td>
          <td>{{ student.first_name }}</td>
          <td>{{ student.last_name }}</td>
          <td class="text-nowrap">
            <button @click="viewStudent(student.id)" class="btn btn-primary me-2">View</button>
            <button @click="selectStudent(student)" type="button" data-bs-toggle="modal" data-bs-target="#enroll-modal"
              class="btn btn-success me-2">Enroll</button>
            <button @click="editStudent(student)" class="btn btn-warning me-2">Update</button>
            <button @click="handleDelete(student.id)" class="btn btn-danger">Delete</button>
          </td>
        </tr>

        <tr v-else>
          <td colspan="6" class="text-center text-muted">No students found</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- MODAL -->
  <div class="modal fade" id="enroll-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="bg-primary-subtle p-3 rounded mb-3">
            <p class="mb-2">Selected Student</p>
            <strong v-text="selectedStudent.name"></strong>
          </div>
          <form>
            <label for="course-select" class="form-label">Select Course</label>
            <select id="course-select" class="form-control" v-model="selectedCourse">
              <option disabled value="">Choose an option...</option>
              <option v-if="courses.length > 0" v-for="course in courses" v-text="course.title" :value="course.id">
              </option>
            </select>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button @click="handleEnroll()" data-bs-dismiss="modal" type="button" class="btn btn-primary">Save
            changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
