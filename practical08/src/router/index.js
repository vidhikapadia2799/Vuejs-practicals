import { createRouter, createWebHistory } from "vue-router";
import IndexPage from "../views/IndexPage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import CarDetailsPage from "../views/CarDetailsPage.vue";
import store from "../store/index";
import cookies from "vue-cookies";
import jwt_decode from "jwt-decode";

const routes = [
  {
    path: "/",
    name: "IndexPage",
    component: IndexPage,
    meta: { auth: true },
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
    meta: { auth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (cookies.isKey("authUser")) {
    store.commit("IS_USER_AUTHENTICATED", true);

    let cookie_value = cookies.get("authUser");
    let decoded = jwt_decode(cookie_value);
    store.commit("SET_USERNAME", decoded.name);
  } else {
    store.commit("IS_USER_AUTHENTICATED", false);
  }

  let isAuthenticated = store.getters.IS_USER_AUTHENTICATED;
  if ("auth" in to.meta && to.meta.auth && !isAuthenticated) {
    next("/login");
  } else if ("auth" in to.meta && !to.meta.auth && isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
