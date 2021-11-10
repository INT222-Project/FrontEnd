import { createRouter, createWebHistory } from 'vue-router'
import Room from '../views/Room.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import About from '../views/About.vue'
import FormRoom from '../components/room/FormRoom.vue'
import Booking from '../components/cart/Booking.vue'
import Home from '../views/Home.vue'
import RoomDetails from '../components/room/RoomDetails.vue'
import ReservationStaff from '../components/reservation/ReservationStaff.vue'
import Profile from '../components/user/Profile.vue'
import EditProfile from '../components/user/EditProfile.vue'
import Cart from '../components/cart/Cart.vue'
import ReservationUser from '../components/reservation/ReservationUser.vue'
import AddingDeleteEditingPackage from '../components/room/AddingDeleteEditingPackage.vue'
import AddingDeleteEditingRoomType from '../components/room/AddingDeleteEditingRoomType.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    props: true,
    component: Home
  },
  {
    path: '/AddingDeleteEditingPackage',
    name: 'AddingDeleteEditingPackage',
    props: true,
    component: AddingDeleteEditingPackage
  },
  {
    path: '/AddingDeleteEditingRoomType',
    name: 'AddingDeleteEditingRoomType',
    props: true,
    component: AddingDeleteEditingRoomType
  },
  {
    path:'/RoomDetails/:id',
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
    path:'/booking/:roomDetails',
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
  },
  {
    path:'/reservationUser',
    name:'ReservationUser',
    component: ReservationUser
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
