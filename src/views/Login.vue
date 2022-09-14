<script>
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/AuthStore";

import axios from "axios";

export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const store = useAuthStore();

    const submit = async (e) => {
      const form = new FormData(e.target);

      const inputs = Object.fromEntries(form.entries());

      await axios
        .post("http://127.0.0.1:8000/api/login", inputs, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          store.isAuth = true;
          store.user = response.data.user;
          store.token = response.data.token;

          router.push("/home");
        })
        .catch((e) => {
          console.error(e);
        });
    };

    return {
      submit,
    };
  },
};
</script>

<template>
  <main class="form-signin">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          name="email"
          placeholder="name@example.com"
          autocomplete="off"
        />
        <label>Email</label>
      </div>

      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          name="password"
          placeholder="Password"
          autocomplete="off"
        />
        <label>Password</label>
      </div>

      <div class="hint-text">
        Not A User?
        <router-link class="hint-router" to="/Register"
          >Register Now</router-link
        >
      </div>

      <button class="w-100 btn btn-lg btn-form" type="submit">Submit</button>
    </form>
  </main>
</template>
