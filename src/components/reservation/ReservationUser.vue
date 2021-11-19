<template>
  <div class="container h-auto mt-5 pb-12 px-2 pt-12 mb-20">
    <h1>Reservation History</h1>
    <div class="row height d-flex justify-content-center align-items-center">
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
    <div class="row">
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
    };
  },
  methods: {
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
      "getReservationByCustomerId",
      "c102"
    ); /*mock up customer id = c103*/
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