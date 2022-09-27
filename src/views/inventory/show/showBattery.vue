<!-- <script>
import axios from "axios";
export default {
  name: "showBattery",
  data() {
    return {
      battery: {},
    };
  },
  created() {
    this.getBatteries();
  },
  methods: {
    getBatteries() {
      axios
        .get("http://127.0.0.1:8000/api/battery/" + this.$route.params.id)
        .then((response) => {
          this.battery = response.data;
          console.log(this.battery);
        });
    },
    deleteBattery() {
      axios
        .delete(
          "http://127.0.0.1:8000/api/battery/" +
            this.$route.params.id +
            "/delete"
        )
        .then((response) => {
          console.log(response);
          this.$router.push("/list-batteries");
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
  <section style="background-color: #f9f9f9">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-4">
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
                    <span class="fw-bold">{{ battery.brand_name }}</span></span
                  >
                  <span
                    >Model Name
                    <span class="fw-bold">{{ battery.model_name }}</span>
                  </span>
                </div>

                <div class="d-flex flex-column mb-4">
                  <span class="h1 mb-0">
                    <i class="fas fa-camera-retro"></i>
                  </span>
                  <ul class="list-unstyled mb-0">
                    <li aria-hidden="true">—</li>
                    <li>
                      Attached Drone Name
                      <span class="fw-bold">
                        {{ battery.drone_brand_name }}
                      </span>
                    </li>
                    <li>
                      Current Number Of Cycles
                      <span class="fw-bold">{{
                        battery.number_of_cycles
                      }}</span>
                    </li>
                    <li>
                      Maximum Number Of Cycles
                      <span class="fw-bold">
                        {{ battery.maximum_num_of_cycles }}
                      </span>
                    </li>

                    <li aria-hidden="true">—</li>
                  </ul>
                </div>

                <div class="p-3 mx-n3 mb-4" style="background-color: #f9f9f9">
                  <h5 class="mb-0">
                    {{ battery.activation ? "Active" : "Inactive" }}
                  </h5>
                </div>

                <div class="d-flex flex-column mb-4 lead">
                  <span class="mb-2"
                    >Purchase Date
                    <span class="fw-bold">{{
                      battery.purchase_date
                    }}</span></span
                  >
                  <span class="mb-2"
                    >Registration Date
                    <span class="fw-bold">{{
                      battery.registration_date
                    }}</span></span
                  >

                  <span style="color: transparent">0</span>
                </div>

                <div class="d-flex flex-row">
                  <button
                    type="button"
                    class="btn btn-form flex-fill me-1"
                    data-mdb-ripple-color="dark"
                    @click="deleteBattery"
                  >
                    Delete
                  </button>

                  <router-link
                    :to="'/edit-battery/' + battery.id"
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
</template> -->

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "showBattery",
  setup() {
    const battery = ref({});
    const route = useRoute();
    const router = useRouter();
    const batteryId = route.params.id;
    const backendServer = import.meta.env.VITE_APP_BACKEND_URI;

    onMounted(() => {
      getBattery();
    });

    function getBattery() {
      axios
        .get("http://127.0.0.1:8000/api/battery/" + batteryId)
        .then((response) => {
          battery.value = response.data;
        });
    }

    function deleteBattery() {
      axios
        .delete("http://127.0.0.1:8000/api/battery/" + batteryId + "/delete")
        .then((response) => {
          console.log(response);
          router.push("/list-batteries");
        });
    }

    return {
      deleteBattery,
      battery,
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
                    <span class="fw-bold">{{ battery.brand_name }}</span></span
                  >
                  <span
                    >Model Name
                    <span class="fw-bold">{{ battery.model_name }}</span>
                  </span>
                </div>

                <div class="d-flex flex-column mb-4">
                  <span class="h1 mb-0">
                    <i class="fas fa-camera-retro"></i>
                  </span>
                  <ul class="list-unstyled mb-0">
                    <li aria-hidden="true">—</li>
                    <li>
                      Attached Drone Name
                      <span class="fw-bold">
                        {{ battery.drone_brand_name }}
                      </span>
                    </li>
                    <li>
                      Current Number Of Cycles
                      <span class="fw-bold">{{
                        battery.number_of_cycles
                      }}</span>
                    </li>
                    <li>
                      Maximum Number Of Cycles
                      <span class="fw-bold">
                        {{ battery.maximum_num_of_cycles }}
                      </span>
                    </li>

                    <li aria-hidden="true">—</li>
                  </ul>
                </div>

                <div class="p-3 mx-n3 mb-4" style="background-color: #f9f9f9">
                  <h5 class="mb-0">
                    {{ battery.activation ? "Active" : "Inactive" }}
                  </h5>
                </div>

                <div class="d-flex flex-column mb-4 lead">
                  <span class="mb-2"
                    >Purchase Date
                    <span class="fw-bold">{{
                      battery.purchase_date
                    }}</span></span
                  >
                  <span class="mb-2"
                    >Registration Date
                    <span class="fw-bold">{{
                      battery.registration_date
                    }}</span></span
                  >

                  <span style="color: transparent">0</span>
                </div>

                <div class="d-flex flex-row">
                  <button
                    type="button"
                    class="btn btn-form flex-fill me-1"
                    data-mdb-ripple-color="dark"
                    @click="deleteBattery"
                  >
                    Delete
                  </button>

                  <router-link
                    :to="'/edit-battery/' + battery.id"
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
