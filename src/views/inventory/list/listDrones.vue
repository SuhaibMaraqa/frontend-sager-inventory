<script>
import axios from "axios";

export default {
  name: "listDrones",
  data() {
    return {
      drones: [],
    };
  },
  created() {
    this.getDrones();
  },
  methods: {
    getDrones() {
      axios.get("http://127.0.0.1:8000/api/drones").then((response) => {
        this.drones = response.data;
      });
    },
  },
  setup() {
    const backendServer = import.meta.env.VITE_APP_BACKEND_URI;
    return {
      backendServer,
    };
  },
};
</script>

<template>
  <!-- <p>{{ drones[0] }}</p> -->
  <section style="background-color: #eee">
    <div class="container py-5">
      <div class="row">
        <div class="col-md-12 col-lg-4 mb-4 mb-lg-3" v-for="drone in drones">
          <!-- <div class="col-md-6 col-lg-4 mb-4 mb-md-0" v-for="drone in drones"> -->
          <div class="card text-black">
            <!-- <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-product-cards/img1.webp"
              class="card-img-top"
              alt="iPhone"
            /> -->
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
                <div class="p-3 mx-n3 mb-4" style="background-color: #eff1f2">
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

                <div class="p-3 mx-n3 mb-4" style="background-color: #eff1f2">
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
              </div>

              <div class="d-flex flex-row">
                <button
                  type="button"
                  class="btn btn-primary flex-fill me-1"
                  data-mdb-ripple-color="dark"
                >
                  Learn more
                </button>
                <button type="button" class="btn btn-danger flex-fill ms-1">
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
