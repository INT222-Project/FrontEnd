<template>
    <div class="container h-screen  mt-5 px-2 pt-12 mb-20">
        <h1>Reservation History</h1>
        <div v-for="item in reservation" :key="item.reservNo" class="list-order">
            Reservation No {{item.reservNo}} Reservation Date {{item.reservationDate}} cost {{item.subTotal}}
            <button>V</button>
            <div v-for="reservationDetail in item.reservationDetailList" :key="reservationDetail.reservDetailId">
                {{reservationDetail.reservDetailId}} || {{reservationDetail.room.roomType.name}} || {{reservationDetail.room.bedType}} || {{reservationDetail.status}}
            </div>
        </div>
    </div>
</template>
<script>
import { computed} from "vue";
import { useStore } from "vuex";
export default {
    setup() {
        const store = useStore();
        store.dispatch("getReservationByCustomerId",'c103'); /*mock up customer id = c103*/
        let reservation = computed(function(){
            return store.state.reservation;
        });
        return{
            reservation
        }
    },
}
</script>