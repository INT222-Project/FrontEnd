<template>
<div>
  <div class="row height d-flex justify-content-center align-items-center pb-2 pt-4">
        <div class="col-md-12">
            <div class="search"> 
              <i class="fa fa-search"></i> 
              <input type="search" class="form-control" v-model="search" placeholder="Search for the room type you want to booking: Standard, Suite"> 
              </div>
        </div>
        </div>
  <div class="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 pt-4 container">
    <div v-for="room in filteredRoom" :key="room.roomid">
      <div class="col">
        <div class="card shadow-md">
          <div class="inner">
            <img :src="viewImg(room.roomType.roomTypeId)" class="card-img-top" />
          </div>
          <div class="card-body">
            <h5 class="card-title">
             {{ room.roomNo }}
            </h5>
            <p class="card-text ">{{ room.roomType.description }}</p>
            <p class="card-text">Room Level : {{ room.roomType.name }}</p>
            <p class="card-text">Bed Type : {{ room.bedType }}</p>
            <p class="card-text">Status : {{room.status}}</p>
            <p class="text-right card-text text-red-600">THB {{ room.roomCharge }}</p>
          </div>
          <div class="space-x-1">
          <button @click="editRoom(room)" class="text-sm btn btn-dark">edit</button>
          <button @click="deleteRoom(room)" class="text-sm btn btn-success ">delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  emits: ["delete-room", "edit-room"],
   props: {
    itemInRooms: Array,
  },
  data() {
    return {
      search: '',
    };
  },
  methods: {
    reset(){
      this.notFound = false
    },
    viewImg(roomtypeid) {
      return this.$store.state.url +"/api/roomTypes/showImage/" + roomtypeid;
    },
    deleteRoom(room) {
      this.$emit("delete-room",room);
    },
    editRoom(room){
      this.$emit("edit-room",room)
    }
  },
  computed:{
    filteredRoom:function(){
      return this.itemInRooms.filter((room)=>{
        if(room.roomType.name.toLowerCase().match(this.search.toLowerCase())){
            return room.roomType.name.toLowerCase().match(this.search.toLowerCase())
        }
      });
    }
  }
};
</script>
<style>
.inner {
  overflow: hidden;
}
.inner img {
  transition: all 1.1s ease;
}
.inner:hover img {
  transform: scale(1.1);
}
</style>