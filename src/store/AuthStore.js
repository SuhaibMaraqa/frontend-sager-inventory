import axios from "axios";
import { defineStore } from "pinia";
import router from "../router/index";

export const useAuthStore = defineStore("login", {
  id: "auth",
  state: () => ({
    user: null,
    token: "",
    isAuth: false,
  }),
  persist: {
    enabled: true,
  },
});
