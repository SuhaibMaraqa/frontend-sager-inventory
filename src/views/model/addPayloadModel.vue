<script>
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "AddPayloadModel",

  data() {
    return {
      drone_id: [],
      drone_models: [],
    };
  },
  created() {
    this.getDroneModels();
  },
  methods: {
    getDroneModels() {
      axios.get("http://127.0.0.1:8000/api/drone-models").then((response) => {
        this.drone_models = response.data;
      });
    },
    submit(e) {
      const form = new FormData(e.target);

      const inputs = Object.fromEntries(form.entries());

      inputs.drone_id = Object.values(this.drone_id);

      console.log(inputs);

      axios
        .post("http://127.0.0.1:8000/api/payload-model/add", inputs)
        .then((res) => {
          if (res.data.isUnattachableDrones) {
            alert(res.data.unattachableDrones);
          } else {
            this.$router.push("/home");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },

  setup() {
    return {};
  },
};
</script>

<template>
  <main class="form-signin">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Add Payload Model</h1>

      <div class="form-floating">
        <input
          class="form-control"
          autocomplete="off"
          name="brand_name"
          placeholder="Brand Name"
        />
        <label>Brand Name</label>
      </div>

      <div class="form-floating">
        <input
          class="form-control"
          autocomplete="off"
          name="model_name"
          placeholder="Model name"
        />
        <label>Model Name</label>
      </div>

      <div class="form-floating">
        <input
          class="form-control"
          autocomplete="off"
          name="type"
          placeholder="Type"
        />
        <label>Type</label>
      </div>

      <!-- <select
        name="drone_id"
        class="form-select last-input"
        aria-label="Drone Model"
        style="height: auto"
        multiple
      >
        <option selected>Please Select Drone Model/s</option>
        <template v-for="drone in drone_models">
          <option :value="drone.id">
            {{ drone.brand_name }}
          </option>
        </template>
      </select> -->

      <select
        v-model="drone_id"
        multiple="multiple"
        name="drone_id"
        style="height: auto"
        class="form-select last-input"
      >
        <!-- <option selected>Please Select Drone Model/s</option> -->
        <template v-for="drone in drone_models">
          <option :value="drone.id">
            {{ drone.brand_name }}
          </option>
        </template>
        <!-- <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option> -->
      </select>

      <button class="w-100 btn btn-lg btn-form" type="submit">Submit</button>
    </form>
  </main>
</template>
