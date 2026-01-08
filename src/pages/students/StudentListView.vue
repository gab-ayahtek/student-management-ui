<script lang="ts" setup>
import type { Course, PaginatedStudents, Student } from '@/api/types';
import { getStudentList, deleteStudent, getCourseList, addStudentToCourse } from '../../api/api';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const router = useRouter();

const searchQuery = ref('');
const students = ref<Student[]>([]);
const selectedStudent = ref({
  id: '',
  name: '',
});
const selectedCourse = ref('Choose an option');
const courses = ref<Course[]>([]);

const nextPageNum = ref<number | null>(1);
const prevPageNum = ref<number | null>(null);
const lastPageNum = ref(0);
const hasNextPage = ref(false);
const hasPrevPage = ref(false);

async function handleSearch() {
  console.log(`search term: ${searchQuery.value}`)
  searchQuery.value = "";
}

async function getCourses() {
  if (courses.value.length < 1) {
    console.log('fetching course list...');
    courses.value = await getCourseList();
  }
}

async function retrieveStudents(page: number | null) {
  if (page == null) return;

  console.log('fetching student list...');
  const data: PaginatedStudents = await getStudentList(page);
  if (data) {
    lastPageNum.value = data.last_page;
    students.value = data.data;
    hasNextPage.value = data.current_page < lastPageNum.value;
    hasPrevPage.value = data.current_page > 1;

    nextPageNum.value = data.next_page_url ? Number(new URL(data.next_page_url).searchParams.get("page")) : null;
    prevPageNum.value = data.prev_page_url ? Number(new URL(data.prev_page_url).searchParams.get("page")) : null;
  }
}

function selectStudent(student: Student) {
  selectedStudent.value = {
    id: student.id,
    name: student.first_name + ' ' + student.last_name,
  };
}

function createStudent() {
  router.push('/students/create');
}

function viewStudent(studentId: string) {
  router.push(`/students/${studentId}`);
}

function editStudent(student: Student) {
  router.push(`/students/${student.id}/edit`);
}

async function handleDelete(studentId: string) {
  if (window.confirm('Are you sure?')) {
    await deleteStudent(studentId);
    window.location.reload();
  }
}

async function handleEnroll() {
  await addStudentToCourse(selectedStudent.value.id, selectedCourse.value);
}

onMounted(() => {
  retrieveStudents(nextPageNum.value);
  getCourses();
});
</script>
<template>
  <!-- SEARCH BAR -->
  <h1 class="text-xl text-center py-4">Student List</h1>
  <div class="flex">
    <form class="relative pr-4 flex-1" @submit.prevent="handleSearch()">
      <!-- <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} /> -->
      <input type="text" placeholder="Search students..." v-model="searchQuery"
        class="text-sm w-full pl-4 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400 text-slate-100 placeholder-slate-400" />
    </form>
    <button @click="router.push('/students/create')"
      class="text-sm bg-blue-600/20 cursor-pointer hover:opacity-85 transition-all py-2 px-6 rounded-[8px]">Create
      Student</button>
  </div>
  <!-- CARD -->
  <div v-for="student in students" :key="student.id" class="pt-3">
    <div class="border-2 border-slate-800 bg-slate-900/50 py-4 px-6 flex justify-between rounded-[8px]">
      <div class="flex-1">
        <h3 class=" font-semibold text-slate-50 mb-1">{{ student.first_name + ' ' + student.last_name }}</h3>
        <p class="text-xs text-slate-400 pb-3">{{ student.email }}</p>
        <span class="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full border border-blue-600/30">
          Courses enrolled: 3
        </span>
      </div>
      <div class="flex gap-[1.25rem]">
        <div class="cursor-pointer h-max" title="View">
          <font-awesome-icon icon="fa-regular fa-eye" />
        </div>
        <div class="cursor-pointer h-max" title="Enroll">
          <font-awesome-icon icon="fa-regular fa-calendar-plus" />
        </div>
        <div class="cursor-pointer h-max" title="Edit">
          <font-awesome-icon icon="fa-regular fa-pen-to-square" />
        </div>
        <div class="cursor-pointer h-max" title="Delete">
          <font-awesome-icon icon="fa-regular fa-trash-can" />
        </div>
      </div>
    </div>
  </div>

  <h1 v-if="students.length < 1" class="text-center">No students registered.</h1>

  <div class="flex justify-end gap-3 pt-3">
    <button class="py-2 bg-slate-900 border-1 border-slate-700 w-[5rem] rounded-[4px]"
      :class="{ 'opacity-50': !hasPrevPage, 'cursor-pointer': hasPrevPage, 'hover:opacity-85': hasPrevPage }"
      @click="retrieveStudents(prevPageNum)">
      Prev
    </button>
    <button class="py-2 bg-slate-900 border-1 border-slate-700 w-[5rem] rounded-[4px]"
      :class="{ 'opacity-50': !hasNextPage, 'cursor-pointer': hasNextPage, 'hover:opacity-85': hasNextPage }"
      @click="retrieveStudents(nextPageNum)">
      Next
    </button>
  </div>
</template>