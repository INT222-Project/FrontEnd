<template>
  <nav-bar></nav-bar>
    <page-loader v-if="showLoading"/>
  <router-view/>
  <!-- <footer-bar></footer-bar> -->
</template>
<script>
import PageLoader from './components/ui/PageLoader'
import {mapState} from 'vuex';
export default{
  computed:{
    ...mapState({
      showLoading: (state) => state.showLoading,
    }),
  },
  components:{
    PageLoader
  }
}
</script>

<style>

.form-control {
  border: none;
  padding-left: 32px;
}
.form-control:focus {
  border: none;
  box-shadow: none;
}
body {
    background-color: #eee;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300
}
.search {
    position: relative;
    box-shadow: 0 0 40px rgba(51, 51, 51, .1)
}

.search input {
    height: 50px;
    text-indent: 20px;
    border: 2px solid #d6d4d4
}

.search input:focus {
    box-shadow: none;
    border: 2px solid blue
}

.search .fa-search {
    position: absolute;
    top: 20px;
    left: 16px
}

.search button {
    position: absolute;
    top: 5px;
    right: 5px;
    height: 50px;
    width: 110px;
    background: blue
}
</style>
