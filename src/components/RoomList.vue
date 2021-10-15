<template>
  <div class="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 pt-4">
    <div v-for="room in itemInRooms" :key="room.roomid">
      <div class="col">
        <div class="card shadow-md">
          <div class="inner">
            <img :src="viewImg(room.roomId)" class="card-img-top" />
          </div>
          <div class="card-body">
            <h5 class="card-title">
             {{ room.roomNo }}
            </h5>
            <p class="card-text ">{{ room.roomType.description }}</p>
            <p class="card-text">Room Level : {{ room.roomType.name }}</p>
            <p class="card-text">Bed Type : {{ room.bedType }}</p>
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
</template>
<script>
export default {
  emits: ["delete-room", "edit-room"],
   props: {
    itemInRooms: Array,
  },
  data() {
    return {
    };
  },
  methods: {
    viewImg(roomId) {
      console.log("url: "+this.$store.state.url)
      return this.$store.state.url +"/api/rooms/showImage/" + roomId;
    },
    deleteRoom(room) {
      this.$emit("delete-room",room);
    },
    editRoom(room){
      console.log(room)
      this.$emit("edit-room",room)
    }
  },
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