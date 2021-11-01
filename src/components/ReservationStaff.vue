<template>
    <div class="container h-auto mt-5 pb-12 px-2 pt-12 mb-20">
    <div class="table-responsive">
        <h1>Reservation</h1>
        <table v-if="reservation != null" class="table table-light caption-top table-responsive table-bordered">
            <caption>List of reservation</caption>
            <thead class="table-dark">
                <tr class="bg-light">
                    <!-- <th scope="col" width="5%"><input class="form-check-input" type="checkbox"></th> -->
                    <th scope="col" width="15%">reserve No</th>
                    <th scope="col" width="15%">Reservation Date</th>
                    <th scope="col" width="15%">Payment Method</th>
                    <th scope="col" width="15%">Customer</th>
                    <th scope="col" width="15%">Total</th>
                    <th scope="col" width="15%">Status - Room</th>
                    <th scope="col" class="text-end" width="5%">Confirm</th>
                </tr>
            </thead>
            <tbody  v-for="item in reservation" :key="item.reservNo">
                <tr>
                    <!-- <th scope="row"><input class="form-check-input" type="checkbox"></th> -->
                    <td>{{item.reservNo}}</td>
                    <td>{{item.reservationDate}}</td>
                    <td v-if="item.paymentMethodId != null"><i class="fa fa-check-circle-o green"></i><span class="ms-1">{{item.paymentMethodId.paymentMethodName}}</span></td>
                    <td v-else-if="item.paymentMethodId == null"><i class="fa fa-check-circle-o green"></i><span class="ms-1">-</span></td>
                    <td><img src="https://i.imgur.com/VKOeFyS.png" width="25">{{item.customerId.fname}} {{item.customerId.lname}}</td>
                    <td>{{item.subTotal}}</td>
                    <td>
                        <div v-for="reservationDetail in item.reservationDetailList" :key="reservationDetail.reservDetailId">
                        {{reservationDetail.status}}
                        <select v-model="seletectedRoom">   
                        <option v-for="room in getListRoom(reservationDetail.room)" :key="room.roomId" :value="room"><span>{{room.roomNo}}</span></option>
                        </select>
                    </div>
                    </td>
                    <!-- <td>{{item.status}}</td> -->
                    <td @click.prevent="preferRoom(item)" class="accept font-bold">Accept</td>
                </tr>
            </tbody>
        </table>

    </div>
    </div>
</template>
<script>
import { computed} from "vue";
import { useStore } from "vuex";
export default {
    data(){
        return{
        seletectedRoom:[],
        receptionist:{"repId":"r110","email":"admin10@hotmail.com",
        "password":"123456789","fName":"Kimberly","lName":"Porter",
        "telNo":"0900864032","address":"260/31 bkk 85000"},
        }
    },
    methods:{
        preferRoom(reservation){
            reservation.repId = this.receptionist;
            for(let i = 0 ; i < reservation.reservationDetailList.length ; i++){
                reservation.reservationDetailList[i].room = this.seletectedRoom;
                reservation.reservationDetailList[i].status = 'done';
            }
            console.log(reservation);
            let booking = {
                reservNo : reservation.reservNo,
                customerId : reservation.customerId,
                paymentDate : reservation.paymentDate,
                reservationDate : reservation.reservationDate,
                paymentMethodId : reservation.paymentMethodId,
                subTotal : reservation.subTotal,
                repId : reservation.repId,
                reservationDetailList : reservation.reservationDetailList
            }
            this.createFormData(booking);
        },
        createFormData(booking){
            const jsonNewRoom = JSON.stringify(booking);
            const blob = new Blob([jsonNewRoom],{
                type: "application/json",
            })
            let formData = new FormData();
            formData.append("editReservation",blob)
            this.$store.dispatch("editReservation",formData);
            location.reload();
        },
        getListRoom(room){
            const showRoom = this.rooms.filter(temp => (temp.bedType == room.bedType && temp.roomType.roomTypeId == room.roomType.roomTypeId && temp.roomId > 20));
            return showRoom;
        }
    },
    setup() {
    const store = useStore();
    store.dispatch("getUnsuccessReservation");
    store.dispatch("getRooms")
    let reservation = computed(function () {
      return store.state.reservation;
    });
    let rooms = computed(function () {
      return store.state.rooms;
    });
    return {
      reservation,
      rooms
    };
  },
}

</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');

body {
    font-family: 'Open Sans', sans-serif
}

.search {
    top: 6px;
    left: 10px
}

.form-control {
    border: none;
    padding-left: 32px
}

.form-control:focus {
    border: none;
    box-shadow: none
}

.green {
    color: green
}
.accept:hover{
background-color: rgb(60, 104, 250);
}
</style>