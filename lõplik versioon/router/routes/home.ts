import { RouteConfig } from "vue-router";
import Home from "@/views/Home/Home.vue";

export const home: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];
