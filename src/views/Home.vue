<template>
<div class="container pt-20 pb-18 ">
<div class="jumbotron">
        <h1 class="display-2">Room Offer</h1>
        <p class="lead">
          The hotel has more than 40 rooms with a cosmopolitan atmosphere. unique and worth the price It combines modern decor with the warmth and elegance of the city. the beauty of the hotel This makes this hotel a prominent meeting point in the city.
        </p>
        <div class="row height d-flex justify-content-center align-items-center ">
        <div class="col-md-12">
            <div class="search"> 
              <i class="fa fa-search"></i> 
              <input type="text" class="form-control" v-model="search" placeholder="Search for the room type you want to booking: Standard, Suite"> 
              </div>
        </div>
        </div>
        <hr class="my-4" />
      <div class="row row-cols-lg-2 g-4 ">
    <div v-for="r in filteredRtype" :key="r.roomTypeId">
      <div class="col">
        <div class="card shadow-md">
          <div class="inner">
              <router-link :to="{name:'RoomDetails',params: {id:r.roomTypeId}}"><img :src="viewImg(r.roomTypeId)" class="card-img-top" /></router-link>
          </div>
        </div>
        <div class="card-body">
            <h5 class="card-title text-center">
             {{r.name}}
            </h5>
            <p class="card-text text-center ">{{r.roomSize}} | members {{r.maxRest}} + </p>
            <div class="flex justify-center">
           <span><router-link class="bg-blue-500 px-5 py-3 text-sm shadow-sm font-medium tracking-wider  
           text-blue-100 rounded-full hover:shadow-2xl hover:bg-blue-600" :to="{name:'RoomDetails',params: {id:r.roomTypeId}}">WATCH ROOM</router-link>
            </span></div>
        </div>
      </div>
      </div>
  </div>
</div>
</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  data(){
    return{
      search :''
    }
  },
  methods: {
    viewImg(roomTypeId) {
      return this.$store.state.url +"/api/rooms/showImage/" + roomTypeId; //change ip
    },
  },
  computed:{
    filteredRtype:function(){
      return this.rType.filter((rt)=>{
        return rt.name.toLowerCase().match(this.search.toLowerCase())
      });
    }
    
  },
  setup() {
    const store = useStore();
    store.dispatch("getRoomType");
    let rType = computed(function () {
      return store.state.rType;
    });
    return {
      rType,
    };
  },
};
</script>
<style>
li a {
  text-decoration: none;
}
span a {
  text-decoration: none;
}
</style>