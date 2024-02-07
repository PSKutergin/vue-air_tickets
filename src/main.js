import { createApp } from 'vue'
import App from './App.vue'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "bootstrap/dist/js/bootstrap.js";

const app = createApp(App)

// app.use(BootstrapVue)
// app.use(IconsPlugin)

app.mount('#app')