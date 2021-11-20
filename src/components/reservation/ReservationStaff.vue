<template>
  <div v-if="this.$store.state.user != 0 && this.$store.state.user.role[0].authority == 'receptionist' || this.$store.state.user.role[0].authority == 'admin'"  class="container h-auto mt-5 pb-12 px-2 pt-12 mb-20">
    <div class="table-responsive">
      <h1>Reservation</h1>
      <div class="space-x-4 pt-4 pb-2">
        <button
          type="button"
          class="btn btn-warning"
          @click="this.isShowCheckIn = !this.isShowCheckIn"
          v-if="this.isShowCheckIn == false && this.isShowCheckout == false"
        >
          Check-in Couter
          <i class="fas fa-tasks"></i>
        </button>
        <button
          type="button"
          class="btn btn-dark"
          @click="this.isShowCheckIn = !this.isShowCheckIn"
          v-if="this.isShowCheckIn == true"
        >
          Back to Reservation List
          <i class="fas fa-tasks"></i>
        </button>
        <button
          type="button"
          class="btn btn-warning"
          @click="this.isShowCheckout = !this.isShowCheckout"
          v-if="this.isShowCheckout == false && this.isShowCheckIn == false"
        >
          Check-out Counter
          <i class="fas fa-tasks"></i>
        </button>
        <button
          type="button"
          class="btn btn-dark"
          @click="this.isShowCheckout = !this.isShowCheckout"
          v-if="this.isShowCheckout == true"
        >
          Back to Reservation List
          <i class="fas fa-tasks"></i>
        </button>
      </div>
      <hr />
      <div v-if="this.isShowCheckIn == true">
      <table
        class="table table-light caption-top table-responsive table-bordered"
      >
        <caption>
          List of reservation ready to checkIn
        </caption>
        <thead class="table-primary">
          <tr class="bg-light">
            <th scope="col" width="">ID</th>
            <th scope="col" width="">Customer</th>
            <th scope="col" width="">RoomNo/Type</th>
            <th scope="col" width="">Bed Type</th>
            <th scope="col" width="">Status</th>
            <th scope="col" width="">Receptionist</th>
            <th scope="col" width="">CheckIn</th>
            <th scope="col" width="">CheckOut</th>
            <th>
              <div class="search">
                <i class="fa fa-search"></i>
                <input
                  type="text"
                  class="form-control"
                  v-model="searchB"
                  placeholder="search customer"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody v-for="item in filteredCustomer" :key="item.reservNo">
          <tr v-for="rd in item.reservationDetailList" :key="rd.reservDetailId">
            <td v-if="rd.status == 'done'">{{ rd.reservDetailId }}</td>
            <td v-if="rd.status == 'done'">
              {{ item.customerId.fname }} {{ item.customerId.lname }}
            </td>
            <td v-if="rd.status == 'done'">
              {{ rd.room.roomNo }}
              <span v-for="r in rd.room" :key="r.roomId">
                {{ r.name }}
              </span>
            </td>
            <td v-if="rd.status == 'done'">{{ rd.room.bedType }}</td>
            <td v-if="rd.status == 'done'">{{ rd.status }}</td>
            <td v-if="rd.status == 'done'">
              {{ item.repId.fName }} {{ item.repId.lName }}
            </td>
            <td v-if="rd.status == 'done'">{{ rd.checkInDate }}</td>
            <td v-if="rd.status == 'done'">{{ rd.checkOutDate }}</td>
            <td v-if="rd.status == 'done' && rd.checkInDate != this.currentDate" class="text-center">
              <button class="btn btn-success" @click="enterRoom(item, rd)" disabled>
                Check-In
              </button>
            </td>
            <td v-if="rd.status == 'done' && rd.checkInDate == this.currentDate" class="text-center">
              <button class="btn btn-success" @click="enterRoom(item, rd)">
                Check-In
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <div>
      <table
        v-if="this.isShowCheckout == true"
        class="table table-light caption-top table-responsive table-bordered"
      >
        <caption>
          List of reservation checkout
        </caption>
        <thead class="table-primary">
          <tr class="bg-light">
            <th scope="col" width="">ID</th>
            <th scope="col" width="">Customer</th>
            <th scope="col" width="">RoomNo/Type</th>
            <th scope="col" width="">Bed Type</th>
            <th scope="col" width="">Status</th>
            <th scope="col" width="">Receptionist</th>
            <th scope="col" width="">CheckIn</th>
            <th scope="col" width="">CheckOut</th>
            <th>
              <div class="search">
                <i class="fa fa-search"></i>
                <input
                  type="text"
                  class="form-control"
                  v-model="searchB"
                  placeholder="search customer"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody v-for="item in filteredCustomer" :key="item.reservNo">
          <tr v-for="rd in item.reservationDetailList" :key="rd.reservDetailId">
            <td v-if="rd.status == 'check-in'">{{ rd.reservDetailId }}</td>
            <td v-if="rd.status == 'check-in'">
              {{ item.customerId.fname }} {{ item.customerId.lname }}
            </td>
            <td v-if="rd.status == 'check-in'">
              {{ rd.room.roomNo }}
              <span v-for="r in rd.room" :key="r.roomId">
                {{ r.name }}
              </span>
            </td>
            <td v-if="rd.status == 'check-in'">{{ rd.room.bedType }}</td>
            <td v-if="rd.status == 'check-in'">{{ rd.status }}</td>
            <td v-if="rd.status == 'check-in'">
              {{ item.repId.fName }} {{ item.repId.lName }}
            </td>
            <td v-if="rd.status == 'check-in'">{{ rd.checkInDate }}</td>
            <td v-if="rd.status == 'check-in'">{{ rd.checkOutDate }}</td>
            <td v-if="rd.status == 'check-in'" class="text-center">
              <button class="btn btn-danger" @click="returnRoom(item, rd)">
                Checkout Room
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <div>
        <div class="col-md-12 pt-2">
          <div
            v-if="reservation == '' && this.isShowCheckout == false && this.isShowCheckIn == false"
            class="card p-28"
          >
            <div class="card-body">
              <div class="col-sm-12 text-center">
                <div class="d-flex justify-center">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNC4xMDQgMGwtNC4xMDQgNC4xNTIgMTguODg4IDE4Ljc5OSA1LjExMiAxLjA0OS0uOTYxLTUuMjAzLTE4LjkzNS0xOC43OTd6bTE1Ljk0NiAyMS41MDJjLS4xNjcuMTY2LS40MzYuMTY2LS42MDIgMGwtMTcuMjYyLTE3LjEyNGMtLjE2Ny0uMTY3LS4xNjctLjQzNS0uMDAxLS42MDMuMTY2LS4xNjYuNDM3LS4xNjYuNjAzIDBsMTcuMjYyIDE3LjEyNmMuMTY3LjE2NS4xNjYuNDM1IDAgLjYwMXptMS41NDQtMi4xMzJjLjE2Ni4xNjYuMTY2LjQzNyAwIC42MDMtLjE2Ni4xNjUtLjQzNi4xNjYtLjYwMiAwbC0xNy4yNjMtMTcuMTI2Yy0uMTY1LS4xNjUtLjE2NS0uNDM1IDAtLjYwMS4xNjctLjE2Ni40MzYtLjE2Ni42MDEtLjAwMWwxNy4yNjQgMTcuMTI1em0tMi44NTUtMTQuMDY3Yy0uMTk1LS4xOTUtLjE5NS0uNTEyIDAtLjcwN3MuNTEyLS4xOTUuNzA3IDAgLjE5NS41MTIgMCAuNzA3LS41MTEuMTk2LS43MDcgMHptLTcuNzM0IDEyLjY0MWwtNi4wNTUgNi4wNTYtNC45NS00LjkwOCA2LjA1OS02LjA1OSAxLjQxOSAxLjQxLS40MDcuNDA3LjcwNy43MDctLjcwNy43MDctLjcwNy0uNzA3LS43MDcuNzA3LjcwNy43MDctLjcwNy43MDctLjcwNy0uNzA3LS43MDcuNzA3LjcwNy43MDctLjcwNy43MDctLjcwNy0uNzA3LS43MDcuNzA4IDIuMTIxIDIuMTIxIDQuNjU3LTQuNjU3IDEuMzk4IDEuMzg3em0yLjAzNS0xMS44OTJsNi4wNTItNi4wNTIgNC45MDggNC45NS02LjAxMyA2LjAxNC0xLjM5OC0xLjM4OCA0LjYyNS00LjYyNS0yLjEyMS0yLjEyMS0yLjEyMSAyLjEyLjcwNy43MDctLjcwOC43MDgtLjcwNy0uNzA3LS43MDcuNzA3LjcwNy43MDctLjcwNy43MDctLjcwNy0uNzA4LS4zOS4zOS0xLjQyLTEuNDA5eiIvPjwvc3ZnPg=="
                    width="130"
                    height="130"
                    class="mb-4 mr-3"
                  />
                </div>
                <h3><strong>Reservation not found</strong></h3>
                <h4>Waiting for Customer booking room :)</h4>
              </div>
            </div>
          </div>
        </div>
        <table
          v-if="reservation != '' && this.isShowCheckout == false && this.isShowCheckIn == false"
          class="table table-light caption-top table-responsive table-bordered"
        >
          <caption>
            List of reservation
          </caption>
          <thead class="table-primary">
            <tr class="bg-light">
              <th scope="col">ID</th>
              <th scope="col">RoomType</th>
              <th scope="col">Bed</th>
              <th scope="col">PaymentMethod</th>
              <th scope="col">Customer</th>
              <th scope="col">CheckInDate</th>
              <th scope="col">CheckOutDate</th>
              <th scope="col">Total</th>
              <th scope="col" width="15%">Room</th>
              <th scope="col" class="text-end">
                <div class="search">
                  <i class="fa fa-search"></i>
                  <input
                    type="text"
                    class="form-control"
                    v-model="searchA"
                    placeholder="search customer"
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody v-for="item in filteredReservation" :key="item.reservNo">
            <tr
              v-for="reservationDetail in item.reservationDetailList"
              :key="reservationDetail.reservDetailId"
            >
              <td>
                {{ reservationDetail.reservDetailId }} ({{ item.reservNo }})
              </td>
              <td>
                {{ reservationDetail.room.roomType.name }}
              </td>
              <td>
                {{ reservationDetail.room.bedType }}
              </td>
              <td v-if="item.paymentMethodId != null">
                <i class="fa fa-check-circle-o green"></i
                ><span class="ms-1">{{
                  item.paymentMethodId.paymentMethodName
                }}</span>
              </td>
              <td v-else-if="item.paymentMethodId == null">
                <i class="fa fa-check-circle-o green"></i
                ><span class="ms-1">-</span>
              </td>
              <td>
                <img src="https://i.imgur.com/VKOeFyS.png" width="25" />{{
                  item.customerId.fname
                }}
                {{ item.customerId.lname }}
              </td>
              <td>{{ reservationDetail.checkInDate }}</td>
              <td>{{ reservationDetail.checkOutDate }}</td>
              <td>
                {{ reservationDetail.total }}
              </td>
              <td v-if="reservationDetail.status=='check-in'">{{reservationDetail.room.roomNo}} {{reservationDetail.room.roomType.name}}</td>
              <td v-if="reservationDetail.status=='check-out'">{{reservationDetail.room.roomNo}} {{reservationDetail.room.roomType.name}}</td>
              <td class="text-center" v-if="reservationDetail.status === 'undone'">
                <button
                  type="button"
                  @click="getListRoom(reservationDetail)"
                  class="btn btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Choose the Room
                </button>
              </td>
              <td class="text-center" v-if="reservationDetail.status === 'check-in'">
                check-in
              </td>
              <td class="text-center" v-if="reservationDetail.status === 'check-out'">
                check-out
              </td>
              <td  class="text-center" v-if="reservationDetail.status === 'done'">
                {{reservationDetail.room.roomNo}} {{reservationDetail.room.roomType.name}}
                <button type="button" class="btn btn-secondary" 
                  @click="getListRoom(reservationDetail)"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop">
                  <i class="fas fa-edit"></i>  Change the Room
                </button>
              </td>
              <td class="text-center" v-if="reservationDetail.status == 'done'">
                <button
                  class="btn btn-primary p-3"
                  @click.prevent="preferRoom(item, reservationDetail)"
                >
                   Confirm
                </button>
              </td>
              <td class="text-center" v-if="reservationDetail.status == 'undone'">
                <button
                  class="btn btn-primary   p-3"
                  @click.prevent="preferRoom(item, reservationDetail)"
                >
                  Confirm
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- --------------------select room------------------------ -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-blue-600">
            <h5 class="modal-title text-white" id="staticBackdropLabel">
              Choose Room for Customer
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="this.selectedRoom = null"
            ></button>
          </div>
          <div class="modal-body">
            <div v-if="staffRoom != null" class="container p-4">
              <div class="row p-4">
                <div
                  v-for="room in staffRoom"
                  :key="room.roomId"
                  class="
                    form-check form-check-inline
                    bg-white
                    hover:bg-gray-100
                    text-gray-800
                    font-semibold
                    py-2
                    px-4
                    border border-gray-400
                    rounded
                    shadow
                  "
                >
                  <div class="col-md-8 p-4">
                    <input
                      class="form-check-input p-2"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      v-model="selectedRoom"
                      :value="room"
                    />
                    <span
                      >Room: {{ room.roomNo }} , {{ room.roomType.name }},
                      {{ room.bedType }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer bg-blue-600">
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
            >
              Save Changes
            </button>
            <button
              type="button"
              @click="this.selectedRoom = null"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="this.$store.state.user.role[0].authority == 'customer'" class=" w-screen h-screen pt-12 ">
     <div class="flex justify-center p-24 bg-blue-500">
    <section id="not-found">
        <div id="title">Simple Pure CSS3 &bull; 404 Error Page</div>
        <div class="circles">
          <p>
            404<br />
            <small>PAGE NOT FOUND</small>
            <small></small>
          </p>
          <span class="circle big"></span>
          <span class="circle med"></span>
          <span class="circle small"></span>
        </div>
        <div class="text-center">
        <button class="btn btn-dark" @click="goHome()">Go Home</button>
        </div>
      </section>
  </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  data() {
    return {
      checkUnpaid: this.$store.state.unpaid.length + 1,
      searchA: "",
      searchB: "",
      currentDate:new Date().toISOString().slice(0, 10),
      staffRoom: null,
      isShowCheckIn:false,
      isShowCheckout: false,
      selectedRoom: null,
      receptionist:this.userData.authenticationUser||null
    };
  },
  methods: {
    preferRoom(reservation, reservationDetail) {
      if (reservationDetail.status == "undone" && this.selectedRoom != null) {
        reservation.repId = this.receptionist;
        reservationDetail.room = this.selectedRoom;
        reservationDetail.status = "done";
        console.log(reservation);
        let booking = {
          reservNo: reservation.reservNo,
          customerId: reservation.customerId,
          paymentDate: reservation.paymentDate,
          reservationDate: reservation.reservationDate,
          paymentMethodId: reservation.paymentMethodId,
          subTotal: reservation.subTotal,
          status: reservation.status,
          repId: reservation.repId,
          reservationDetailList: reservation.reservationDetailList,
        };
        this.createFormData(booking);
      } else {
        if (reservationDetail.status == "done" && this.selectedRoom != null) {
            console.log('hi')
            reservation.repId = this.receptionist;
            reservationDetail.room = this.selectedRoom;
            console.log(reservation);
            let booking = {
            reservNo: reservation.reservNo,
            customerId: reservation.customerId,
            paymentDate: reservation.paymentDate,
            reservationDate: reservation.reservationDate,
            paymentMethodId: reservation.paymentMethodId,
            subTotal: reservation.subTotal,
            status: reservation.status,
            repId: reservation.repId,
            reservationDetailList: reservation.reservationDetailList,
           };
            this.createFormData(booking);
        }else if(reservationDetail.status == "done" && this.selectedRoom == null){
          alert("Already select room");
        }
        if (reservationDetail.status == "undone" && this.selectedRoom == null) {
          alert("Please select room for customer first");
        }
      }
    },
    createFormData(booking) {
      const jsonNewRoom = JSON.stringify(booking);
      const blob = new Blob([jsonNewRoom], {
        type: "application/json",
      });
      let formData = new FormData();
      formData.append("editReservation", blob);
      this.$store.dispatch("editReservation", formData);
      location.reload();
    },
    getListRoom(reservationDetail) {
      let listReservedRoom = null;
      listReservedRoom = [];
      for (let i = 0; i < this.allReservationDetails.length; i++) {
        if (
          this.allReservationDetails[i].reservDetailId !=
          reservationDetail.reservDetailId
        ) {
          if (
            (reservationDetail.checkInDate >
              this.allReservationDetails[i].checkInDate ||
              reservationDetail.checkInDate ==
                this.allReservationDetails[i].checkInDate) &&
            (reservationDetail.checkOutDate <
              this.allReservationDetails[i].checkOutDate ||
              reservationDetail.checkOutDate ==
                this.allReservationDetails[i].checkOutDate)
          ) {
            if (
              reservationDetail.room.roomType.roomTypeId ==
                this.allReservationDetails[i].room.roomType.roomTypeId &&
              this.allReservationDetails[i].room.status != "mock-up"
            ) {
              listReservedRoom.push(this.allReservationDetails[i].room);
            }
          }
        }
      }
      console.log(listReservedRoom);
      let showRoom = this.rooms;
      if (listReservedRoom.length != 0) {
        for (let i = 0; i < listReservedRoom.length; i++) {
          showRoom = showRoom.filter(
            (temp) =>
              temp.bedType == reservationDetail.room.bedType &&
              temp.roomType.roomTypeId ==
                reservationDetail.room.roomType.roomTypeId &&
              temp.roomId > 20 &&
              temp.roomId != listReservedRoom[i].roomId
          );
        }
      } else {
        showRoom = showRoom.filter(
          (temp) =>
            temp.bedType == reservationDetail.room.bedType &&
            temp.roomType.roomTypeId ==
              reservationDetail.room.roomType.roomTypeId &&
            temp.roomId > 20
        );
      }
      this.staffRoom = showRoom;
      // console.log(reservationDetail)
      console.log(this.staffRoom)
    },
    enterRoom(reservation, reservationDetail){
      console.log("test");
      let response = confirm(
        `Are you sure you want to checkIn this reservation: ${reservation.reservNo}`
      );
      if (response) {
        if (reservationDetail.status == "done") {
          reservation.repId = this.receptionist;
          reservationDetail.room.status = "Available";
          reservationDetail.status = "check-in";
          console.log(reservation);
          let booking = {
            reservNo: reservation.reservNo,
            customerId: reservation.customerId,
            paymentDate: reservation.paymentDate,
            reservationDate: reservation.reservationDate,
            paymentMethodId: reservation.paymentMethodId,
            subTotal: reservation.subTotal,
            status: reservation.status,
            repId: reservation.repId,
            reservationDetailList: reservation.reservationDetailList,
          };
          this.createFormData(booking);
        }
      }
    },
    returnRoom(reservation, reservationDetail) {
      console.log("test");
      let response = confirm(
        `Are you sure you want to checkout this reservation: ${reservation.reservNo}`
      );
      if (response) {
        if (reservationDetail.status == "check-in") {
          reservation.repId = this.receptionist;
          reservationDetail.room.status = "Available";
          reservationDetail.status = "check-out";
          console.log(reservation);
          let booking = {
            reservNo: reservation.reservNo,
            customerId: reservation.customerId,
            paymentDate: reservation.paymentDate,
            reservationDate: reservation.reservationDate,
            paymentMethodId: reservation.paymentMethodId,
            subTotal: reservation.subTotal,
            status: reservation.status,
            repId: reservation.repId,
            reservationDetailList: reservation.reservationDetailList,
          };
          this.createFormData(booking);
        }
      }
    },
    goHome(){
      this.$router.push('/')
    }
  },
  computed: {
    filteredReservation: function () {
      return this.reservation.filter((temp) => {
        return temp.customerId.fname
          .toLowerCase()
          .match(this.searchA.toLowerCase());
      });
    },
    filteredCustomer: function () {
      return this.paid.filter((temp) => {
        return temp.customerId.fname
          .toLowerCase()
          .match(this.searchB.toLowerCase());
      });
    },
    },
  setup() {
    const store = useStore();
    store.dispatch("getUnsuccessReservation");
    store.dispatch("getRooms");
    store.dispatch("getUnpaidReservation");
    store.dispatch("getPaidReservation");
    store.dispatch("getAllReservationDetails");
    let userData = computed(function () {
      return store.state.user;
    });
    let allReservationDetails = computed(function () {
      return store.state.allReservationDetails;
    });
    let reservation = computed(function () {
      return store.state.reservation;
    });
    let rooms = computed(function () {
      return store.state.rooms;
    });
    let unpaid = computed(function () {
      return store.state.unpaid;
    });
    let paid = computed(function () {
      return store.state.paid;
    });
    return {
      reservation,
      rooms,
      unpaid,
      paid,
      allReservationDetails,
      userData
    };
  },
};
</script>

<style scoped>
/* @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap"); */

/* body {
  font-family: "Open Sans", sans-serif;
} */

.form-control {
  border: none;
  padding-left: 32px;
}

.form-control:focus {
  border: none;
  box-shadow: none;
}


@import url(https://fonts.googleapis.com/css?family=Raleway:300,700);
#title {
  text-align:center;
  font-size:40px;
  margin-top:40px;
  margin-bottom:-40px;
  position:relative;
  color:#fff;
}

.circles:after {
  content:'';
  display:inline-block;
  width:100%;
  height:100px;
  background:#fff;
  position:absolute;
  top:-50px;
  left:0;
  transform:skewY(-4deg);
  -webkit-transform:skewY(-4deg);
}

.circles { 
	background:#fff;
	text-align: center;
	position: relative;
  margin-top:-60px;
  box-shadow:inset -1px -4px 4px rgba(0,0,0,0.2);
}

.circles p {
	font-size: 240px;
	color: #fff;
	padding-top: 60px;
	position: relative;
  z-index: 9;
  line-height: 100%;
}

.circles p small { 
  font-size: 40px; 
  line-height: 100%; 
  vertical-align: top;   
}

.circles .circle.small {
	width: 140px;
	height: 140px;
	border-radius: 50%;
	background: #48A9E6;
	position: absolute;
	z-index: 1;
	top: 80px;
	left: 50%;
	animation: 7s smallmove infinite cubic-bezier(1,.22,.71,.98);	
	-webkit-animation: 7s smallmove infinite cubic-bezier(1,.22,.71,.98);
	animation-delay: 1.2s;
	-webkit-animation-delay: 1.2s;
}

.circles .circle.med {
	width: 200px;
	height: 200px;
	border-radius: 50%;
	background: #48A9E6;
	position: absolute;
	z-index: 1;
	top: 0;
	left: 10%;
	animation: 7s medmove infinite cubic-bezier(.32,.04,.15,.75);	
	-webkit-animation: 7s medmove infinite cubic-bezier(.32,.04,.15,.75);
	animation-delay: 0.4s;
	-webkit-animation-delay: 0.4s;
}

.circles .circle.big {
	width: 400px;
	height: 400px;
	border-radius: 50%;
	background: #48A9E6;
	position: absolute;
	z-index: 1;
	top: 200px;
	right: 0;
	animation: 8s bigmove infinite;	
	-webkit-animation: 8s bigmove infinite;
	animation-delay: 3s;
	-webkit-animation-delay: 1s;
}

@-webkit-keyframes smallmove {
	0% { top: 10px; left: 45%; opacity: 1; }
	25% { top: 300px; left: 40%; opacity:0.7; }
	50% { top: 240px; left: 55%; opacity:0.4; }
	75% { top: 100px; left: 40%;  opacity:0.6; }
	100% { top: 10px; left: 45%; opacity: 1; }
}
@keyframes smallmove {
	0% { top: 10px; left: 45%; opacity: 1; }
	25% { top: 300px; left: 40%; opacity:0.7; }
	50% { top: 240px; left: 55%; opacity:0.4; }
	75% { top: 100px; left: 40%;  opacity:0.6; }
	100% { top: 10px; left: 45%; opacity: 1; }
}

@-webkit-keyframes medmove {
	0% { top: 0px; left: 20%; opacity: 1; }
	25% { top: 300px; left: 80%; opacity:0.7; }
	50% { top: 240px; left: 55%; opacity:0.4; }
	75% { top: 100px; left: 40%;  opacity:0.6; }
	100% { top: 0px; left: 20%; opacity: 1; }
}

@keyframes medmove {
	0% { top: 0px; left: 20%; opacity: 1; }
	25% { top: 300px; left: 80%; opacity:0.7; }
	50% { top: 240px; left: 55%; opacity:0.4; }
	75% { top: 100px; left: 40%;  opacity:0.6; }
	100% { top: 0px; left: 20%; opacity: 1; }
}

@-webkit-keyframes bigmove {
	0% { top: 0px; right: 4%; opacity: 0.5; }
	25% { top: 100px; right: 40%; opacity:0.4; }
	50% { top: 240px; right: 45%; opacity:0.8; }
	75% { top: 100px; right: 35%;  opacity:0.6; }
	100% { top: 0px; right: 4%; opacity: 0.5; }
}
@keyframes bigmove {
	0% { top: 0px; right: 4%; opacity: 0.5; }
	25% { top: 100px; right: 40%; opacity:0.4; }
	50% { top: 240px; right: 45%; opacity:0.8; }
	75% { top: 100px; right: 35%;  opacity:0.6; }
	100% { top: 0px; right: 4%; opacity: 0.5; }
}
</style>