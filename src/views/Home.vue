<template>
  <div class="home">
    <div class="container pt-14">
      <div class="jumbotron">
        <h1 class="display-2">All Rooms</h1>
        <p class="lead">
          All rooms in our hotels can accommodate different levels of travellers.
        </p>
        <hr class="my-4" />
      </div>
      <room-list></room-list>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RoomList from "@/components/RoomList.vue";
export default {
  components: {
    RoomList,
  },
};
</script>
