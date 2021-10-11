<template>
<div id="details" class="section">
  <div class="section-center container pt-14 mt-5 mb-5">
    <div class="card shadow-md ">
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
                     <hr class="my-4" />
                    <div v-for="req in roomReq" :key="req.roomId">
                           <div class="mt-2 pr-3 content"> 
                            <p> Bed: {{req.bedType}} |<span> ฿:{{req.roomCharge}}</span> (starter price per day)</p>
                           </div>
                    <div class="buttons d-flex flex-row gap-3"> <button class="btn btn-outline-primary">Book Now</button> <button class="btn btn-primary">Add to Cart</button> </div>
                    </div>
                </div>
            </div>
            <button class="btn btn-outline-dark" @click="back()">Back to Home</button>
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
    store.dispatch("getRoomRequirementById",props.id);
    let rTypeById = computed(function () {
      return store.state.rTypeById;
    });
    let roomReq = computed(function () {
      return store.state.roomReq;
    });
    return {
      rTypeById,
      roomReq
    };
  },
}
</script>

<style scoped>
.section {
	position: relative;
	height: 100vh;
}
.section .section-center {
	position: absolute;
	top: 40%;
	left: 0;
	right: 0;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
}
#details{
    font-family: 'Montserrat', sans-serif;
	background-image: url('../assets/img/background.jpg');
	background-size: cover;
	background-position: center;
}
#details::before {
	content: '';
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	background: rgba(47, 103, 177, 0.6);
}
.card {
    border: none;
    overflow: hidden;
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
    font-size: 12px
}
.content p span{
    font-size: 16px;
    color: red;
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