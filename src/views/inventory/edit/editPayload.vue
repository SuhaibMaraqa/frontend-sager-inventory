<script>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useAuthStore } from "../../../store/AuthStore";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { storeToRefs } from "pinia";

export default {
  name: "editPayload",
  components: { Datepicker },

  setup() {
    const payload_models = ref([]);
    const payload = ref([]);
    const store = useAuthStore();
    const { user } = storeToRefs(store);
    const router = useRouter();
    const route = useRoute();
    const purchase_date = ref();
    const registration_date = ref();
    const payloadId = route.params.id;

    onMounted(() => {
      getPayloadModels();
      getPayload();
    });

    function getPayload() {
      axios
        .get("http://127.0.0.1:8000/api/payload/" + payloadId)
        .then((response) => {
          payload.value = response.data;
          purchase_date.value = payload.value.purchase_date;
          registration_date.value = payload.value.registration_date;
        });
    }

    function getPayloadModels() {
      axios.get("http://127.0.0.1:8000/api/payload-models").then((response) => {
        payload_models.value = response.data;
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

      inputs.payload_model_id = parseInt(inputs.payload_model_id);
      inputs.purchase_date = formatDate(purchase_date.value);
      inputs.registration_date = formatDate(registration_date.value);
      inputs.user_id = store.user.id;
      inputs.insurance_status == "valid"
        ? (inputs.insurance_status = true)
        : (inputs.insurance_status = false);

      await axios
        .put(
          "http://127.0.0.1:8000/api/payload/" + payloadId + "/update",
          inputs
        )
        .then((res) => {
          console.log(res);
          router.push("/home");
        })
        .catch((e) => {
          console.error(e);
        });
    };

    return {
      purchase_date,
      registration_date,
      payload_models,
      payload,
      submit,
    };
  },
};
</script>

<template>
  <main class="form-signin">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Edit Payload</h1>

      <div class="form-floating">
        <input
          class="form-control"
          autocomplete="off"
          name="name"
          placeholder="Name"
          v-model="payload.name"
        />
        <label>Payload Name</label>
      </div>

      <div class="form-floating">
        <input
          class="form-control"
          autocomplete="off"
          name="serial_number"
          placeholder="serialNumber"
          v-model="payload.serial_number"
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
        v-model="payload.physical_status"
      >
        <option selected>Please Select Physical Status</option>
        <option value="Airworthy">Airworthy</option>
        <option value="Maintenance">Maintenance</option>
        <option value="Retired">Retired</option>
      </select>

      <select
        name="payload_model_id"
        class="form-select last-input"
        aria-label="Payload Model"
        v-model="payload.payload_model_id"
      >
        <option selected>Please Select Payload Model</option>
        <template v-for="payload in payload_models">
          <option :value="payload.id">
            {{ payload.brand_name }}
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
            :checked="payload.insurance_status"
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
            :checked="!payload.insurance_status"
          />
          <label class="form-check-label" for="inlineRadio2">Invalid</label>
        </div>
      </div>

      <button class="w-100 btn btn-lg btn-form" type="submit">Submit</button>
    </form>
  </main>
</template>
