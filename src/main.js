import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import axios from "axios";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";

import { useAuthStore } from "./store/AuthStore";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersist);
app.component("Datepicker", Datepicker);
app.use(pinia);
app.use(router);

axios.interceptors.request.use((request) => {
  const authStore = useAuthStore();

  request.headers.Authorization = `Bearer ${authStore.token}`;

  return request;
});

app.mount("#app");
