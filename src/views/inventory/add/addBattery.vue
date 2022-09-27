<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useAuthStore } from "../../../store/AuthStore";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { storeToRefs } from "pinia";

export default {
  name: "addBattery",
  components: { Datepicker },

  setup() {
    const battery_models = ref([]);
    const store = useAuthStore();
    const { user } = storeToRefs(store);
    const router = useRouter();
    const purchase_date = ref();
    const registration_date = ref();

    onMounted(() => {
      getBatteryModels();
    });

    function getBatteryModels() {
      axios.get("http://127.0.0.1:8000/api/battery-models").then((response) => {
        battery_models.value = response.data;
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

      inputs.battery_model_id = parseInt(inputs.battery_model_id);
      inputs.number_of_cycles = parseInt(inputs.number_of_cycles);
      inputs.purchase_date = formatDate(purchase_date.value);
      inputs.registration_date = formatDate(registration_date.value);
      inputs.user_id = store.user.id;
      inputs.activation == "active"
        ? (inputs.activation = true)
        : (inputs.activation = false);

      console.log(inputs);
      await axios
        .post("http://127.0.0.1:8000/api/battery/add", inputs)
        .then((res) => {
          console.log(res);
          router.push("/home");
        })
        .catch((e) => {
          console.error(e);
        });
    };

    return {
      battery_models,
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
      <h1 class="h3 mb-3 fw-normal">Add Battery</h1>

      <div class="form-floating">
        <input
          class="form-control"
          autocomplete="off"
          name="name"
          placeholder="Name"
        />
        <label>Battery Name</label>
      </div>

      <div class="form-floating">
        <input
          class="form-control"
          autocomplete="off"
          name="serial_number"
          placeholder="serialNumber"
        />
        <label>Serial Number</label>
      </div>

      <div class="form-floating">
        <input
          type="number"
          class="form-control"
          autocomplete="off"
          name="number_of_cycles"
          placeholder="Number Of Cycles"
        />
        <label>Number Of Cycles</label>
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
          modeHeight="120"
          v-model="registration_date"
          placeholder="Registration Date"
          class="datapicker"
        />
      </div>

      <select
        name="physical_status"
        class="form-select physical-status"
        aria-label="Physical Status"
      >
        <option selected>Please Select Physical Status</option>
        <option value="Airworthy">Airworthy</option>
        <option value="Maintenance">Maintenance</option>
        <option value="Retired">Retired</option>
      </select>

      <select
        name="battery_model_id"
        class="form-select last-input"
        aria-label="Battery Model"
      >
        <option selected>Please Select Battery Model</option>
        <template v-for="battery in battery_models">
          <option :value="battery.id">
            {{ battery.brand_name }}
          </option>
        </template>
      </select>

      <label>Activation</label>
      <div class="form-floating text-center form-radio">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="activation"
            id="active"
            value="active"
          />
          <label class="form-check-label" for="activation">active</label>
        </div>

        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="activation"
            id="inactive"
            value="inactive"
          />
          <label class="form-check-label" for="inlineRadio2">inactive</label>
        </div>
      </div>

      <button class="w-100 btn btn-lg btn-form" type="submit">Submit</button>
    </form>
  </main>
</template>
