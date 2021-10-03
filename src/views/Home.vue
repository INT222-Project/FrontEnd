<template>
  <div id="home" class="section w-auto h-full pt-4">
    <div class="container pt-14 ">
      <div class="jumbotron">
        <h1 class="display-2">All Rooms</h1>
        <p class="lead">
          All rooms in our hotels can accommodate different levels of travellers.
        </p>
        <div class="container">
    <div class="row height d-flex justify-content-center align-items-center ">
        <div class="col-md-12">
            <div class="search"> 
              <i class="fa fa-search"></i> 
              <input type="text" class="form-control" placeholder="Have a question? Ask Now"> 
              <button class="btn btn-primary">Search</button> 
              </div>
        </div>
    </div>
    </div>
        <hr class="my-4" />
        <div class="space-x-2">
        <button
        @click="activeTab = 'RoomList'"
        type="button" class="btn btn-dark">Room List</button>
        <button   v-if="!isEdit"
        @click="activeTab = 'FormRoom'"
        type="button" class="btn btn-dark">Add Room</button>
        <button   v-else
        @click="activeTab = 'FormRoom'"
        type="button" class="btn btn-dark">Edit Room</button>
        </div>
      </div>
      
      <div v-if="activeTab === 'RoomList'">
          <room-list 
          @edit-room="editBtn"
          @delete-room="deleteRoom"
          :itemInRooms="rooms"/>
      </div>
      <div v-if="activeTab === 'FormRoom'">
         <form-room 
         v-if="isEdit"
         @add-room="editRoom"
         :old_roomId="old_roomId"
         :old_roomNo="old_roomNo"
         :old_bedtype="old_bedtype"
         :old_roomtype="old_roomtype"
         :old_roomCharge="old_roomCharge"
         :old_Img="old_Img"
         :itemInRooms="rooms"
         />
         <form-room  
         v-else
         @add-room="addRoom"
         :itemInRooms="rooms"
         />
      </div>
    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src
// import {mapState} from 'vuex';
import {computed} from 'vue';
import {useStore} from 'vuex';

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
      activeTab: "RoomList",
      isEdit:false,
      editedRoom:null,
      old_roomId:0,
      old_roomNo:'',
      old_bedtype:'',
      old_roomtype:null,
      old_roomCharge:0.00,
      old_Img:''
    };
  },
  methods: {
    addRoom(room){
      let response = confirm(`Are you sure you want to add room: ${room.roomNo}`)
      if(response){
         const jsonNewRoom = JSON.stringify(room);
        const blob = new Blob([jsonNewRoom],{
          type: "application/json",
        })
        console.log(jsonNewRoom)
        console.log(room.imgObject)
        console.log(room.imgObject.name)
        let formData = new FormData();
        formData.append("image-file", room.imgObject, room.imgObject.name);
        formData.append("newRoom",blob)
        // this.$store.dispatch('addRoom',formData);
        RoomDataService.addNewRoom(formData).then((response)=>{
          console.log(response.data)
        })
        this.activeTab = "RoomList"
      }
    },
     deleteRoom(room) {
      console.log(room.roomId)
      let response = confirm(`Are you sure you want to delete room: ${room.roomNo}`)
      if(response){
         this.$store.dispatch('deleteRoom',room.roomId);
      }
      location.reload();
    },
    editBtn(room){
      console.log("Room No editing : " + room.roomNo);
      this.isEdit = true
      this.old_roomId = room.roomId
      this.old_roomNo = room.roomNo
      this.old_bedtype = room.bedType
      this.old_roomtype = room.roomTypeId
      this.old_roomCharge = room.roomCharge
      this.old_Img = "http://localhost:8081/api/rooms/getImageSource/"+room.roomId //change ip
      this.activeTab = "FormRoom";
    },
    editRoom(room){
      let editRoom = {
        roomId:room.roomId,
        roomNo:room.roomNo,
        roomTypeId:room.roomTypeId,
        roomCharge:room.roomCharge,
        bedType:room.bedType,
        src:room.src
        }
        console.log('imgsrc '+editRoom.src)
        const jsonNewRoom = JSON.stringify(editRoom);
        const blob = new Blob([jsonNewRoom],{
          type: "application/json",
        })
        console.log(jsonNewRoom)
        let formData = new FormData();
        if(room.imgObject != null) {
          formData.append("image-file", room.imgObject, room.imgObject.name);
          formData.append("editRoom",blob);
          }
        else {
          formData.append("editRoom",blob);
        }
        RoomDataService.editRoom(formData,room.roomId).then((response)=>{
          console.log(response.data)
        })
        this.isEdit = false;
        this.activeTab = "RoomList";
    }
  },
  setup(){
    const store = useStore();
    store.dispatch("getRooms")
    let rooms = computed(function(){
      return store.state.rooms;
    });
    return {
      rooms
    }
  }
};
</script>
<style>
body {
    background-color: rgb(255, 255, 255);
    font-family: 'Montserrat', sans-serif;
    font-weight: 300
}
.search {
    position: relative;
    box-shadow: 0 0 40px rgba(51, 51, 51, .1)
}

.search input {
    height: 60px;
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
