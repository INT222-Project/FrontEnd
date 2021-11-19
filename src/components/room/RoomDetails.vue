<template>
  <div id="details" class="section">
    <div class="section-center container pt-14 mt-5 mb-5">
      <div class="card shadow-md">
        <div class="row g-0">
          <div class="col-md-6 border-end">
            <div class="d-flex flex-column justify-content-center">
              <div class="main_image"><img :src="viewImg(rTypeById.roomTypeId)" id="main_product_image" class="card-img-top" /></div>
              <!-- <div class="main_image">
                <img
                  src="https://i.imgur.com/TAzli1U.jpg"
                  id="main_product_image"
                  width="350"
                />
              </div> -->
            </div>
          </div>
          <div class="col-md-6">
            <div class="p-3 right-side">
              <div class="d-flex justify-content-between align-items-center">
                <h2>{{ rTypeById.name }}</h2>
                <span class="heart"><i class="bx bx-heart"></i></span>
              </div>
              <div class="mt-2 pr-3 content">
                <p>{{ rTypeById.description }}</p>
              </div>
              <div class="mt-2 pr-3 content">
                <p>members : {{ rTypeById.maxRest }}</p>
                <p>Size : {{ rTypeById.roomSize }}</p>
              </div>
              <hr class="my-4" />
              <div v-for="req in roomReq" :key="req.roomId">
                <div class="mt-2 pr-3 content">
                  <p>
                    Bed: {{ req.bedType }} |<span> ฿:{{ req.roomCharge }}</span>
                    (starter price per day)
                  </p>
                </div>
                <div class="buttons d-flex flex-row gap-3">
                  <!-- <router-link
                    class="btn btn-outline-primary"
                    :to="{
                      name: 'Booking',
                      params: { roomDetails: req.roomId, pageId:this.id}
                    }"
                    >Book Now</router-link> -->
                    <button
                    class="btn btn-outline-primary"
                    @click="bookNow(req.roomId)"
                    >Book Now</button>
                </div>
              </div>
            </div>
          </div>
          <button class="btn btn-outline-dark" @click="back()">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  props: ["id"],
  data() {
    return {
    };
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    bookNow(roomId){
      if(this.userData==0){
        alert('Please sign in before making a reservation')
        this.$router.push("/login");
        }else if(this.userData!=0 && this.userData.role[0].authority == 'receptionist'){
          let response = confirm('Please log out and sign in with customer account , Are you want to log out now ?')
          if(response){
            this.$store.dispatch('auth/logout').then(()=>{
            window.location.href= '/login' 
            })
          }
        }else if(this.userData!=0 && this.userData.role[0].authority == 'customer'){
          this.$router.push({ name: "Booking", params: { roomDetails:roomId ,pageId: this.id } })
        }
    },
    viewImg(roomTypeId) {
      return this.$store.state.url + "/api/rooms/showImage/" + roomTypeId;
    },
  },

  setup(props) {
    const store = useStore();
    store.dispatch("getRoomTypeById", props.id);
    store.dispatch("getRoomRequirementById", props.id);
    store.dispatch("getGetRemaining")
    let userData = computed(function () {
      return store.state.user;
    });
    let rTypeById = computed(function () {
      return store.state.rTypeById;
    });
    let roomReq = computed(function () {
      return store.state.roomReq;
    });
    let remainingRoom = computed(function (){
      return store.state.remainingRoom
    })
    return {
      rTypeById,
      roomReq,
      remainingRoom,
      userData
    };
  },
};
</script>

<style scoped>
.card {
  border: none;
  overflow: hidden;
}
.main_image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 100%;
  overflow: hidden;
}

.heart {
  height: 30px;
  width: 30px;
  background-color: #eaeaea;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content p {
  font-size: 16px;
}
.content p span {
  font-size: 18px;
  color: red;
}
.right-side {
  position: relative;
}

.buttons .btn {
  height: 40px;
  width: 140px;
  border-radius: 0px !important;
}
</style>