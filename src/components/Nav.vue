<script>
import axios from "axios";
// import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/AuthStore";

export default {
  name: "Nav",
  setup() {
    const store = useAuthStore();
    const { isAuth } = storeToRefs(store);
    const logout = async () => {
      await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(() => {
        store.isAuth = false;
      });

      // await axios.post("http://127.0.0.1:8000/api/logout", {
      //   withCredentials: true,
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      // });
    };

    return {
      isAuth,
      logout,
    };
  },
};
</script>

<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <ul
          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
        >
          <li>
            <router-link to="/home" class="nav-link px-2 text-white"
              >Home</router-link
            >
          </li>
        </ul>

        <div class="text-end" v-show="!isAuth">
          <router-link to="/" class="btn btn-outline-light me-2"
            >Login</router-link
          >
          <router-link to="/register" class="btn btn-outline-light me-2"
            >Register</router-link
          >
        </div>

        <div class="text-end" v-show="isAuth">
          <router-link to="/" class="btn btn-outline-light me-2" @click="logout"
            >Logout</router-link
          >
        </div>
      </div>
    </div>
  </header>
</template>
