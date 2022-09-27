<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "showPayload",

  setup() {
    const payload = ref([]);
    const backendServer = import.meta.env.VITE_APP_BACKEND_URI;
    const route = useRoute();
    const router = useRouter();
    const payloadId = route.params.id;

    onMounted(() => {
      getPayload();
    });

    function getPayload() {
      axios
        .get("http://127.0.0.1:8000/api/payload/" + payloadId)
        .then((response) => {
          payload.value = response.data;
          console.log(response.data);
        });
    }

    function deletePayload() {
      axios
        .delete("http://127.0.0.1:8000/api/payload/" + payloadId + "/delete")
        .then((response) => {
          console.log(response);
          router.push("/list-payloads");
        });
    }

    return {
      deletePayload,
      payload,
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
                    <span class="fw-bold">{{ payload.brand_name }}</span></span
                  >
                  <span
                    >Model Name
                    <span class="fw-bold">{{ payload.model_name }}</span>
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
                        payload.insurance_status ? "Undergoing" : "Expired"
                      }}</span>
                    </li>
                    <li>
                      Type
                      <span class="fw-bold">
                        {{ payload.type }}
                      </span>
                    </li>
                    <li aria-hidden="true">—</li>
                  </ul>
                </div>

                <span>Attched Drones Names</span>
                <div
                  class="d-flex flex-column mt-2"
                  v-for="name in payload.attached_drones_names"
                >
                  <span class="mb-0 fw-bold">{{ name }}</span>
                </div>

                <div
                  class="p-3 mx-n3 mb-4 mt-2"
                  style="background-color: #f9f9f9"
                >
                  <h5 class="mb-0">
                    {{ payload.activation ? "Active" : "Inactive" }}
                  </h5>
                </div>

                <div class="d-flex flex-column mb-4 lead">
                  <span class="mb-2"
                    >Purchase Date
                    <span class="fw-bold">{{
                      payload.purchase_date
                    }}</span></span
                  >
                  <span class="mb-2"
                    >Registration Date
                    <span class="fw-bold">{{
                      payload.registration_date
                    }}</span></span
                  >

                  <span style="color: transparent">0</span>
                </div>

                <div class="d-flex flex-row">
                  <button
                    type="button"
                    class="btn btn-form flex-fill me-1"
                    data-mdb-ripple-color="dark"
                    @click="deletePayload"
                  >
                    Delete
                  </button>

                  <router-link
                    :to="'/edit-payload/' + payload.id"
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
