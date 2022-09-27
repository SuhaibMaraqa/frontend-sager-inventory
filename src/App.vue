<template>
  <Nav />
  <router-view />
</template>

<script>
// import axios from "axios";
import Nav from "./components/Nav.vue";
export default {
  name: "App",
  components: { Nav },
};
</script>

<style></style>
