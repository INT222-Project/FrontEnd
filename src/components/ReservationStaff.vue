<template>
  <div class="container h-auto mt-5 pb-12 px-2 pt-12 mb-20">
    <div class="table-responsive">
      <h1>Reservation</h1>
      <div class="col-md-12 pt-2">
        <div v-if="reservation == ''" class="card p-28">
          <div class="card-body cart">
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

      <!-- <div v-if="reservation != ''">
              <div class="col-12">
                <div v-for="item in reservation" :key="item.reservNo">
                  <div class="card">
                    {{item.reservNo}}
                    {{item.reservationDate}}
                    {{item.customerId.fname}}
                    {{ item.customerId.lname }}
                    </div>
                </div>
          </div>
        </div> -->
      <table
        v-if="reservation != ''"
        class="table table-light caption-top table-responsive table-bordered"
      >
        <caption>
          List of reservation
        </caption>
        <thead class="table-dark">
          <tr class="bg-light">
            <th scope="col" width="15%">reservation detail id</th>
            <th scope="col" width="15%">Reservation Date</th>
            <th scope="col" width="15%">Payment Method</th>
            <th scope="col" width="15%">Customer</th>
            <th scope="col" width="15%">Total</th>
            <th scope="col" width="15%">Status - Room</th>
            <th scope="col" class="text-end" width="5%">Confirm</th>
          </tr>
        </thead>
        <tbody v-for="item in reservation" :key="item.reservNo">
          <tr v-for="reservationDetail in item.reservationDetailList"
              :key="reservationDetail.reservDetailId">
              <td>{{ reservationDetail.reservDetailId }} ({{item.reservNo}})</td>
              <td>{{ item.reservationDate }}</td>
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
              <td>{{ reservationDetail.total }}</td>
              {{ reservationDetail.status }}
              <select v-model="selectedRoom">
                <option
                  v-for="room in getListRoom(reservationDetail.room)"
                  :key="room.roomId"
                  :value="room"
                >
                  <span>{{ room.roomNo }}</span>
                </option>
              </select>
            <td @click.prevent="preferRoom(item,reservationDetail)" class="accept font-bold">
              Accept
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  data() {
    return {
      selectedRoom3: null,
      selectedRoom2: null,
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
    preferRoom(reservation,reservationDetail) {
      reservationDetail.room = this.selectedRoom;
      reservationDetail.status = "done";
      let list = reservation.reservationDetailList;
      if(list.length > 0){
        let count = 0
        for(let i = 0 ; i < list.length ; i++){
          if(list[i].status == "done") count++;
        }
        if(count == list.length ) reservation.status = "done";
      }
      console.log(reservation);
      let booking = {
        reservNo: reservation.reservNo,
        customerId: reservation.customerId,
        paymentDate: reservation.paymentDate,
        reservationDate: reservation.reservationDate,
        paymentMethodId: reservation.paymentMethodId,
        subTotal: reservation.subTotal,
        status : reservation.status,
        repId: reservation.repId,
        reservationDetailList: reservation.reservationDetailList,
      };
      this.createFormData(booking);
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
      return showRoom;
    },
  },
  setup() {
    const store = useStore();
    store.dispatch("getUnsuccessReservation");
    store.dispatch("getRooms");
    let reservation = computed(function () {
      return store.state.reservation;
    });
    let rooms = computed(function () {
      return store.state.rooms;
    });
    return {
      reservation,
      rooms,
    };
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap");

body {
  font-family: "Open Sans", sans-serif;
}

.search {
  top: 6px;
  left: 10px;
}

.form-control {
  border: none;
  padding-left: 32px;
}

.form-control:focus {
  border: none;
  box-shadow: none;
}

.green {
  color: green;
}
.accept:hover {
  background-color: rgb(60, 104, 250);
}
</style>