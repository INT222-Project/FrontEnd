<template>
  <div id="home" class="section w-auto h-full pt-4">
    <div class="container pt-14 ">
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
        <button   v-else
        @click="activeTab = 'FormRoom'"
        type="button" class="btn btn-dark">Add Room</button>
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
         :itemInRooms="rooms"/>
         <form-room  
         v-else
         @add-room="addRoom"
         :itemInRooms="rooms"/>
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
      activeTab: "RoomList",
      isEdit:false,
      old_roomId:0,
      old_roomNo:'',
      old_bedtype:'',
      old_roomtype:null,
      old_roomCharge:0.00,
      old_Img:''
    };
  },
  methods: {
    getAllRoom(){
      RoomDataService.retrieveAllRoom().then((response) =>{
        this.rooms = response.data
      })
    },
    addRoom(room){
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
       RoomDataService.addNewRoom(formData).then((response)=>{
          console.log(response.data)
        })
        // location.reload();
    },
     deleteRoom(room) {
       console.log(room.roomId)
      RoomDataService.deleteRoom(room.roomId).then((response)=>{
        console.log(response.data)
      })
      // location.reload();
      // this.rooms = this.rooms.filter((room) => room.roomId !== room.roomId);
    },
    editBtn(room){
      this.isEdit = true
      this.old_roomId = room.roomId
      this.old_roomNo = room.roomNo
      this.old_bedtype = room.bedType
      this.old_roomtype = room.roomTypeId
      this.old_roomCharge = room.roomCharge
      this.old_Img = "http://localhost:8081/api/rooms/getImageSource/"+room.roomId
      console.log(this.old_Img)
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
        // console.log(room.imgObject)
        // console.log(room.imgObject.name)
        // console.log(room.roomId)
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
<style>
</style>
