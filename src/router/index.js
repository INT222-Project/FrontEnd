import { createRouter, createWebHistory } from 'vue-router'
import Room from '../views/Room.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import About from '../views/About.vue'
import FormRoom from '../components/FormRoom.vue'
import Booking from '../components/Booking.vue'
import Home from '../views/Home.vue'
import RoomDetails from '../components/RoomDetails.vue'
import ReservationStaff from '../components/ReservationStaff.vue'
import Profile from '../components/user/profile.vue'
import EditProfile from '../components/user/EditProfile.vue'
import Cart from '../components/Cart.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    props: true,
    component: Home
  },
  {
    path:'/RoomDetails',
    name:'RoomDetails',
    props: true,
    component: RoomDetails
  },
  {
    path: '/room',
    name: 'Room',
    component: Room
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path:'/formroom',
    name:'FormRoom',
    component: FormRoom
  },
  {
    path:'/booking',
    name:'Booking',
    props: true,
    component: Booking
  },
  {
    path:'/reservationStaff',
    name:'ReservationStaff',
    props: true,
    component: ReservationStaff
  },
  {
    path:'/profile',
    name:'profile',
    component: Profile
  },
  {
    path:'/editProfile',
    name:'EditProfile',
    component: EditProfile
  },
  {
    path:'/cart',
    name:'Cart',
    component: Cart
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
