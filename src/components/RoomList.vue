<template>
  <div class="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 ">
    <div v-for="room in rooms" :key="room.roomid">
      <div class="col">
        <div class="card shadow-md">
          <div class="inner">
            <img src="../assets/img/double.jpg" class="card-img-top" />
          </div>
          <div class="card-body">
            <h5 class="card-title">
             {{ room.roomNo }}
            </h5>
            <p class="card-text ">{{ room.roomTypeId.description }}</p>
            <p class="card-text">Room Level : {{ room.roomTypeId.name }}</p>
            <p class="card-text">Bed Type : {{ room.bedType }}</p>
            <p class="text-right card-text text-red-600">THB {{ room.roomCharge }}</p>
          </div>
          <button @click="bookingRoom(room)" class="btn btn-primary">
            Booking
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
// import RoomDataService from "../service/RoomDataService";
export default {
  data() {
    return {
      // rooms: [],
      search: "",
    };
  },
  methods: {
    // bookingRoom(item) {
    //   this.$emit("booking-room", item);
    // }
    // async fetchRoom() {
    //   const res = await fetch(this.url);
    //   const data = await res.json();
    //   return data;
    // },
    // getAllRoom(){
    //   RoomDataService.retrieveAllRoom().then((response) =>{
    //     this.rooms = response.data
    //   })
    // }
  },
  mounted(){
    this.$store.dispatch('loadRooms')
  },
  computed:{
    ...mapState([
       'rooms'
    ])
  }
};
</script>
<style>
.inner {
  overflow: hidden;
}
.inner img {
  transition: all 1.5s ease;
}
.inner:hover img {
  transform: scale(1.5);
}
</style>