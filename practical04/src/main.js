import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarComponent from "./components/NavBarComponent";

createApp(App).component("app-header", NavBarComponent).mount("#app");
