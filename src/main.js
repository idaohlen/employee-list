import { createApp } from "vue";
import "./styles/main.scss";
import App from "./App.vue";
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

const app = createApp(App);
app.use(FloatingVue);
app.mount("#app");
