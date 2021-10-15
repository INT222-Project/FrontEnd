<template>
  <div id="nav">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand">BBooking.com</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
             <!-- <li class="nav-item">
              <router-link class="nav-link" to="/RoomDetails">RoomDetails</router-link>
            </li> -->
            <li class="nav-item">
              <router-link class="nav-link" to="/booking">Booking</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">Aboutus</router-link>
            </li>
          </ul>
          <div class="dropdown text-end  mb-2 mb-lg-0">
          <a href="#" class="dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="far fa-user"></i>
          </a>
          <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
            <li><a class="dropdown-item"><router-link to="/">Profile</router-link></a></li>
              <li><a class="dropdown-item"><router-link to="/register">register</router-link></a></li>
              <li><a class="dropdown-item"><router-link to="/login">login</router-link></a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item"><router-link to="/room">Room Management</router-link></a></li>
            <li><a class="dropdown-item"><router-link to="/reservationStaff">Reservation Mnanagement</router-link></a></li>
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
    }
  }
}
</script>
<style>
</style>
