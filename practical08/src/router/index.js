import { createRouter, createWebHistory } from "vue-router";
import IndexPage from "../views/IndexPage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import CarDetailsPage from "../views/CarDetailsPage.vue";
import store from "../store/index";
import cookies from "vue-cookies";

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

// router.beforeEach((to, from, next) => {
//   let isAuthenticated = store.getters.isUserAuthenticated;

//   if (to.meta.requireAuth) {
//     if (!isAuthenticated) {
//       return next({ path: "/login" });
//     }
//   } else {
//     if (isAuthenticated) {
//       return next({ path: "/" });
//     }
//   }
// });

router.beforeEach((to, from, next) => {
  if (cookies.isKey("authUser")) {
    store.commit("ISUSERAUTHENTICATED", true);
  } else {
    store.commit("ISUSERAUTHENTICATED", false);
  }

  let isAuthenticated = store.getters.isUserAuthenticated;
  if ("auth" in to.meta && to.meta.auth && !isAuthenticated) {
    next("/login");
  } else if ("auth" in to.meta && !to.meta.auth && isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
