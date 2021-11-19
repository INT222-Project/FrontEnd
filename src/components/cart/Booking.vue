<template>
  <div class="container mt-5 px-5 pt-14">
    <div class="mb-4">
      <h2>Confirm package and pay</h2>
      <span
        >please make the payment, after that you can enjoy all the features and
        benefits.</span
      >
    </div>
    <div class="row">
      <div class="col-md-8">
        <div class="card p-3">
          <div class="booking-form">
            
            <h4 class="form-label">Please Type Your Information</h4>
            <div class="row">
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
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <span class="form-label">Rooms</span>
                  <div class="d-flex space-x-4">
                    <button type="button" @click="decreaseAmount()">
                      <i class="fas fa-minus-square"></i>
                    </button>
                    <h3 class="form-control">{{ amount }}</h3>
                    <button type="button" @click="increaseAmount()">
                      <i class="far fa-plus-square"></i>
                    </button>
                  </div>
                  <div v-if="this.invAmount" class="text-red-500 text-sm">
                    Please select Amount of Room.
                  </div>
                  <span class="select-arrow"></span>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <span class="form-label">Guest Per Room</span>
                  <div class="d-flex space-x-4">
                    <button type="button" @click="decreaseGuest()">
                      <i class="fas fa-minus-square"></i>
                    </button>
                    <h3 class="form-control">{{ numOfRest }}</h3>
                    <button type="button" @click="increaseGuest()">
                      <i class="far fa-plus-square"></i>
                    </button>
                  </div>
                  <div v-if="this.invNumOfRest" class="text-red-500 text-sm">
                    Please select the number of guests not more than max rest
                  </div>
                  <span class="select-arrow"></span>
                </div>
              </div>
            </div>
            <div class="col-sm-12">
              <span class="form-label">Packages (extra charge)</span>
              <div class="row pl-4">
                <div
                  class="form-check col-sm-6"
                  v-for="p in packages"
                  :key="p.packageId"
                >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="p"
                    v-model="selectedPackages"
                  />
                  <label class="form-check-label">
                    {{ p.name }} ({{ p.packageCharge }}฿)
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 mb-4 d-flex justify-content-between">
          <button @click="goBack()" class="btn btn-outline-dark">
            <i class="fas fa-angle-double-left"></i> Booking More
          </button>
          <button @click="addToCart()" class="btn btn-success px-3">
            Add to Cart
            <i class="fas fa-angle-double-right"></i>
          </button>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card card-blue p-3 text-white mb-3">
          <span>You have to pay</span>
          <div class="d-flex flex-md-row space-x-2 align-items-end mb-2">
            <div>
              Room Charge(1 Room)<span class="yellow">
                {{ room.roomCharge }}</span
              >
            </div>
            <div>
              Package Price <span class="yellow">{{ packagePrice }}</span>
            </div>
          </div>
          <div>
            Type <span class="yellow">{{ room.roomType.name }}</span>
          </div>
          <div>
            Max Rest <span class="yellow">{{ room.roomType.maxRest }}</span>
          </div>
          <div>
            <h1 class="mb-0 yellow">฿{{ subtotal.toLocaleString()}}</h1>
          </div>
          <span
            >Enjoy all the features and perk after you complete the
            payment</span
          >
          <div class="hightlight">
            <span
              >100% Guaranteed support and update for the next 5 years.</span
            >
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
  props: ["roomDetails", "pageId"],
  data() {
    return {
      // customer: {
      //   customerId: "c103",
      //   email: "sahachai.senarak@hotmail.com",
      //   password: "123456789",
      //   telNo: "0945542211",
      //   address: "102/10 bkk 10140",
      //   lname: "Senarak",
      //   fname: "Sahachai",
      // },
      customer:this.userData.authenticationUser||null,
      minCiDate: new Date().toISOString().slice(0, 10),
      checkIn: this.$store.state.checkIn || "",
      checkOut: this.$store.state.checkOut || "",
      numOfRest: 0,
      amount: 0,
      paymentMethod: null,
      selectedPackages: [],
      total: 0,
      invCheckIn: false,
      invCheckOut: false,
      invNumOfRest: false,
      invPaymentMethod: false,
      invAmount: false,
    };
  },
  methods: {
    increaseAmount(){
      if(this.amount >= 3){
        this.amount = 0;
      }else{
         this.amount++
      }
    },
    decreaseAmount(){
      if(this.amount <=0){
        this.amount = 3;
      }else{
        this.amount--
      }
    },
    increaseGuest(){
      if(this.numOfRest >= 6){
        this.numOfRest = 0;
      }else{
         this.numOfRest++
      }
    },
    decreaseGuest(){
      if(this.numOfRest <=0){
        this.numOfRest = 6;
      }else{
        this.numOfRest--
      }
    },
    
    calculateDay() {
      if (this.checkIn == "" || this.checkOut == "") return 1;
      const temp1 = new Date(this.checkIn);
      const temp2 = new Date(this.checkOut);
      var diffTime = temp2.getTime() - temp1.getTime();
      var diffDays = diffTime / (1000 * 3600 * 24);
      console.log("diff days : " + diffDays);
      return diffDays;
    },
    addToCart() {
      this.invCheckIn = this.checkIn === "" ? true : false;
      if (this.checkOut === "" || this.calculateDay() == 0) {
        this.invCheckOut = true;
      } else {
        this.invCheckOut = false;
      }
      if (this.numOfRest <= 0 || this.numOfRest > this.room.roomType.maxRest) {
        this.invNumOfRest = true;
      } else {
        this.invNumOfRest = false;
      }
      this.invAmount = this.amount <= 0 ? true : false;
      if (
        !this.invCheckIn &&
        !this.invCheckOut &&
        !this.invNumOfRest &&
        !this.invAmount
      ) {
        const currentDate = new Date();
        var numberOfDay = 1;
        const paymentDate = new Date();
        paymentDate.setDate(paymentDate.getDate() + numberOfDay);
        for (let i = 0; i < this.selectedPackages.length; i++) {
          this.total += this.selectedPackages[i].packageCharge;
        }
        this.total += this.room.roomCharge * this.calculateDay();
        console.log(
          this.customer.customerId +
            "," +
            this.paymentMethod +
            "," +
            this.total +
            "," +
            currentDate +
            "," +
            paymentDate
        );
        const booking = {
          customer: this.customer,
          reservationDate: currentDate,
          paymentDate: paymentDate,
          subtotal: this.total,
          checkInDate: this.checkIn,
          checkOutDate: this.checkOut,
          numOfRest: this.numOfRest,
          room: this.room,
          packages: this.selectedPackages,
        };
        let j = 0;
        while (j < this.amount) {
          this.$store.dispatch("addRoomToCart", booking);
          j++;
        }
        this.$router.push({ name: "Cart" });
      }
    },
    goBack() {
      this.$router.push({ name: "RoomDetails", params: { id: this.pageId } });
    },
  },
  computed: {
    minDate() {
      return this.minCiDate;
    },
    minValue() {
      return this.checkIn;
    },
    packagePrice() {
      let total = 0;
      for (let i = 0; i < this.selectedPackages.length; i++) {
        total += this.selectedPackages[i].packageCharge;
      }
      return total;
    },
    subtotal() {
      let total = 0;
      for (let i = 0; i < this.selectedPackages.length; i++) {
        total += this.selectedPackages[i].packageCharge;
      }
      return total + this.room.roomCharge * this.calculateDay();
    },
  },

  setup(props) {
    const store = useStore();
    store.dispatch("getPackages");
    store.dispatch("getPaymentMethods");
    store.dispatch("getRoomById", props.roomDetails);
    let userData = computed(function () {
      return store.state.user;
    });
    let packages = computed(function () {
      return store.state.package;
    });
    let room = computed(function () {
      return store.state.room;
    });
    let payment = computed(function () {
      return store.state.payment;
    });
    return {
      room,
      packages,
      payment,
      userData
    };
  },
};
</script>
<style scoped>
.booking-form {
  background-color: #fff;
  padding: 50px 20px;
}
.booking-form .form-group {
  position: relative;
  margin-bottom: 30px;
}
.booking-form .form-control {
  text-align: center;
  background-color: #ebecee;
  border-radius: 4px;
  border: none;
  height: 40px;
  -webkit-box-shadow: none;
  box-shadow: none;
  color: #3e485c;
  font-size: 14px;
}
.booking-form .form-control::-webkit-input-placeholder {
  color: rgba(62, 72, 92, 0.3);
}
.booking-form .form-control:-ms-input-placeholder {
  color: rgba(62, 72, 92, 0.3);
}
.booking-form .form-control::placeholder {
  color: rgba(62, 72, 92, 0.3);
}
.booking-form input[type="date"].form-control:invalid {
  color: rgba(62, 72, 92, 0.3);
}
.booking-form select.form-control {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.booking-form select.form-control + .select-arrow {
  position: absolute;
  right: 0px;
  bottom: 4px;
  width: 32px;
  line-height: 32px;
  height: 32px;
  text-align: center;
  pointer-events: none;
  color: rgba(62, 72, 92, 0.3);
  font-size: 14px;
}
.booking-form select.form-control + .select-arrow:after {
  content: "\279C";
  display: block;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.booking-form .form-label {
  display: inline-block;
  color: #3e485c;
  font-weight: 700;
  margin-bottom: 6px;
  margin-left: 7px;
}
.booking-form .submit-btn {
  display: inline-block;
  color: #fff;
  background-color: #1e62d8;
  font-weight: 700;
  padding: 14px 30px;
  border-radius: 4px;
  border: none;
  -webkit-transition: 0.2s all;
  transition: 0.2s all;
}
.booking-form .submit-btn:hover,
.booking-form .submit-btn:focus {
  opacity: 0.9;
}
.booking-cta {
  margin-top: 80px;
  margin-bottom: 30px;
}
.booking-cta h1 {
  font-size: 52px;
  text-transform: uppercase;
  color: #fff;
  font-weight: 700;
}
.booking-cta p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
}
.card-blue {
  background-color: #492bc4;
}
.hightlight {
  background-color: #5737d9;
  padding: 10px;
  border-radius: 10px;
  margin-top: 15px;
  font-size: 14px;
}
.yellow {
  color: #fdcc49;
}
.decoration {
  text-decoration: none;
  font-size: 14px;
}
.btn-success {
  color: #fff;
  background-color: #492bc4;
  border-color: #492bc4;
}
.btn-success:hover {
  color: #fff;
  background-color: #492bc4;
  border-color: #492bc4;
}
.decoration:hover {
  text-decoration: none;
  color: #fdcc49;
}
</style>
