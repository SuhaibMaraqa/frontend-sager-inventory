<script>
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "AddDroneModel",
  data() {
    return {
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
  },
  setup() {
    const router = useRouter();

    const submit = async (e) => {
      const form = new FormData(e.target);

      const inputs = Object.fromEntries(form.entries());

      inputs.max_flight_time = parseInt(inputs.max_flight_time);
      inputs.wind_speed = parseFloat(inputs.wind_speed);
      inputs.temprature = parseFloat(inputs.temprature);
      inputs.weight = parseFloat(inputs.weight);
      inputs.max_height = parseInt(inputs.max_height);
      inputs.range = parseInt(inputs.range);

      inputs.has_built_in_camera == "yes"
        ? (inputs.has_built_in_camera = true)
        : (inputs.has_built_in_camera = false);

      await axios
        .post("http://127.0.0.1:8000/api/drone-model/add", inputs)
        .then((res) => {
          console.log(res);
          router.push("/home");
        })
        .catch((e) => {
          console.error(e);
        });
    };

    return {
      submit,
    };
  },
};
</script>

<template>
  <main class="form-signin">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Add Drone Model</h1>

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
          placeholder="Model Name"
        />
        <label>Model Name</label>
      </div>

      <div class="form-floating">
        <input
          type="number"
          step="any"
          class="form-control"
          autocomplete="off"
          name="wind_speed"
          placeholder="Wind Speed"
        />
        <label>Wind Speed</label>
      </div>

      <div class="form-floating">
        <input
          type="number"
          step="any"
          class="form-control"
          autocomplete="off"
          name="temprature"
          placeholder="Temprature"
        />
        <label>Temprature</label>
      </div>

      <div class="form-floating">
        <input
          type="number"
          step="any"
          class="form-control"
          autocomplete="off"
          name="weight"
          placeholder="Weight"
        />
        <label>Weight</label>
      </div>

      <div class="form-floating">
        <input
          type="number"
          class="form-control"
          autocomplete="off"
          name="max_flight_time"
          placeholder="Maximum Flight Time"
        />
        <label>Maximum Flight Time</label>
      </div>

      <div class="form-floating">
        <input
          type="number"
          class="form-control"
          autocomplete="off"
          name="max_height"
          placeholder="Maximum Height"
        />
        <label>Maximum Height</label>
      </div>

      <div class="form-floating last-input">
        <input
          type="number"
          class="form-control"
          autocomplete="off"
          name="range"
          placeholder="Range"
        />
        <label>Range</label>
      </div>

      <label>Has Built-in Camera</label>
      <div class="form-floating text-center form-radio">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="has_built_in_camera"
            id="yes"
            value="yes"
          />
          <label class="form-check-label" for="has_built_in_camera">Yes</label>
        </div>

        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="has_built_in_camera"
            id="no"
            value="no"
          />
          <label class="form-check-label" for="has_built_in_camera">No</label>
        </div>
      </div>

      <button class="w-100 btn btn-lg btn-form" type="submit">Submit</button>
    </form>
  </main>
</template>
