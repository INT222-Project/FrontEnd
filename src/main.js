import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Navbar from './components/ui/Navbar.vue'
import Footer from './components/ui/Footer.vue'
const app = createApp(App)
app.component('nav-bar',Navbar)
app.component('footer-bar',Footer)
app.use(router).use(store).mount('#app')
