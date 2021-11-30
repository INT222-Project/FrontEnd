<template>
  <div class="container pt-20 pb-18">
    <div class="jumbotron">
      <div class="text-start mb-8">
        <h1 class="display-2">
          Room Offer
          <span class="float-right">
            <button
              class="btn btn-primary p-3"
              data-bs-toggle="modal"
              data-bs-target="#checkin"
            >
             <span v-if="this.checkIn == '' || this.checkOut ==''"><i class="far fa-calendar-check"></i> Choose a travel date</span>
             <span v-if="this.checkIn != '' || this.checkOut !=''"><i class="far fa-calendar-check"></i> {{this.checkIn }} To {{ this.checkOut }} ({{calculateDay()}} day)</span>
            </button>
          </span>
        </h1>
      </div>
      <p class="lead">
        The hotel has more than 40 rooms with a cosmopolitan atmosphere. unique
        and worth the price It combines modern decor with the warmth and
        elegance of the city. the beauty of the hotel This makes this hotel a
        prominent meeting point in the city.
      </p>
      <div
        class="row height d-flex justify-content-center align-items-center mb-4"
      >
        <div class="col-md-12">
          <div class="search">
            <i class="fa fa-search"></i>
            <input
              type="search"
              class="form-control"
              v-model="search"
              placeholder="Search for the room type you want to booking: Standard, Suite"
            />
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="checkin"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="checkoutLabel"
        aria-hidden="true"
      >
        <div
          class="
            modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered
          "
        >
          <div class="modal-content">
            <div class="modal-header bg-primary">
              <h5 class="modal-title text-white">
                Choose a travel date to check room avaliable
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="check modal-body d-flex space-x-2">
              <div class="col-sm-6">
                <div class="form-group">
                  <span class="form-label">Check In</span>
                  <input
                    class="form-control"
                    v-model="checkIn"
                    :min="minDate"
                    type="date"
                  />
                  <div v-if="this.invCheckIn" class="text-red-500 text-sm">
                    Please select checkIn date.
                  </div>
                </div>
              </div>
              <div class="col-sm-6" v-if="this.checkIn != ''">
                <div class="form-group">
                  <span class="form-label">Check out</span>
                  <input
                    class="form-control"
                    v-model="checkOut"
                    :min="minValue"
                    type="date"
                  />
                  <div v-if="this.invCheckOut" class="text-red-500 text-sm">
                    Please select date for rest atleast 1 night.
                  </div>
                </div>
              </div>
              <div class="col-sm-6" v-if="this.checkIn == ''">
                <div class="form-group">
                  <span class="form-label">Check out</span>
                  <input
                    class="form-control"
                    placeholder="วว/ดด/ปปปป"
                    disabled
                    type="text"
                  />
                  <div v-if="this.invCheckOut" class="text-red-500 text-sm">
                    Please select date for rest atleast 1 night.
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer text-center space-x-4">
              <button
                type="button"
                @click="selectDate()"
                class="btn btn-success"
                data-bs-dismiss="modal"
              >
                Confirm
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-2" />
      <div class="row row-cols-lg-2 g-4">
        <div v-for="r in filteredRtype" :key="r.roomTypeId">
          <div class="col">
            <div class="card shadow-md">
              <div class="inner">
                <button @click="CheckDateAvaliable(r.roomTypeId)">
                  <img :src="viewImg(r.roomTypeId)" class="card-img-top"/>
                </button>
              </div>
            </div>
            <div class="card-body">
              <h5 class="card-title text-center">
                {{ r.name }}
              </h5>
              <p class="card-text text-center">
                {{ r.roomSize }} | members {{ r.maxRest }} +
              </p>
              <div class="flex justify-center">
                <span
                  ><button
                    @click="CheckDateAvaliable(r.roomTypeId)"
                    class="
                      bg-blue-500
                      px-5
                      py-3
                      text-sm
                      shadow-sm
                      font-medium
                      tracking-wider
                      text-blue-100
                      rounded-full
                      hover:shadow-2xl hover:bg-blue-600
                    "
                  >
                    WATCH ROOM
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  data() {
    return {
      search: "",
      minCiDate: new Date().toISOString().slice(0, 10),
      checkIn: this.$store.state.checkIn || new Date().toISOString().slice(0, 10),
      checkOut: this.$store.state.checkOut || new Date().toISOString().slice(0, 10),
      invCheckIn: false,
      invCheckOut: false,
      showDate: false,
    };
  },
  methods: {
    CheckDateAvaliable(pId) {
      if (this.checkIn == "" || this.checkOut == "" || this.calculateDay() == 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        alert("Please Choose Travel Date Atleast 1 Day");
      } else if (!this.invCheckIn && !this.invCheckOut) {
        this.showDate = this.$router.push({
          name: "RoomDetails",
          params: { id: pId },
        });
      }
    },
    calculateDay() {
      if (this.checkIn == "" || this.checkOut == "") return 1;
      const temp1 = new Date(this.checkIn);
      const temp2 = new Date(this.checkOut);
      var diffTime = temp2.getTime() - temp1.getTime();
      var diffDays = diffTime / (1000 * 3600 * 24);
      // console.log("diff days : " + diffDays);
      return diffDays;
    },
    selectDate() {
      this.invCheckIn = this.checkIn === "" ? true : false;
      if (this.checkOut === "" || this.calculateDay() == 0) {
        this.invCheckOut = true;
      } else {
        this.invCheckOut = false;
      }
      if (!this.invCheckIn && !this.invCheckOut) {
        this.showDate = true;
        this.$store.dispatch("addCheckInDate", this.checkIn);
        this.$store.dispatch("addCheckOutDate", this.checkOut);
      } else {
        this.showDate = false;
      }
    },
    viewImg(roomTypeId) {
      return this.$store.state.url + "/api/rooms/showImage/" + roomTypeId; //change ip
    },
  },
  computed: {
    minDate() {
      return this.minCiDate;
    },
    minValue() {
      return this.checkIn;
    },
     isLoggedIn(){
      return this.$store.state.user
    },
    filteredRtype: function () {
      return this.rType.filter((rt) => {
        return rt.name.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
  setup() {
    const store = useStore();
    store.dispatch("getRoomType");
    let rType = computed(function () {
      return store.state.rType;
    });
    let userData = computed(function () {
      return store.state.user;
    });
    return {
      rType,
      userData
    };
  },
};
</script>
<style>
li a {
  text-decoration: none;
}
span a {
  text-decoration: none;
}
.check .form-group {
  position: relative;
  /* margin-bottom: 30px; */
}
.check .form-control {
  background-color: #ebecee;
  border-radius: 4px;
  border: none;
  height: 40px;
  -webkit-box-shadow: none;
  box-shadow: none;
  color: #3e485c;
  font-size: 14px;
}
</style>
