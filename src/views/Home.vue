<template>
  <div class="home">
    <div class="container pt-14">
      <div class="jumbotron">
        <h1 class="display-2">All Rooms</h1>
        <p class="lead">
          All rooms in our hotels can accommodate different levels of travellers.
        </p>
        <hr class="my-4" />
        <div class="space-x-2">
        <button
        @click="activeTab = 'RoomList'"
        type="button" class="btn btn-dark">Room List</button>
        <button   v-if="!isEdit"
        @click="activeTab = 'FormRoom'"
        type="button" class="btn btn-dark">Add Room</button>
        </div>
      </div>
      
      <div v-if="activeTab === 'RoomList'">
          <room-list :itemInRooms="rooms"/>
      </div>
      <div v-if="activeTab === 'FormRoom'">
         <form-room :itemInRooms="rooms"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import {mapState} from 'vuex';
import RoomList from "@/components/RoomList.vue";
import FormRoom from "../components/FormRoom"
import RoomDataService from "../service/RoomDataService";
export default {
  components: {
    RoomList,
    FormRoom
  },
  data() {
    return {
      rooms: [],
      // search: "",
      activeTab: "RoomList",
      isEdit:false,
    };
  },
  methods: {
    getAllRoom(){
      RoomDataService.retrieveAllRoom().then((response) =>{
        this.rooms = response.data
      })
    },
     deleteRoom(roomId) {
      RoomDataService.deleteRoom(roomId).then((response)=>{
        console.log(response.data)
      })
      this.rooms = this.rooms.filter((room) => room.roomId !== room.roomId);
    },
  },
  // mounted(){
  //   this.$store.dispatch('loadRooms')
  // },
  // computed:{
  //   ...mapState([
  //      'rooms'
  //   ])
  // }
  created(){
    this.rooms = this.getAllRoom();
  }
  
};
</script>
