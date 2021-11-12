<template>  
  <div class="container h-auto mt-5 pb-12 px-2 pt-12 mb-20">
    <div class="table-responsive">
      <h1>Reservation</h1>
      <div class="space-x-4 pt-4 pb-2">
        <button
          type="button"
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#monitor"
        >
          Monitor Payment
          <i class="fas fa-tasks"></i>
        </button>
        <button
          type="button"
          class="btn btn-warning"
          @click="this.isShowCheckout = !this.isShowCheckout"
          v-if="this.isShowCheckout == false"
        >
          Checkout Counter
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

      <!-- {{this.filteredCustomer.length}} -->
         <table
        v-if="this.isShowCheckout == true "
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
            <th><div class="search"> 
              <i class="fa fa-search"></i> 
              <input type="text" class="form-control" v-model="searchB" placeholder="search customer"> 
              </div> </th>
          </tr>
        </thead>
        <tbody v-for="item in filteredCustomer" :key="item.reservNo">
          <tr v-for="rd in item.reservationDetailList"
            :key="rd.reservDetailId">
            <td v-if="rd.status == 'reserved'">{{rd.reservDetailId}}</td>
            <td v-if="rd.status == 'reserved'">{{item.customerId.fname}} {{item.customerId.lname}}</td>
            <td v-if="rd.status == 'reserved'">
              {{rd.room.roomNo}}
              <span v-for="r in rd.room" :key="r.roomId">
              {{r.name}}
              </span>
            </td>
            <td v-if="rd.status == 'reserved'">{{rd.room.bedType}}</td>
            <td v-if="rd.status == 'reserved'">{{rd.status}}</td>
            <td v-if="rd.status == 'reserved'">{{item.repId.fName}} {{item.repId.lName}}</td>
            <td v-if="rd.status == 'reserved'">{{rd.checkInDate}}</td>
            <td v-if="rd.status == 'reserved'">{{rd.checkOutDate}}</td>
            <td v-if="rd.status == 'reserved'" class="text-center"><button class="btn btn-danger" @click="returnRoom(item, rd)">
                  Checkout Room
                </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <div class="col-md-12 pt-2">
        <div v-if="reservation == ''  &&  this.isShowCheckout == false" class="card p-28">
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
        v-if="reservation != '' &&  this.isShowCheckout == false"
        class="table table-light caption-top table-responsive table-bordered"
      >
        <caption>
          List of reservation
        </caption>
        <thead class="table-primary">
          <tr class="bg-light">
            <th scope="col">ID</th>
             <th scope="col" >RoomType</th>
            <th scope="col" >Bed</th>
            <th scope="col">PaymentMethod</th>
            <th scope="col" >Customer</th>
            <th scope="col" >CheckInDate</th>
             <th scope="col" >CheckOutDate</th>
             <th scope="col" >Total</th>
            <th scope="col" >Status / Room</th>
            <th scope="col" class="text-end"><div class="search"> 
              <i class="fa fa-search"></i> 
              <input type="text" class="form-control" v-model="searchA" placeholder="search customer"> 
              </div></th>
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
              {{reservationDetail.room.roomType.name}}
            </td>
            <td>
              {{reservationDetail.room.bedType}}
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
            <td v-if="reservationDetail.status === 'undone'">
              <button
                type="button"
                @click="getListRoom(reservationDetail.room)"
                class="btn btn-outline-primary "
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Choose the Room {{ reservationDetail.status }}
              </button>
            </td>
            <td v-if="reservationDetail.status === 'done'">
              <button type="button" class="btn btn-secondary ">
                Choose the Room {{ reservationDetail.status }}
              </button>
            </td>
            <td class="text-center">
              <button
                class="btn btn-success p-3"
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
    <!-- ------------------Monitor Payment------------------------- -->
    <div
      class="modal fade"
      id="monitor"
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
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-white" id="checkoutLabel">
              Monitor Payment
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            class="modal-body text-center"
            v-if="this.$store.state.unpaid.length == 0"
          >
            <div class="container">
              <div class="d-flex justify-center">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNC4xMDQgMGwtNC4xMDQgNC4xNTIgMTguODg4IDE4Ljc5OSA1LjExMiAxLjA0OS0uOTYxLTUuMjAzLTE4LjkzNS0xOC43OTd6bTE1Ljk0NiAyMS41MDJjLS4xNjcuMTY2LS40MzYuMTY2LS42MDIgMGwtMTcuMjYyLTE3LjEyNGMtLjE2Ny0uMTY3LS4xNjctLjQzNS0uMDAxLS42MDMuMTY2LS4xNjYuNDM3LS4xNjYuNjAzIDBsMTcuMjYyIDE3LjEyNmMuMTY3LjE2NS4xNjYuNDM1IDAgLjYwMXptMS41NDQtMi4xMzJjLjE2Ni4xNjYuMTY2LjQzNyAwIC42MDMtLjE2Ni4xNjUtLjQzNi4xNjYtLjYwMiAwbC0xNy4yNjMtMTcuMTI2Yy0uMTY1LS4xNjUtLjE2NS0uNDM1IDAtLjYwMS4xNjctLjE2Ni40MzYtLjE2Ni42MDEtLjAwMWwxNy4yNjQgMTcuMTI1em0tMi44NTUtMTQuMDY3Yy0uMTk1LS4xOTUtLjE5NS0uNTEyIDAtLjcwN3MuNTEyLS4xOTUuNzA3IDAgLjE5NS41MTIgMCAuNzA3LS41MTEuMTk2LS43MDcgMHptLTcuNzM0IDEyLjY0MWwtNi4wNTUgNi4wNTYtNC45NS00LjkwOCA2LjA1OS02LjA1OSAxLjQxOSAxLjQxLS40MDcuNDA3LjcwNy43MDctLjcwNy43MDctLjcwNy0uNzA3LS43MDcuNzA3LjcwNy43MDctLjcwNy43MDctLjcwNy0uNzA3LS43MDcuNzA3LjcwNy43MDctLjcwNy43MDctLjcwNy0uNzA3LS43MDcuNzA4IDIuMTIxIDIuMTIxIDQuNjU3LTQuNjU3IDEuMzk4IDEuMzg3em0yLjAzNS0xMS44OTJsNi4wNTItNi4wNTIgNC45MDggNC45NS02LjAxMyA2LjAxNC0xLjM5OC0xLjM4OCA0LjYyNS00LjYyNS0yLjEyMS0yLjEyMS0yLjEyMSAyLjEyLjcwNy43MDctLjcwOC43MDgtLjcwNy0uNzA3LS43MDcuNzA3LjcwNy43MDctLjcwNy43MDctLjcwNy0uNzA4LS4zOS4zOS0xLjQyLTEuNDA5eiIvPjwvc3ZnPg=="
                  width="130"
                  height="130"
                  class="mb-4 mr-3"
                />
              </div>
              <h1>Reservation Payment Not found</h1>
            </div>
          </div>
          <div class="modal-body" v-if="this.$store.state.unpaid.length > 0">
            <div class="container">
              <div class="row p-4">
                <div v-for="up in unpaid" :key="up.reservNo">
                  <div
                    v-for="rd in up.reservationDetailList"
                    :key="rd.reservDetailId"
                  >
                    <span>
                      <p>
                        ID
                        <span class="font-bold"> {{ rd.reservDetailId }}</span>
                        - room number
                        <span class="font-bold">
                          {{ rd.room.roomNo }} {{ rd.room.roomType.name }}</span
                        >
                        Booked by a customer named
                        <span class="font-bold"
                          >{{ up.customerId.fname }}
                          {{ up.customerId.lname }}</span
                        >
                        Responsible by the receptionist named RepId
                        <span class="font-bold"
                          >{{ up.repId.fName }} {{ up.repId.lName }}</span
                        >
                      </p>
                      <p>
                        Status
                        <span class="font-bold">{{ up.status }}</span> Pay date
                        <span class="font-bold"> {{ up.paymentDate }} </span>
                      </p>
                      <p>
                        CheckIn:
                        <span class="font-bold">{{ rd.checkInDate }}</span>
                      </p>
                      <p>
                        CheckOut:
                        <span class="font-bold">{{ rd.checkOutDate }}</span>
                      </p>
                    </span>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer bg-dark">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
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
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  data() {
    return {
      checkUnpaid: this.$store.state.unpaid.length + 1,
      searchA: "",
      searchB:"",
      staffRoom: null,
      isShowCheckout: false,
      selectedRoom: null,
      receptionist: {
        repId: "r110",
        email: "admin10@hotmail.com",
        password: "123456789",
        fName: "Kimberly",
        lName: "Porter",
        telNo: "0900864032",
        address: "260/31 bkk 85000",
      },
    };
  },
  methods: {
    preferRoom(reservation, reservationDetail) {
      if (reservationDetail.status == "undone" && this.selectedRoom != null) {
        reservation.repId = this.receptionist;
        reservationDetail.room = this.selectedRoom;
        reservationDetail.room.status = "Unavailable";
        reservationDetail.status = "done";
        let list = reservation.reservationDetailList;
        if (list.length > 0) {
          let count = 0;
          for (let i = 0; i < list.length; i++) {
            if (list[i].status == "done") count++;
          }
          if (count == list.length) reservation.status = "unpaid";
        }
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
        if (reservationDetail.status == "done") {
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
    getListRoom(room) {
      const showRoom = this.rooms.filter(
        (temp) =>
          temp.bedType == room.bedType &&
          temp.roomType.roomTypeId == room.roomType.roomTypeId &&
          temp.roomId > 20
      );
      this.staffRoom = showRoom;
      console.log(room)
      console.log(this.staffRoom)
    },
    returnRoom(reservation, reservationDetail) {
      console.log("test");
      let response = confirm(`Are you sure you want to checkout this reservation: ${reservation.reservNo}`)
      if(response){
      if (reservationDetail.status == "reserved") {
        reservation.repId = this.receptionist;
        reservationDetail.room.status = "Available";
        reservationDetail.status = "CheckedOut";
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
    store.dispatch("getAvailableRooms");
    store.dispatch("getUnpaidReservation");
    store.dispatch("getPaidReservation");
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
    };
  },
};
</script>

<style>
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
/* body {
    background-color: #eee;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300
} */

</style>