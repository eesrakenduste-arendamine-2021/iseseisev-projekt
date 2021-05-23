import { RouteConfig } from "vue-router";
import { home } from "@/router/routes/home";
import { services } from "@/router/routes/services";

export const routes: Array<RouteConfig> = [...home, ...services];
