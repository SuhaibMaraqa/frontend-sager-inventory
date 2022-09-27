<script>
import axios from "axios";
import { onMounted, ref } from "vue";

export default {
  name: "listPayloads",

  setup() {
    const payloads = ref([]);
    const backendServer = import.meta.env.VITE_APP_BACKEND_URI;

    onMounted(() => {
      getPayloads();
    });

    function getPayloads() {
      axios.get("http://127.0.0.1:8000/api/payloads").then((response) => {
        payloads.value = response.data;
      });
    }

    return {
      payloads,
      backendServer,
    };
  },
};
</script>

<template>
  <h1 class="no-payloads-text text-center" v-if="payloads.length == 0">
    No Payloads available.
  </h1>

  <section style="background-color: #f9f9f9" v-else>
    <div class="container py-5">
      <div class="row">
        <div
          class="col-md-12 col-lg-4 mb-4 mb-lg-3"
          v-for="payload in payloads"
        >
          <!-- <div class="col-md-6 col-lg-4 mb-4 mb-md-0" v-for="payload in payloads"> -->
          <router-link
            :to="'/show-payload/' + payload.id"
            style="text-decoration: none"
          >
            <div class="card text-black">
              <img
                :src="backendServer + payload.image"
                class="card-img-top"
                alt="iPhone"
              />

              <div class="card-body">
                <div class="text-center mt-1">
                  <h4 class="card-title">{{ payload.name }}</h4>
                  <h6 class="text-primary mb-1 pb-3">
                    Serial Number {{ payload.serial_number }}
                  </h6>
                </div>

                <div class="text-center">
                  <div class="p-3 mx-n3 mb-4" style="background-color: #f9f9f9">
                    <h5 class="mb-0">{{ payload.physical_status }}</h5>
                  </div>

                  <div class="d-flex flex-column mb-4">
                    <span class="mb-0"
                      >Brand Name
                      <span class="fw-bold">{{
                        payload.brand_name
                      }}</span></span
                    >
                    <span
                      >Model Name
                      <span class="fw-bold">{{ payload.model_name }}</span>
                    </span>
                  </div>

                  <div class="p-3 mx-n3 mb-4" style="background-color: #f9f9f9">
                    <h5 class="mb-0">
                      {{ payload.activation ? "Active" : "Inactive" }}
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
.no-payloads-text {
  margin-top: 100px;
}
</style>
