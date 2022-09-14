<script>
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";
import { useAuthStore } from "../store/AuthStore";

export default {
  name: "Home",
  setup() {
    const authStore = useAuthStore();
    const { user } = storeToRefs(authStore);

    const message = ref("");

    const role = reactive({
      isAdmin: false,
      isCenter: false,
      isPilot: false,
    });

    message.value = `Hello, ${user.value.first_name}`;
    role.isAdmin = user.value.isAdmin;
    role.isCenter = user.value.isCenter;
    role.isPilot = user.value.isPilot;

    return {
      message,
      role,
    };
  },
};
</script>

<template>
  <div class="container mt-5 text-center">
    <h3>{{ message }}</h3>

    <div style="margin-top: 1.5rem">
      <!-- Center $ Pilot Section -->
      <section v-if="role.isCenter || role.isPilot">
        <router-link to="/add-drone" class="btn btn-home me-2"
          >Add Drone</router-link
        >
        <router-link to="/add-payload" class="btn btn-home me-2"
          >Add Payload</router-link
        >
        <router-link to="/add-battery" class="btn btn-home me-2"
          >Add Battery</router-link
        >
        <router-link to="/show-drone" class="btn btn-home me-2"
          >Show Drone</router-link
        >
        <router-link to="/list-drones" class="btn btn-home me-2"
          >List Drones</router-link
        >
      </section>

      <!-- Admin Section -->
      <section v-if="role.isAdmin">
        <router-link to="/add-drone-model" class="btn btn-home me-2"
          >Add Drone Model</router-link
        >
        <router-link to="/add-payload-model" class="btn btn-home me-2"
          >Add Payload Model</router-link
        >
        <router-link to="/add-battery-model" class="btn btn-home me-2"
          >Add Battery Model</router-link
        >
      </section>
    </div>
  </div>
</template>
