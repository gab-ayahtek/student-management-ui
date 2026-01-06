<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createStudent } from '../../api/api.ts'

const router = useRouter()
const form = ref({
  email: '',
  first_name: '',
  last_name: '',
  address: '',
})
async function handleSubmit() {
  try {
    await createStudent(form)
    form.value = {
      email: '',
      first_name: '',
      last_name: '',
      address: '',
    }
    await router.push('/students')
  } catch (error) {
    console.error('Failed to create student:', error)
    if (error.response.data.message) alert(error.response.data.message)
  }
}
</script>
<template>
  <h1 class="mb-3">Create student</h1>
  <form @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label for="email">Email</label>
      <input v-model="form.email" type="email" class="form-control" id="email" required />
    </div>
    <div class="mb-3">
      <label for="first-name">First Name</label>
      <input v-model="form.first_name" class="form-control" id="first-name" required />
    </div>
    <div class="mb-3">
      <label for="last-name">Last Name</label>
      <input v-model="form.last_name" class="form-control" id="last-name" required />
    </div>
    <div class="mb-3">
      <label for="address">Address</label>
      <input v-model="form.address" class="form-control" id="address" required />
    </div>
    <div class="mb-3">
      <button class="btn btn-primary" type="submit">Submit</button>
    </div>
  </form>
</template>
