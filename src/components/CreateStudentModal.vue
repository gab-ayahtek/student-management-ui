<script setup lang="ts">
import { inject, reactive } from "vue";
import ModalTextInput from "./ModalTextInput.vue";
import ModalCourseList from "./ModalCourseList.vue";
import { CourseKey, type StudentForm } from "@/api/types";
import { createStudent } from "@/api/api";

const context = inject(CourseKey);

if (!context) throw new Error("Could not resolve CourseContext");

const { courses } = context;

const props = defineProps<{
  isModalOpen: boolean;
}>();
const form = reactive(getFormInitialState());

const emit = defineEmits(["response"]);
function handleCloseModal() {
  emit("response", false);
}

function getFormInitialState(): StudentForm {
  return {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  };
}

async function handleSubmit() {
  const enrolledCourses = courses.value
    .filter((c) => c.enrolled)
    .map((c) => c.id);
  await createStudent(form, enrolledCourses);
  clearForm();
  handleCloseModal();
  window.location.reload();
}

function clearForm() {
  Object.assign(form, getFormInitialState());
}
</script>
<template>
  <div
    v-if="props.isModalOpen"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
  >
    <div
      class="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl"
    >
      <div class="flex items-center justify-between pb-6">
        <h2 class="text-xl font-semibold text-slate-50">Add New Student</h2>
        <button
          class="cursor-pointer p-1 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-slate-300"
          @click="handleCloseModal()"
        >
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </button>
      </div>
      <form class="flex flex-col gap-3" @submit.prevent="handleSubmit()">
        <ModalTextInput
          v-model="form.firstName"
          id="first-name"
          type="text"
          label="First Name"
          placeholder="Enter student first name"
        />
        <ModalTextInput
          v-model="form.lastName"
          id="last-name"
          type="text"
          label="Last Name"
          placeholder="Enter student last name"
        />
        <ModalTextInput
          v-model="form.email"
          id="email"
          type="email"
          label="Email Address"
          placeholder="student@email.com"
        />
        <ModalTextInput
          v-model="form.address"
          id="address"
          type="text"
          label="Address"
          placeholder="Enter student address"
        />
        <ModalCourseList />
        <div class="flex gap-3 mt-6">
          <button
            type="button"
            @click="handleCloseModal()"
            class="flex-1 px-4 py-2.5 bg-slate-800 hover:opacity-85 text-slate-300 rounded-lg transition-opacity cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2.5 bg-blue-600 hover:opacity-85 text-white rounded-lg transition-opacity cursor-pointer"
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
