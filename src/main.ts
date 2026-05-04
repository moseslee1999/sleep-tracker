import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router';
import { useSleepStore } from './stores/sleep';
import { useSettingsStore } from './stores/settings';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Restore all persisted state before mounting
const sleepStore = useSleepStore();
const settingsStore = useSettingsStore();

settingsStore.loadFromStorage();
sleepStore.loadFromStorage();
sleepStore.resumeFromStorage();

app.mount('#app');
