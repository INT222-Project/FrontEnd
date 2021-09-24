<template>
  <div id="nav">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand">Booking.com</a>
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
              <router-link class="nav-link" to="/formroom">AddRoom</router-link>
            </li> -->
            <li class="nav-item">
              <router-link class="nav-link" to="/booking">Booking</router-link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                About
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><router-link class="nav-link" to="/about"><a class="dropdown-item" aria-current="page">Peempat</a></router-link></li>
                <li><router-link class="nav-link" to="/about"><a class="dropdown-item">Sahachai</a></router-link></li>
                <li><router-link class="nav-link" to="/about"><a class="dropdown-item">Phichitphol  </a></router-link></li>
              </ul>
            </li>
          </ul>
          <router-link class="nav-link" to="/Login">Log in</router-link>
          <router-link class="nav-link" to="/signup">sign up</router-link>
        </div>
      </div>
    </nav>
  </div>
  
</template>

<style>
</style>
