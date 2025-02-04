import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DemoView from "../views/DemoView.vue";
import TestView from "../views/TestView.vue";
import FrameTest from "../views/FrameTest.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/demo",
      name: "demo",
      component: DemoView,
    },
    {
      path: "/test",
      name: "test",
      component: TestView,
    },
    {
      path: "/frame-test",
      name: "frame-test",
      component: FrameTest,
    },
  ],
});

export default router;
