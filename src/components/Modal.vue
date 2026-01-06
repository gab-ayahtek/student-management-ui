<script setup>
import { getCourseList } from '@/api/api';
import { ref, defineProps } from "vue"

const props = defineProps({
    studentName: {
        type: String,
        required: true,
    },
    studentId: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
})

const courses = ref([])

async function getCourses() {
    if (courses.value.length < 1) {
        console.log("fetching...");
        courses.value = await getCourseList();
    }
}
getCourses();

</script>
<template>
    <div class="modal fade" id="modal-{{ props.id }}" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Enroll in Course</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="bg-primary-subtle p-3 rounded mb-3">
                        <p class="mb-2">Selected Student</p>
                        <strong v-text="props.studentName"></strong>
                    </div>
                    <form>
                        <label for="course-select" class="form-label">Select Course</label>
                        <select id="course-select" class="form-control">
                            <option selected disabled>Choose an option...</option>
                            <option v-if="courses.length > 0" v-for="course in courses" v-text="course.title"
                                :value="course.id"></option>
                        </select>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>