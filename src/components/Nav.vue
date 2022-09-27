<script>
import axios from "axios";
// import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/AuthStore";

export default {
  name: "Nav",
  setup() {
    const store = useAuthStore();
    const { isAuth, user } = storeToRefs(store);
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
      user,
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
            <!-- <router-link to="/home" class="nav-link px-2 text-white"
              ><img
                src="../../public/images/new-logo.png"
                class="nav-logo"
                alt="sager-logo"
            /></router-link> -->
            <router-link to="/home" class="nav-link px-2 text-white"
              >Home</router-link
            >
          </li>
        </ul>

        <div class="text-end" v-if="!isAuth">
          <router-link to="/" class="btn btn-outline-light me-2"
            >Login</router-link
          >
          <router-link to="/register" class="btn btn-outline-light me-2"
            >Register</router-link
          >
        </div>

        <div class="text-end" v-else="isAuth">
          <!-- <router-link to="/" class="btn btn-outline-light me-2" @click="logout"
            >Logout</router-link
          > -->

          <div class="dropdown">
            <button
              class="btn btn-outline-light dropdown-toggle"
              type="button"
              style="border: none"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Hello, {{ user.first_name }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <router-link to="/" class="dropdown-item" @click="logout"
                >Logout</router-link
              >
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
