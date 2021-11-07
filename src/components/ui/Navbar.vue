<template>
<div id="nav">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand">BBooking.com</a>
        <button
          class="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <!-- <span class="navbar-toggler-icon"></span>-->
          <span class="toggler-icon top-bar"></span>
          <span class="toggler-icon middle-bar"></span>
          <span class="toggler-icon bottom-bar"></span> 
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
          </ul>
          <router-link class="nav-link" to="/cart"><i class="fas fa-shopping-cart cart-icon"></i><span class="cart-count">{{count}}</span></router-link>
          
          <div class="dropdown mb-2 mb-lg-0">
             <a href="#" class="dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="far fa-user"></i>
          </a>
          <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
            <li><a class="dropdown-item"><router-link to="/profile">Profile</router-link></a></li>
              <li><a class="dropdown-item"><router-link to="/register">register</router-link></a></li>
              <li><a class="dropdown-item"><router-link to="/login">login</router-link></a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item"><router-link to="/room">Room Management</router-link></a></li>
            <li><a class="dropdown-item"><router-link to="/reservationStaff">Reservation Management</router-link></a></li>
            <li><a class="dropdown-item"><router-link to="/reservationUser">Reservation History</router-link></a></li>
            <span v-if="isLoggedIn"><li><a @click="logout" class="dropdown-item"><router-link to="/">Log out</router-link></a></li></span>
          </ul>
        </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  methods:{
    logout(){
      this.$store.dispatch('logout').then(()=>{
        this.$router.push('/login')
      })
    }
  },
  computed:{
    isLoggedIn(){
      return this.$store.getters.isLoggedIn
    },
    count(){
      return this.$store.state.cartItemCount
    }
  }
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
