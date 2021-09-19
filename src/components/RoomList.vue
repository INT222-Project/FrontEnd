<template>
  <div class="container pt-4">
    <form class="d-sm-flex">
      <input
        v-model="search"
        class="form-control me-2"
        type="search"
        placeholder="Type in the room price or room style that you want"
        aria-label="Search"
      />
      <button class="btn btn-primary" type="submit">Search</button>
    </form>
  </div>
  <div class="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 pt-4">
    <div v-for="room in rooms" :key="room.roomid">
      <div class="col">
        <div class="card">
          <div class="inner">
            <img src="../assets/img/double.jpg" class="card-img-top" />
          </div>
          <div class="card-body">
            <h5 class="card-title text-center">
              {{ room.roomNo }}
            </h5>
            <p class="card-text">{{ room.roomTypeId.description }}</p>
            <p class="card-text">Room Level : {{ room.roomTypeId.name }}</p>
            <p class="card-text">
              {{ room.bedType }}
            </p>
            <p class="card-text">Price : {{ room.roomCharge }} Baht Per 1 day</p>
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
import RoomDataService from "../service/RoomDataService";
export default {
  data() {
    return {
      rooms: [],
      search: "",
      // url: "http://localhost:5000/room",
    };
  },
  methods: {
    bookingRoom(item) {
      this.$emit("booking-room", item);
    },
    // async fetchRoom() {
    //   const res = await fetch(this.url);
    //   const data = await res.json();
    //   return data;
    // },
    getAllRoom(){
      RoomDataService.retrieveAllRoom().then((response) =>{
        this.rooms = response.data
      })
    }
  },
  created() {
    this.rooms = this.getAllRoom();
  },
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