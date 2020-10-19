import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Slug from "../views/Slug.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/:slug",
    component: Slug
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
