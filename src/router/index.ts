import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/students",
      name: "studentList",
      component: () => import("../pages/students/StudentListView.vue"),
    },
    {
      path: "/courses",
      name: "courseList",
      component: () => import("../pages/courses/CourseListView.vue"),
    },
    {
      path: "/courses/create",
      name: "courseCreate",
      component: () => import("../pages/courses/CourseCreateView.vue"),
    },
    {
      path: "/courses/:id/edit",
      name: "courseEdit",
      component: () => import("../pages/courses/CourseEditView.vue"),
    },
    {
      path: "/courses/:id",
      name: "courseShow",
      component: () => import("../pages/courses/CourseShowView.vue"),
    },
    {
      path: "/:pathMatch(.*)*", // Matches all unmatched routes
      name: "NotFound",
      component: () => import("../pages/NotFoundView.vue"),
    },
  ],
});

export default router;
