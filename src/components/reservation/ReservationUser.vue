<template>
  <div v-if="this.$store.state.user != 0 && this.$store.state.user.role[0].authority == 'customer' || this.$store.state.user.role[0].authority == 'admin'" class="container h-auto mt-5 pb-12 px-2 pt-12 mb-20">
    <h1>Reservation History</h1>
    <!-- {{this.reservation}} -->
    <div class="row height d-flex justify-content-center align-items-center mb-2">
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
              <span class="font-bold">ReservationDetail </span>:
              {{reservationDetail.reservDetailId}}
              </p>
                <p>
                  <span class="font-bold">roomType : </span>
                  {{ reservationDetail.room.roomType.name }}
                  {{ reservationDetail.room.bedType }}
                </p>
                <p>
                  <span class="font-bold">Package detail : </span>
                  <span
                    v-for="p in reservationDetail.packageDetailList"
                    :key="p.packageDetailId"
                  >
                    {{ p.packageId.name + ", " }}
                  </span>
                </p>
              <div v-if="this.editForm == true && this.editId == reservationDetail.reservDetailId" class="col-sm-12">
              <div v-if="this.selectedPackages != null">
              <span class="form-label">Packages (extra charge)</span>
              <div class="row pl-4">
                <div
                  class="form-check col-sm-6"
                  v-for="p in packages"
                  :key="p.packageId"
                >
                  <input
                    v-if="checkPackage(p.packageId)"
                    class="form-check-input showSelectedPackage"
                    type="checkbox"
                    :value="p"
                    :checked="true"
                  />
                  <input
                    v-if="!checkPackage(p.packageId)"
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
                <button v-if="this.editForm == false && item.status == 'unpaid'" class="btn btn-success" @click="editBtn(reservationDetail.packageDetailList,item.reservNo,reservationDetail.reservDetailId)">
                  Edit Package <i class="fas fa-edit"></i>
                </button>
                <div class="space-x-2">
                <button v-if="this.editForm == true && this.editId == reservationDetail.reservDetailId" class="btn btn-success" @click="comfirmEdit()">Submit</button>
                <button v-if="this.editForm == true && this.editId == reservationDetail.reservDetailId" class="btn btn-danger" @click="cancelEdit()">cancel</button>
                </div>
                <p>
                  <span class="font-bold">Check In : </span>{{ reservationDetail.checkInDate }}
                </p>
                <p>
                  <span class="font-bold">Check Out :</span>{{ reservationDetail.checkOutDate }}
                </p>
                <hr/>
              </div>
            </div>
            <div v-if="item.status == 'unpaid'" class="space-x-2">
              <button class="btn btn-primary" @click="confirmPayment(item)">
                Upload Payment
              </button>
              <button class="btn btn-danger" @click="cancelPayment(item)">
                Cancel
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
  <div v-if="this.$store.state.user != 0 && this.$store.state.user.role[0].authority == 'receptionist'" class="flex justify-center p-24 bg-blue-500">
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
        <button class="btn btn-dark" @click="backToHome()">Go Home</button>
        </div>
      </section>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  data() {
    return {
      editForm:false,
      selectedPackages:[],
      newSelectedPacakges:[],
      oldPackages:[],
      tempItemPackages:[],
      reserveId:"",
      editId:"",
      search: "",
      customer: this.userData.authenticationUser,
      invalidPackage:false
    };
  },
  methods: {
    cancelPayment(item){
      let response = confirm(`Are you want to cancel this reservation ${item.reserve}`)
      if(response){
         console.log(item.reservNo)
         this.$store.dispatch("deleteReservation",item.reservNo)
      }
    },
    cancelEdit(){
      this.editForm = !this.editForm
    },
    editBtn(packageList,reservNo,reservationDetail){
      for(let i = 0; i<packageList.length;i++){
        this.selectedPackages.push(packageList[i].packageId)
      }
      this.editForm = !this.editForm
      this.reserveId = reservNo
      this.editId = reservationDetail
      this.oldPackages = packageList
      console.log('editButton')
      console.log(this.selectedPackages)
      console.log(this.reserveId)
      console.log(this.editId)
    },
     checkPackage(packageId) {
      let count = 0;
      let tempItem = null;
      for (let i = 0; i < this.selectedPackages.length; i++) {
        if (this.selectedPackages[i].packageId == packageId) {
          tempItem = this.selectedPackages[i];
          count++;
        }
      }
      if (count > 0) {
        if(!this.tempItemPackages.includes(tempItem)){
          console.log("temp item : "+tempItem);
          this.tempItemPackages.push(tempItem);
        }
        return true;
      } else{
        return false;
      }
    },
    comfirmEdit(){
      if(this.selectedPackages != null) {
        let btn = document.getElementsByClassName("showSelectedPackage");
        let hasChange = false;
        let changeOldPackages = [];
        let indexOfTrue = [];
        for (let zq = 0; zq < btn.length; zq++) {
          console.log(zq + " : " + btn.item(zq).checked);
          changeOldPackages.push(btn.item(zq).checked);
          if (btn.item(zq).checked == false) {
            hasChange = true;
          }
        }
      //   console.log('changeOldPackages '+changeOldPackages);
        if (hasChange == false) {
          if (this.selectedPackages.length == 0) {
              this.selectedPackages = [];
              console.log('old selected')
              console.log(this.selectedPackages)
              this.invalidPackage = false;
            } else {
              for (let i = 0; i < this.tempItemPackages.length; i++) {
                this.newSelectedPacakges.push(this.tempItemPackages[i]);
              }
              console.log('new selected')
              console.log(this.newSelectedPacakges)
              this.invalidPackage = false;
            }
          }
        else {
          /* check which one want */
          for (let e = 0; e < changeOldPackages.length; e++) {
            if (changeOldPackages[e] == true) {
              indexOfTrue.push(e);
            }
          }
      //     /* check that which item still remaining checked */
          console.log('changeOld '+changeOldPackages);
          console.log('indexOftrue '+ indexOfTrue);
      //     console.log(this.selectedPackages);
          if (indexOfTrue.length != 0) {
            /* set old color that was change */
            for (let i = 0; i < indexOfTrue.length; i++) {
              this.newSelectedPacakges.push(this.tempItemPackages[indexOfTrue[i]]);
            }
            console.log('oldSelected change ')
            console.log(this.newSelectedPacakges)
      //       this.invalidPackage = false;
          } else {
            if (this.selectedPackages.length == 0) {
              this.newSelectedPacakges = null
              return;
            } else {
              console.log("Lastest progress : " + this.newSelectedPacakges);
            }
          }
        }
      }
      this.createFormEditPackages(this.newSelectedPacakges)
    },
    createFormEditPackages(newPackages) {
      console.log('lastTest')
      console.log(newPackages)
      console.log(this.editId)
      console.log(this.reserveId)
      const json = JSON.stringify(newPackages);
      const blob = new Blob([json], {
        type: "application/json",
      });
      let formData = new FormData();
      console.log(json)
      formData.append("editPackage", blob);
      formData.append("reservNo", this.reserveId);
      formData.append("reservationDetailId", this.editId);
      this.$store.dispatch("editCustomerPackage",formData);
      location.reload();
    },
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
    store.dispatch("getPackages");
    let reservation = computed(function () {
      return store.state.reservation;
    });
    let packages = computed(function () {
      return store.state.package;
    });
    let userData = computed(function () {
      return store.state.user;
    });
    return {
      reservation,
      userData,
      packages
    };
  },
};
</script>
<style scoped>
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