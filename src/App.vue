<template>
  <!-- <Nav :user="user" /> -->
  <Nav />
  <router-view />
</template>

<script>
// import axios from "axios";
import Nav from "./components/Nav.vue";
export default {
  name: "App",
  components: { Nav },

  // data() {
  //   return {
  //     user: null,
  //   };
  // },

  // async created() {
  //   const response = await axios.get("user");

  //   this.user = response.data;
  // },
};
</script>

<style></style>
