<script setup lang="ts">
import { reactive } from "vue";
import type { Course } from "@/api/types"
import ModalTextInput from "./ModalTextInput.vue";

const props = defineProps<{
    isModalOpen: boolean,
    courses: Course[],
}>();
const form = reactive(getFormInitialState());

const emit = defineEmits(['response'])

function handleCloseModal() {
    emit('response', false);
}

function getFormInitialState() {
    return {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
    }
}

function handleSubmit() {
    console.log(`student name: ${form.firstName} ${form.lastName}`);
    clearForm();
    handleCloseModal();
}

function clearForm() {
    Object.assign(form, getFormInitialState());
}

</script>
<template>
    <div v-if="props.isModalOpen"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div class="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div class="flex items-center justify-between pb-6">
                <h2 class="text-xl font-semibold text-slate-50">Add New Student</h2>
                <button
                    class="cursor-pointer p-1 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-slate-300"
                    @click="handleCloseModal()">
                    <font-awesome-icon icon="fa-solid fa-xmark" />
                </button>
            </div>
            <form class="flex flex-col gap-3" @submit.prevent="handleSubmit()">
                <ModalTextInput v-model="form.firstName" id="first-name" type="text" label="First Name"
                    placeholder="Enter student first name" />
                <ModalTextInput v-model="form.lastName" id="last-name" type="text" label="Last Name"
                    placeholder="Enter student last name" />
                <ModalTextInput v-model="form.email" id="email" type="email" label="Email Address"
                    placeholder="student@email.com" />
                <ModalTextInput v-model="form.address" id="address" type="text" label="Address"
                    placeholder="Enter student address" />
                <div>
                    <label class="block text-sm font-medium text-slate-300 pb-2">Enroll in Courses (Optional)</label>
                    <div class="max-h-35 overflow-auto">
                        <div v-for="course in props.courses" :key="course.id">
                            <label
                                class="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors">
                                <input type="checkbox"
                                    class="w-4 h-4 rounded border-slate-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900" />
                                <div class="flex-1">
                                    <span class="text-sm text-slate-300">{{ course.title }}</span>
                                    <span class="text-xs pl-2 text-slate-500">2/30</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="flex gap-3 mt-6">
                    <button type="button" @click="handleCloseModal()"
                        class="flex-1 px-4 py-2.5 bg-slate-800 hover:opacity-85 text-slate-300 rounded-lg transition-opacity cursor-pointer">
                        Cancel
                    </button>
                    <button type="submit"
                        class="flex-1 px-4 py-2.5 bg-blue-600 hover:opacity-85 text-white rounded-lg transition-opacity cursor-pointer">
                        Add Student
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>