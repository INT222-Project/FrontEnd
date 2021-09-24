import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Navbar from './components/Navbar.vue'
const app = createApp(App)
app.component('nav-bar',Navbar)
app.use(router).use(store).mount('#app')
