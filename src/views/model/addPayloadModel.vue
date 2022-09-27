<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "AddPayloadModel",

  setup() {
    const drone_id = ref([]);
    const drone_models = ref([]);
    const image = ref([]);
    const previewImage = ref([]);
    const router = useRouter();

    onMounted(() => {
      getDroneModels();
    });

    function getDroneModels() {
      axios.get("http://127.0.0.1:8000/api/drone-models").then((response) => {
        drone_models.value = response.data;
      });
    }

    function imgUpload(e) {
      image.value = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image.value);
      reader.onload = (e) => {
        previewImage.value = e.target.result;
      };
    }

    function submit() {
      const formData = new FormData();

      formData.append(
        "brand_name",
        document.getElementById("brand_name").value
      );
      formData.append(
        "model_name",
        document.getElementById("model_name").value
      );
      formData.append("type", document.getElementById("type").value);
      formData.append("image", document.getElementById("image").files[0]);

      drone_id.value.forEach((drone_id) => {
        formData.append("drone_id[]", drone_id);
      });

      const headers = { "Content-Type": "multipart/form-data" };

      axios
        .post("http://127.0.0.1:8000/api/payload-model/add", formData, headers)
        .then((res) => {
          console.log(res);
          if (res.data.isUnattachableDrones) {
            console.log(res);
            alert(res.data.unattachableDrones);
          } else {
            router.push("/home");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }

    return {
      submit,
      imgUpload,
      drone_models,
      drone_id,
    };
  },
};
</script>

<template>
  <main class="form-signin">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Add Payload Model</h1>

      <div class="form-floating">
        <input
          id="brand_name"
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
          id="model_name"
          placeholder="Model name"
        />
        <label>Model Name</label>
      </div>

      <div class="form-floating">
        <input
          class="form-control"
          autocomplete="off"
          name="type"
          id="type"
          placeholder="Type"
        />
        <label>Type</label>
      </div>

      <select
        v-model="drone_id"
        multiple="multiple"
        name="drone_id"
        style="height: auto"
        class="form-select last-input"
      >
        <template v-for="drone in drone_models">
          <option :value="drone.id">
            {{ drone.brand_name }}
          </option>
        </template>
      </select>

      <input
        id="image"
        name="image"
        ref="fileInput"
        accept="image/*"
        type="file"
        @onchange="imgUpload"
      />

      <button class="w-100 btn btn-lg btn-form" type="submit">Submit</button>
    </form>
  </main>
</template>
