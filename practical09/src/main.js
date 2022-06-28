import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarComponent from "./components/NavBarComponent";
import router from "./router";
import store from "./store/index";
import Toaster from "@meforma/vue-toaster";

createApp(App)
  .use(store)
  .use(router)
  .use(Toaster)
  .component("app-header", NavBarComponent)
  .mount("#app");
