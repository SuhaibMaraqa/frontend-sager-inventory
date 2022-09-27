<script>
import axios from "axios";
import { onMounted, ref } from "vue";

export default {
  name: "listBatteries",

  setup() {
    const batteries = ref([]);

    onMounted(() => {
      getbatteries();
    });

    function getbatteries() {
      axios.get("http://127.0.0.1:8000/api/batteries").then((response) => {
        batteries.value = response.data;
      });
    }

    const backendServer = import.meta.env.VITE_APP_BACKEND_URI;
    return {
      batteries,
      backendServer,
    };
  },
};
</script>

<template>
  <h1 class="no-batteries-text text-center" v-if="batteries.length == 0">
    No batteries available.
  </h1>

  <section style="background-color: #f9f9f9" v-else>
    <div class="container py-5">
      <div class="row">
        <div
          class="col-md-12 col-lg-4 mb-4 mb-lg-3"
          v-for="battery in batteries"
        >
          <!-- <div class="col-md-6 col-lg-4 mb-4 mb-md-0" v-for="battery in batteries"> -->
          <router-link
            :to="'/show-battery/' + battery.id"
            style="text-decoration: none"
          >
            <div class="card text-black">
              <img
                :src="backendServer + battery.image"
                class="card-img-top"
                alt="iPhone"
              />

              <div class="card-body">
                <div class="text-center mt-1">
                  <h4 class="card-title">{{ battery.name }}</h4>
                  <h6 class="text-primary mb-1 pb-3">
                    Serial Number {{ battery.serial_number }}
                  </h6>
                </div>

                <div class="text-center">
                  <div class="p-3 mx-n3 mb-4" style="background-color: #f9f9f9">
                    <h5 class="mb-0">{{ battery.physical_status }}</h5>
                  </div>

                  <div class="d-flex flex-column mb-4">
                    <span class="mb-0"
                      >Brand Name
                      <span class="fw-bold">{{
                        battery.brand_name
                      }}</span></span
                    >
                    <span
                      >Model Name
                      <span class="fw-bold">{{ battery.model_name }}</span>
                    </span>
                  </div>

                  <div class="p-3 mx-n3 mb-4" style="background-color: #f9f9f9">
                    <h5 class="mb-0">
                      {{ battery.activation ? "Active" : "Inactive" }}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.no-batteries-text {
  margin-top: 100px;
}
</style>
