import { defineStore } from "pinia";

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
