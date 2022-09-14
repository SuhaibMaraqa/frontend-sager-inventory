<script>
import axios from "axios";

export default {
  name: "AddBatteryModel",

  data() {
    return {
      drone_models: [],
      battery_models: [],
    };
  },
  created() {
    this.getDroneModels();
  },
  methods: {
    getDroneModels() {
      axios.get("http://127.0.0.1:8000/api/battery-models").then((response) => {
        response.data.forEach((element) => {
          this.battery_models.push(element.id);
        });
      });

      axios.get("http://127.0.0.1:8000/api/drone-models").then((response) => {
        response.data.forEach((element) => {
          if (!this.battery_models.includes(element.id)) {
            this.drone_models.push(element);
          }
        });
      });
    },
    submit(e) {
      const form = new FormData(e.target);

      const inputs = Object.fromEntries(form.entries());

      inputs.drone_model_id = parseInt(inputs.drone_model_id);
      inputs.maximum_num_of_cycles = parseInt(inputs.maximum_num_of_cycles);

      axios
        .post("http://127.0.0.1:8000/api/battery-model/add", inputs)
        .then((res) => {
          console.log(res);
          this.$router.push("/home");
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
      <h1 class="h3 mb-3 fw-normal">Add Battery Model</h1>

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
          type="number"
          class="form-control"
          autocomplete="off"
          name="maximum_num_of_cycles"
          placeholder="Maximum Number Of Cycles"
        />
        <label>Maximum Number Of Cycles</label>
      </div>

      <!-- <select
        name="drone_id"
        class="form-select last-input"
        aria-label="Drone Model"
      >
        <option selected>Please Select Drone Model</option>
        <template v-for="drone in drone_models">
          <option :value="drone.id">
            {{ drone.brand_name }}
          </option>
        </template>
      </select> -->
      <select
        name="drone_model_id"
        class="form-select last-input"
        aria-label="Drone Model"
      >
        <option selected>Please Select Drone Model</option>
        <template v-for="drone in drone_models">
          <option :value="drone.id">
            {{ drone.brand_name }}
          </option>
        </template>
      </select>

      <button class="w-100 btn btn-lg btn-form" type="submit">Submit</button>
    </form>
  </main>
</template>
