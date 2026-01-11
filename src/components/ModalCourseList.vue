<script setup lang="ts">
import { CourseKey } from "@/api/types";
import { inject } from "vue";

const context = inject(CourseKey);

if (!context) throw new Error("Could not resolve CourseContext");

const { courses, toggleCourse } = context;
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-slate-300 pb-2"
      >Enroll in Courses (Optional)</label
    >
    <div class="max-h-35 overflow-auto">
      <div v-for="course in courses" :key="course.id">
        <label
          class="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors"
        >
          <input
            @change="toggleCourse(course.id)"
            type="checkbox"
            class="w-4 h-4 rounded border-slate-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900"
          />
          <div class="flex-1">
            <span class="text-sm text-slate-300">{{ course.title }}</span>
            <span class="text-xs pl-2 text-slate-500">2/30</span>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
