import { createRouter, createWebHistory } from "vue-router";
import IndexPage from "../views/IndexPage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import CarDetailsPage from "../views/CarDetailsPage.vue";

const routes = [
  {
    path: "/",
    name: "IndexPage",
    component: IndexPage,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage,
  },
  {
    path: "/cardetails/:id",
    name: "CarDetailsPage",
    component: CarDetailsPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
