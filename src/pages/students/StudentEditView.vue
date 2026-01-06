<script lang="ts" setup>
import { getSpecificStudent, updateStudent } from '@/api/api';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter();
const student = ref({
  id: '',
  email: '',
  first_name: '',
  last_name: '',
  address: '',
});

async function handleSubmit() {
  try {
    await updateStudent(student);
    router.back();
  } catch (error) {
    alert(error.response.data.message);
  }
}
onMounted(async () => {
  student.value = await getSpecificStudent(route.params.id)
})
</script>
<template>
  <h1 class="mb-3">Edit student</h1>
  <form v-if="student != null" @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label for="email">Email</label>
      <input v-model="student.email" class="form-control" id="email" required />
    </div>
    <div class="mb-3">
      <label for="first-name">First Name</label>
      <input v-model="student.first_name" class="form-control" id="first-name" required />
    </div>
    <div class="mb-3">
      <label for="last-name">Last Name</label>
      <input v-model="student.last_name" class="form-control" id="last-name" required />
    </div>
    <div class="mb-3">
      <label for="address">Address</label>
      <input v-model="student.address" class="form-control" id="address" required />
    </div>
    <div class="mb-3">
      <button class="btn btn-warning">Update</button>
    </div>
  </form>
</template>
