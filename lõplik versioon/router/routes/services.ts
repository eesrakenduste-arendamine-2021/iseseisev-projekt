import { RouteConfig } from "vue-router";
import Services from "@/views/Services/Services.vue";
import Add from "@/views/Services/Add/Add.vue";
import List from "@/views/Services/List/List.vue";

export const services: Array<RouteConfig> = [
  {
    path: "/services",
    name: "services",
    component: Services,
    children: [
      { path: "", name: "servicesList", component: List },
      { path: "add", name: "addService", component: Add },
    ],
  },
];
