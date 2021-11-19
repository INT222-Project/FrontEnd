<template>
  <div class="container h-auto mt-5 pb-12 px-2 pt-12 mb-20">
    <h1>Reservation History</h1>
    <div class="row height d-flex justify-content-center align-items-center mb-4">
      <div class="col-md-12">
        <div class="search">
          <i class="fa fa-search"></i>
          <input
            type="text"
            class="form-control"
            v-model="search"
            placeholder="Search your reservation number"
          />
        </div>
      </div>
    </div>
    <div v-if="reservation.length <=0">
      <div class="col-md-12 pt-2">
          <div
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
                <h3><strong>Booking history not found</strong></h3>
                <h4>Please booking room first</h4>
                <button
                class="btn btn-primary cart-btn-transform m-3"
                data-abc="true"
                @click="backToHome()"
              >
                continue booking
              </button>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div v-if="reservation.length > 0" class="row">
      <div class="col-md-12 pt-2 mb-4">
        <div v-for="item in filteredReserveNo" :key="item.reservNo">
          <div class="card p-3 mb-2">
            <p>
              <span class="font-bold">Reservation No </span>:
              {{ item.reservNo }}
            </p>
            <p>
              <span class="font-bold">Reservation Date </span>:
              {{ item.reservationDate }}
            </p>
            <p>
              <span class="font-bold">Cost </span>:
              {{ item.subTotal.toLocaleString() }}
            </p>
            <p><span class="font-bold">Booking detail </span></p>
            <div class="border border-primary rounded p-3 mb-3">
              <div
                v-for="reservationDetail in item.reservationDetailList"
                :key="reservationDetail.reservDetailId"
              >
                <p>
                  <span class="font-bold">roomType : </span>
                  <!-- {{ reservationDetail.reservDetailId }}  -->
                  {{ reservationDetail.room.roomType.name }}
                  {{ reservationDetail.room.bedType }}
                  {{ reservationDetail.status }}
                </p>
                <p>
                  <span class="font-bold">Package detail : </span>
                  <span
                    v-for="p in reservationDetail.packageDetailList"
                    :key="p.packageDetailId"
                  >
                    {{ p.packageId.name + " " }}
                  </span>
                </p>
                <p>
                  {{ reservationDetail.checkInDate }} {{ reservationDetail.checkOutDate }}
                  </p>
              </div>
            </div>
            <div v-if="item.status == 'unpaid'">
              <button class="btn btn-primary" @click="confirmPayment(item)">
                Upload Payment
              </button>
            </div>
            <div v-if="item.status == 'paid'">
              <button
                class="btn btn-primary"
                @click="confirmPayment(item)"
                disabled
              >
                Upload Payment
              </button>
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
      customer: this.userData.authenticationUser
    };
  },
  methods: {
    backToHome(){
      this.$router.push('/')
    },
    confirmPayment(reservation) {
      reservation.status = "paid";
      let booking = {
        reservNo: reservation.reservNo,
        customerId: reservation.customerId,
        paymentDate: reservation.paymentDate,
        reservationDate: reservation.reservationDate,
        paymentMethodId: reservation.paymentMethodId,
        subTotal: reservation.subTotal,
        status: reservation.status,
        repId: null,
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
  },
  computed: {
    filteredReserveNo: function () {
      return this.reservation.filter((temp) => {
        return temp.reservNo.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(
      "getReservationByCustomerId"
    );
    store.dispatch("getUnpaidReservation");
    let reservation = computed(function () {
      return store.state.reservation;
    });
    let unpaid = computed(function () {
      return store.state.unpaid;
    });
    let userData = computed(function () {
      return store.state.user;
    });
    return {
      reservation,
      unpaid,
      userData
    };
  },
};
</script>