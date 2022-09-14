<script>
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "Register",
  setup() {
    const router = useRouter();

    const submit = async (e) => {
      const form = new FormData(e.target);

      const inputs = Object.fromEntries(form.entries());

      inputs.role_id = "pilot";
      inputs.gender = "m";
      inputs.national_id = Math.floor(Math.random() * 1000000);

      await axios.post("http://127.0.0.1:8000/api/register", inputs);

      await router.push("/");
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
      <h1 class="h3 mb-3 fw-normal">Please register</h1>

      <div class="form-floating">
        <input
          class="form-control"
          autocomplete="off"
          name="first_name"
          placeholder="firstName"
        />
        <label>First Name</label>
      </div>

      <div class="form-floating">
        <input
          class="form-control"
          autocomplete="off"
          name="last_name"
          placeholder="lastName"
        />
        <label>Last Name</label>
      </div>

      <!-- <div class="form-floating">
        <input
          type="text"
          class="form-control"
          autocomplete="off"
          name="national_id"
          placeholder="National ID"
        />
        <label>National ID</label>
      </div> -->

      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          name="email"
          placeholder="name@example.com"
          autocomplete="off"
        />
        <label>Email address</label>
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
        Already have an account?
        <router-link class="hint-router" to="/">Login here</router-link>
      </div>

      <button class="w-100 btn btn-lg btn-form" type="submit">Submit</button>
    </form>
  </main>
</template>
