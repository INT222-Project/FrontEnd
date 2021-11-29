<template>
  <div id="room" class="section w-auto h-full pt-4 pb-12">
    <div class="container pt-14 ">
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
         :old_status="old_status"
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
import {computed} from 'vue';
import {useStore} from 'vuex';
import RoomList from "../components/room/RoomList.vue";
import FormRoom from "../components/room/FormRoom"
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
      old_Img:'',
      old_status:'Avaliable'
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
        // console.log(jsonNewRoom)
        // console.log(room.imgObject)
        // console.log(room.imgObject.name)
        let formData = new FormData();
        formData.append("image-file", room.imgObject, room.imgObject.name);
        formData.append("newRoom",blob)
        // this.$store.dispatch('addRoom',formData);
        RoomDataService.addNewRoom(formData).then((response)=>{
          // console.log(response.data)
        })
        this.$store.state.showLoading = true;
        setTimeout(()=>{this.activeTab = "RoomList"
        location.reload()},2000);
      }
    },
     deleteRoom(room) {
      // console.log(room.roomId)
      let response = confirm(`Are you sure you want to delete room: ${room.roomNo}`)
      if(response){
         this.$store.dispatch('deleteRoom',room.roomId);
      }
      this.$store.state.showLoading = true;
      setTimeout(()=>{
        location.reload()
        },2000)
        
    },
    editBtn(room){
      // console.log("Room No editing : " + room);
      this.isEdit = true
      this.old_roomId = room.roomId
      this.old_roomNo = room.roomNo
      this.old_bedtype = room.bedType
      this.old_roomtype = room.roomType
      this.old_roomCharge = room.roomCharge
      this.old_status = room.status
      this.old_Img =  this.$store.state.url +"/api/rooms/showImage/" +room.roomId //change ip
      this.activeTab = "FormRoom";
    },
    editRoom(room){
      let response = confirm(`Are you sure you want to add room: ${room.roomNo}`)
      if(response){
      let editRoom = {
        roomId:room.roomId,
        roomNo:room.roomNo,
        roomType:room.roomType,
        roomCharge:room.roomCharge,
        bedType:room.bedType,
        status:room.status,
        src:room.src
        }
        // console.log('imgsrc '+editRoom.src)
        const jsonNewRoom = JSON.stringify(editRoom);
        const blob = new Blob([jsonNewRoom],{
          type: "application/json",
        })
        // console.log(jsonNewRoom)
        let formData = new FormData();
        if(room.imgObject != null) {
          formData.append("image-file", room.imgObject, room.imgObject.name);
          formData.append("editRoom",blob);
          }
        else {
          formData.append("editRoom",blob);
        }
        RoomDataService.editRoom(formData,room.roomId).then((response)=>{
          // console.log(response.data)
        })
        this.isEdit = false;
        this.$store.state.showLoading = true;
        setTimeout(()=>{
          this.activeTab = "RoomList";
          location.reload()
        },2000)
        }

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
</style>
