<template>
<div id="nav">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <router-link class="nav-link" to="/"><a class="navbar-brand">BBooking.com</a></router-link>
        <button
          class="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="toggler-icon top-bar"></span>
          <span class="toggler-icon middle-bar"></span>
          <span class="toggler-icon bottom-bar"></span> 
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/"><i class="fa fa-home"></i> Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
            <li v-if="this.userData != 0 && this.userData.role[0].authority == 'admin'" class="nav-item">
              <router-link class="nav-link" to="/AddingDeleteEditingRoomType">AddRoomType</router-link>
            </li>
            <li v-if="this.userData != 0 && this.userData.role[0].authority == 'admin'" class="nav-item">
              <router-link class="nav-link" to="/AddingDeleteEditingPackage">AddPackages</router-link>
            </li> 
          </ul>
          <router-link v-if="this.userData != 0 && this.userData.role[0].authority == 'customer'" class="nav-link" to="/cart"><i class="fas fa-shopping-cart cart-icon"></i><span class="cart-count">{{count}}</span></router-link>
          <router-link v-if="this.userData == 0" class="nav-link" to="/login">Sign in <i class="fas fa-sign-in-alt"></i></router-link>
          <div v-if="this.userData != 0" class="bg-blue-600 px-2 py-2 text-sm shadow-sm font-medium tracking-wider  rounded-full hover:shadow-sm hover:bg-blue-700 dropdown mb-2 mb-lg-0 pr-20">
             <a href="#" class="no-underline  py-3 px-6 border-white dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <span v-if="this.userData.role[0].authority == 'receptionist'" class="text-white"><i class="far fa-user"></i>  {{ this.userData.authenticationUser.fName}} {{this.userData.authenticationUser.lName}} ({{this.userData.role[0].authority}})</span>
            <span v-if="this.userData.role[0].authority == 'customer'" class="text-white  "><i class="far fa-user"></i>  {{ this.userData.authenticationUser.fname}} {{this.userData.authenticationUser.lname}} ({{this.userData.role[0].authority}})</span>
            <span v-if="this.userData.role[0].authority == 'admin'" class="text-white  "><i class="far fa-user"></i> ({{this.userData.role[0].authority}})</span>
          </a>
          <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
            <li v-if="this.userData.role[0].authority == 'admin'"><a class="dropdown-item"><router-link to="/admin"><i class="fas fa-user-cog"></i> User Role Management</router-link></a></li>
            <li v-if="this.userData.role[0].authority == 'receptionist'||this.userData.role[0].authority == 'customer'"><a class="dropdown-item"><router-link to="/profile"><i class="fas fa-user-cog"></i> Profile</router-link></a></li>
            <li><hr class="dropdown-divider"></li>
            <li v-if="this.userData.role[0].authority == 'admin'"><a class="dropdown-item"><router-link to="/room"><i class="fas fa-tasks"></i> Room Management</router-link></a></li>
            <li v-if="this.userData.role[0].authority == 'receptionist' ||this.userData.role[0].authority == 'admin'"><a class="dropdown-item"><router-link to="/reservationStaff"><i class="fas fa-tasks"></i> Reservation Management</router-link></a></li>
            <li v-if="this.userData.role[0].authority == 'customer'"><a class="dropdown-item"><router-link to="/reservationUser"><i class="fas fa-history"></i> Reservation History</router-link></a></li>
            <li><hr class="dropdown-divider"></li>
            <span><li><a @click="logout" class="dropdown-item"><router-link to="/"> <i class="fas fa-sign-out-alt"></i> Log out </router-link></a></li></span>
          </ul>
        </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  data() {
    return {
    };
  },
  methods:{
    logout(){
      this.$store.dispatch('auth/logout').then(()=>{
        window.location.href= '/login' 
      })
      this.$store.dispatch('clearDate')
    }
  },
  computed:{
    count(){
      return this.$store.state.cartItemCount
    }
  },
   setup() {
    const store = useStore();
    let user = computed(function () {
      return store.state.user;
    });
    let userData = computed(function () {
      return store.state.user;
    });
    return {
      user,
      userData
    };
  },
}
</script>
<style>

/* Remove border from toggler */
.navbar-toggler {
    border: 0;
}

.navbar-toggler:focus,
.navbar-toggler:active,
.navbar-toggler-icon:focus {
    outline: none;
    box-shadow: none;
    border: 0;
}

/* Lines of the Toggler */
.toggler-icon{
    width: 30px;
    height: 3px;
    background-color: #e74c3c;

    display: block;
    transition: all 0.2s;
}

/* Adds Space between the lines */
.middle-bar{
    margin: 5px auto;
}

/* State when navbar is opened (START) */
.navbar-toggler .top-bar {
    transform: rotate(45deg);
    transform-origin: 10% 10%;
}

.navbar-toggler .middle-bar {
    opacity: 0;
    filter: alpha(opacity=0);
}

.navbar-toggler .bottom-bar {
    transform: rotate(-45deg);
    transform-origin: 10% 90%;
}
/* State when navbar is opened (END) */

/* State when navbar is collapsed (START) */
.navbar-toggler.collapsed .top-bar {
    transform: rotate(0);
}

.navbar-toggler.collapsed .middle-bar {
    opacity: 1;
    filter: alpha(opacity=100);
}

.navbar-toggler.collapsed .bottom-bar {
    transform: rotate(0);
}
/* State when navbar is collapsed (END) */

/* Color of Toggler when collapsed */
.navbar-toggler.collapsed .toggler-icon {
    background-color: #777777;
}
.cart-count{
  font-size:10px;
  color: #d4570cf2;
  padding : 0 5px;
  margin-left : -10px;
  background: white;
  height: 20px;
  border-radius: 50%;
  width: 20px;
}
.cart-icon{
  line-height: 10px;
  font-size:25px;
  color:#0044ff;
  cursor:pointer;
}
.cart-icon:hover{
  color:#6d94ff;
}
</style>
