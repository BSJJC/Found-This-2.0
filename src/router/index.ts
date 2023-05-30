import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "/",
      component: () => import("@/pages/Home.vue"),
    },
    {
      path: "/addTopic",
      name: "addTopic",
      component: () => import("@/pages/AddTopic.vue"),
    },
  ],
});

export default router;
