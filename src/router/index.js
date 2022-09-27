import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/AuthStore";

const routes = [
  {
    path: "/",
    component: () => import("../views/Login.vue"),
    name: "Login",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/register",
    component: () => import("../views/Register.vue"),
    name: "Register",
  },
  {
    path: "/add-drone",
    component: () => import("../views/inventory/add/addDrone.vue"),
    name: "addDrone",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/add-payload",
    component: () => import("../views/inventory/add/addPayload.vue"),
    name: "addPayload",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/add-battery",
    component: () => import("../views/inventory/add/addBattery.vue"),
    name: "addBattery",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/add-drone-model",
    component: () => import("../views/model/addDroneModel.vue"),
    name: "addDroneModel",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/add-payload-model",
    component: () => import("../views/model/addPayloadModel.vue"),
    name: "addPayloadModel",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/add-battery-model",
    component: () => import("../views/model/addBatteryModel.vue"),
    name: "addBatteryModel",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/show-drone/:id",
    component: () => import("../views/inventory/show/showDrone.vue"),
    name: "showDrone",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/list-drones",
    component: () => import("../views/inventory/list/listDrones.vue"),
    name: "listDrones",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/list-batteries",
    component: () => import("../views/inventory/list/listBatteries.vue"),
    name: "listBatteries",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/list-payloads",
    component: () => import("../views/inventory/list/listPayloads.vue"),
    name: "listPayloads",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/show-payload/:id",
    component: () => import("../views/inventory/show/showPayload.vue"),
    name: "showPayload",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/show-battery/:id",
    component: () => import("../views/inventory/show/showBattery.vue"),
    name: "showBattery",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/edit-battery/:id",
    component: () => import("../views/inventory/edit/editBattery.vue"),
    name: "editBattery",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/edit-payload/:id",
    component: () => import("../views/inventory/edit/editPayload.vue"),
    name: "editPayload",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/edit-drone/:id",
    component: () => import("../views/inventory/edit/editDrone.vue"),
    name: "editDrone",
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const store = useAuthStore();

  if (to.meta.requiresAuth && !store.isAuth) return "/";
});

export default router;
