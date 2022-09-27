<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "showDrone",

  setup() {
    const drone = ref([]);
    const route = useRoute();
    const router = useRouter();
    const backendServer = import.meta.env.VITE_APP_BACKEND_URI;
    const droneId = route.params.id;

    onMounted(() => {
      getDrone();
    });

    function getDrone() {
      axios
        .get("http://127.0.0.1:8000/api/drone/" + droneId)
        .then((response) => {
          drone.value = response.data;
        });
    }

    function deleteDrone() {
      axios
        .delete("http://127.0.0.1:8000/api/drone/" + droneId + "/delete")
        .then((response) => {
          console.log(response);
          router.push("/list-drones");
        });
    }
    return {
      drone,
      deleteDrone,
      backendServer,
    };
  },
};
</script>

<template>
  <section style="background-color: #f9f9f9">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-4">
          <div class="card text-black">
            <img
              :src="backendServer + drone.image"
              class="card-img-top"
              alt="iPhone"
            />

            <div class="card-body">
              <div class="text-center mt-1">
                <h4 class="card-title">{{ drone.name }}</h4>
                <h6 class="text-primary mb-1 pb-3">
                  Serial Number {{ drone.serial_number }}
                </h6>
              </div>

              <div class="text-center">
                <div class="p-3 mx-n3 mb-4" style="background-color: #f9f9f9">
                  <h5 class="mb-0">{{ drone.physical_status }}</h5>
                </div>

                <div class="d-flex flex-column mb-4">
                  <span class="mb-0"
                    >Brand Name
                    <span class="fw-bold">{{ drone.brand_name }}</span></span
                  >
                  <span
                    >Model Name
                    <span class="fw-bold">{{ drone.model_name }}</span>
                  </span>
                </div>

                <div class="d-flex flex-column mb-4">
                  <span class="h1 mb-0">
                    <i class="fas fa-camera-retro"></i>
                  </span>
                  <ul class="list-unstyled mb-0">
                    <li aria-hidden="true">—</li>
                    <li>
                      Insurance Status
                      <span class="fw-bold">{{
                        drone.insurance_status ? "Undergoing" : "Expired"
                      }}</span>
                    </li>
                    <li>
                      Built-in Camera
                      <span class="fw-bold">
                        {{ drone.has_built_in_camera ? "Yes" : "No" }}
                      </span>
                    </li>
                    <li aria-hidden="true">—</li>
                  </ul>
                </div>

                <div class="d-flex flex-column mb-4">
                  <span class="mb-0"
                    >Range <span class="fw-bold">{{ drone.range }}</span></span
                  >
                  <span
                    >Wind Speed
                    <span class="fw-bold">{{ drone.wind_speed }}</span></span
                  >
                  <span
                    >Temprature
                    <span class="fw-bold">{{ drone.temprature }}</span></span
                  >
                  <span
                    >Weight
                    <span class="fw-bold">{{ drone.weight }}</span></span
                  >
                  <span>
                    Maximum Flight Time
                    <span class="fw-bold">{{
                      drone.max_flight_time == 1
                        ? drone.max_flight_time + " hour"
                        : drone.max_flight_time + " hours"
                    }}</span>
                  </span>
                </div>

                <div class="p-3 mx-n3 mb-4" style="background-color: #f9f9f9">
                  <h5 class="mb-0">
                    {{ drone.activation ? "Active" : "Inactive" }}
                  </h5>
                </div>

                <div class="d-flex flex-column mb-4 lead">
                  <span class="mb-2"
                    >Purchase Date
                    <span class="fw-bold">{{ drone.purchase_date }}</span></span
                  >
                  <span class="mb-2"
                    >Registration Date
                    <span class="fw-bold">{{
                      drone.registration_date
                    }}</span></span
                  >

                  <span style="color: transparent">0</span>
                </div>

                <div class="d-flex flex-row">
                  <button
                    type="button"
                    class="btn btn-form flex-fill me-1"
                    data-mdb-ripple-color="dark"
                    @click="deleteDrone"
                  >
                    Delete
                  </button>

                  <router-link
                    :to="'/edit-drone/' + drone.id"
                    style="text-decoration: none"
                    class="btn btn-edit flex-fill ms-1"
                    >Edit</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
