import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import './index.scss'
import 'primevue/resources/themes/aura-light-indigo/theme.css'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import "bootstrap/dist/js/bootstrap.js";

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(PrimeVue);
app.mount('#app')