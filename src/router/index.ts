import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ReportView from '@/views/ReportView.vue';
import SettingsView from '@/views/SettingsView.vue';
import type { RouteName } from '@/types';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home' as RouteName, component: HomeView },
  { path: '/report', name: 'Report' as RouteName, component: ReportView },
  { path: '/settings', name: 'Settings' as RouteName, component: SettingsView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
