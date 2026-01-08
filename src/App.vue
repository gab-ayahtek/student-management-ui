<script setup lang="ts">
import { onMounted } from "vue";
import "./index.css";
import { useRoute } from "vue-router"

const route = useRoute();

onMounted(() => {
  console.log(`Route: ${route.fullPath}`);
})
</script>

<template>
  <div class="bg-slate-950 min-h-dvh text-slate-100 font-jakarta pt-4 flex flex-col items-center">

    <div class="w-[95%] max-w-[1200px]">

      <header class="border-slate-800 border-2 bg-slate-900/50 px-6 py-5 rounded-[8px] mb-6">
        <nav class="flex justify-between items-center">
          <router-link class="text-xl font-bold tracking-tight hover:text-blue-400" to="/">
            My Portal
          </router-link>

          <ul class="flex gap-6 items-center list-none m-0 p-0">
            <li>
              <router-link class="hover:text-blue-400 transition-colors" to="/students">
                Students
              </router-link>
            </li>
            <li>
              <router-link class="hover:text-blue-400 transition-colors" to="/courses">
                Courses
              </router-link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>