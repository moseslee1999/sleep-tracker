import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ReportView from "../views/ReportView.vue";
import SettingsView from "../views/SettingsView.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/report", name: "Report", component: ReportView },
  { path: "/settings", name: "Settings", component: SettingsView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
