<template>
  <div class="home">
    <div class="container">
    <room-list></room-list>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RoomList from '@/components/RoomList.vue';
export default {
  components: {
    RoomList
  }
}
</script>
