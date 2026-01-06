import api from './axios'

export async function getStudentList() {
  const data = await api.get('/students')
  return data
}

export async function getSpecificStudent(studentId: string) {
  const data = await api.get(`/students/${studentId}`);
  return data;
}

export async function getCourseList() {
  const data = await api.get('/courses')
  return data
}

export async function createStudent(form) {
  const v = form.value
  await api.post('/students', {
    email: v.email,
    first_name: v.first_name,
    last_name: v.last_name,
    address: v.address,
  })
}

export async function updateStudent(student) {
  await api.put(`/students/${student.id}`, {
    email: student.email,
    first_name: student.first_name,
    last_name: student.last_name,
    address: student.address,
  });
}

export async function deleteStudent(id: string) {
  await api.delete(`/students/${id}`)
}

export async function addStudentToCourse(studentId:string, courseId:string) {
  await api.post(`/students/${studentId}/courses/${courseId}`);
}

export async function coursesOfStudent(studentId: string) {
  return await api.get(`/students/${studentId}/courses`);
}

export async function unenrollStudent(studentId: string, courseId: string) {
  await api.delete(`/students/${studentId}/courses/${courseId}`);
}

export async function createCourse(form) {
  const v = form.value;
  await api.post('/courses', {
    title: v.title,
    description: v.description ?? '',
  })
}