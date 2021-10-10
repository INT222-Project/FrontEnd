<template>
  <!-- <div class="container pt-14">
      test
      {{rTypeById}}
      <button>Booking</button>
      <button @click="back()">Back to Home</button>
  </div> -->
  <div class="container pt-14 mt-5 mb-5">
    <div class="card shadow-md">
        <div class="row g-0">
            <div class="col-md-6 border-end">
                <div class="d-flex flex-column justify-content-center">
                  <div class="main_image"><img :src="viewImg(rTypeById.roomTypeId)" id="main_product_image" class="card-img-top" /></div>
                    <!-- <div class="main_image"> <img src="https://i.imgur.com/TAzli1U.jpg" id="main_product_image" width="350"> </div> -->
                </div>
            </div>
            <div class="col-md-6">
                <div class="p-3 right-side">
                    <div class="d-flex justify-content-between align-items-center">
                        <h2>{{rTypeById.name}}</h2> <span class="heart"><i class='bx bx-heart'></i></span>
                    </div>
                    <div class="mt-2 pr-3 content">
                        <p>{{rTypeById.description}}</p>
                    </div>
                    <div class="mt-2 pr-3 content">
                    <p>members : {{rTypeById.maxRest}} </p>
                    <p>Size : {{rTypeById.roomSize}}</p>
                    </div>
                    <div class="buttons d-flex flex-row pt-18 mt-5 gap-3"> <button class="btn btn-outline-dark">Book Now</button> <button class="btn btn-dark">Add to Cart</button> </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {computed} from 'vue';
import {useStore} from 'vuex';
export default {
props:['id'],

methods:{
  back(){
    this.$router.push('/') 
  },
   viewImg(roomTypeId) {
      return "http://localhost:8081/api/rooms/showImage/" + roomTypeId; //change ip
    },
},
setup(props) {
    const store = useStore();
    store.dispatch("getRoomTypeById",props.id);
    let rTypeById = computed(function () {
      return store.state.rTypeById;
    });
    return {
      rTypeById,
    };
  },
}
</script>

<style scoped>

.card {
    border: none;
    overflow: hidden
}

.thumbnail_images ul {
    list-style: none;
    justify-content: center;
    display: flex;
    align-items: center;
    margin-top: 10px
}

.thumbnail_images ul li {
    margin: 5px;
    padding: 10px;
    border: 2px solid #eee;
    cursor: pointer;
    transition: all 0.5s
}

.thumbnail_images ul li:hover {
    border: 2px solid #000
}

.main_image {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #eee;
    height: 400px;
    width: 100%;
    overflow: hidden
}

.heart {
    height: 30px;
    width: 30px;
    background-color: #eaeaea;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center
}

.content p {
    font-size: 18px
}

.ratings span {
    font-size: 14px;
    margin-left: 12px
}

.colors {
    margin-top: 5px
}

.colors ul {
    list-style: none;
    display: flex;
    padding-left: 0px
}

.colors ul li {
    height: 20px;
    width: 20px;
    display: flex;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer
}

.colors ul li:nth-child(1) {
    background-color: #6c704d
}

.colors ul li:nth-child(2) {
    background-color: #96918b
}

.colors ul li:nth-child(3) {
    background-color: #68778e
}

.colors ul li:nth-child(4) {
    background-color: #263f55
}

.colors ul li:nth-child(5) {
    background-color: black
}

.right-side {
    position: relative
}

.buttons .btn {
    height: 50px;
    width: 150px;
    border-radius: 0px !important
}
</style>