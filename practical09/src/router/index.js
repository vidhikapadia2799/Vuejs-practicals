import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
import cookies from "vue-cookies";
import jwt_decode from "jwt-decode";

const routes = [
  {
    path: "/",
    name: "IndexPage",
    component: () =>
      import(/* webpackChunkName: "IndexPage" */ "../views/IndexPage.vue"),
    meta: { auth: true },
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () =>
      import(/* webpackChunkName: "LoginPage" */ "../views/LoginPage.vue"),
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: () =>
      import(
        /* webpackChunkName: "RegisterPage" */ "../views/RegisterPage.vue"
      ),
  },
  {
    path: "/cardetails/:id",
    name: "CarDetailsPage",
    component: () =>
      import(
        /* webpackChunkName: "CarDetailsPage" */ "../views/CarDetailsPage.vue"
      ),
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
