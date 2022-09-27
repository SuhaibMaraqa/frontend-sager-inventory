<script>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useAuthStore } from "../../../store/AuthStore";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { storeToRefs } from "pinia";

export default {
  name: "editDrone",
  components: { Datepicker },

  setup() {
    const drone_models = ref([]);
    const drone = ref([]);
    const store = useAuthStore();
    const { user } = storeToRefs(store);
    const router = useRouter();
    const route = useRoute();
    const purchase_date = ref();
    const registration_date = ref();
    const droneId = route.params.id;

    onMounted(() => {
      getDroneModels();
      getDrone();
    });

    function getDroneModels() {
      axios.get("http://127.0.0.1:8000/api/drone-models").then((response) => {
        drone_models.value = response.data;
      });
    }

    function getDrone() {
      axios
        .get("http://127.0.0.1:8000/api/drone/" + droneId)
        .then((response) => {
          drone.value = response.data;
          purchase_date.value = drone.value.purchase_date;
          registration_date.value = drone.value.registration_date;
        });
    }

    function formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }

    const submit = async (e) => {
      const form = new FormData(e.target);

      const inputs = Object.fromEntries(form.entries());

      inputs.drone_model_id = parseInt(inputs.drone_model_id);
      inputs.purchase_date = formatDate(purchase_date.value);
      inputs.registration_date = formatDate(registration_date.value);
      inputs.user_id = store.user.id;
      inputs.insurance_status == "valid"
        ? (inputs.insurance_status = true)
        : (inputs.insurance_status = false);

      await axios
        .put("http://127.0.0.1:8000/api/drone/" + droneId + "/update", inputs)
        .then((res) => {
          console.log(res);
          router.push("/show-drone/" + droneId);
        })
        .catch((e) => {
          console.error(e);
        });
    };

    return {
      drone,
      drone_models,
      purchase_date,
      registration_date,
      user,
      submit,
    };
  },
};
</script>

<template>
  <main class="form-signin">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Edit Drone</h1>

      <div class="form-floating">
        <input
          class="form-control"
          autocomplete="off"
          name="name"
          placeholder="Name"
          v-model="drone.name"
        />
        <label>Drone Name</label>
      </div>

      <div class="form-floating">
        <input
          class="form-control"
          autocomplete="off"
          name="serial_number"
          placeholder="serialNumber"
          v-model="drone.serial_number"
        />
        <label>Serial Number</label>
      </div>

      <div class="form-floating">
        <Datepicker
          v-model="purchase_date"
          placeholder="Purchase Date"
          class="datapicker"
        />
      </div>

      <div class="form-floating">
        <Datepicker
          v-model="registration_date"
          placeholder="Registration Date"
          class="datapicker"
        />
      </div>

      <select
        name="physical_status"
        class="form-select physical-status"
        aria-label="Physical Status"
        v-model="drone.physical_status"
      >
        <option selected>Please Select Physical Status</option>
        <option value="Airworthy">Airworthy</option>
        <option value="Maintenance">Maintenance</option>
        <option value="Retired">Retired</option>
      </select>

      <select
        name="drone_model_id"
        class="form-select last-input"
        aria-label="Drone Model"
        v-model="drone.drone_model_id"
      >
        <option selected>Please Select Drone Model</option>
        <template v-for="drone in drone_models">
          <option :value="drone.id">
            {{ drone.brand_name }}
          </option>
        </template>
      </select>

      <label>Insurance Status</label>
      <div class="form-floating text-center form-radio">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="insurance_status"
            id="valid"
            value="valid"
            :checked="drone.insurance_status"
          />
          <label class="form-check-label" for="insurance_status">Valid</label>
        </div>

        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="insurance_status"
            id="invalid"
            value="invalid"
            :checked="!drone.insurance_status"
          />
          <label class="form-check-label" for="inlineRadio2">Invalid</label>
        </div>
      </div>

      <button class="w-100 btn btn-lg btn-form" type="submit" @click="pickFile">
        Submit
      </button>
    </form>
  </main>
</template>
