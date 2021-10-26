<template>
  <div class="container pt-14">
    <div class="container-fluid mt-100">
      <div class="row">
        <div class="col-md-12">
          <div v-if="$store.state.cartItemCount == 0" class="card">
            <div class="card-header">
              <h5>Cart</h5>
            </div>
            <div class="card-body cart">
              <div class="col-sm-12 text-center">
                <div class="d-flex justify-center"><img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" class="mb-4 mr-3" /></div>
                <h3><strong>Your Cart is Empty</strong></h3>
                <h4>Add something to make me happy :)</h4>
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
        <div v-if="$store.state.cartItemCount > 0" class="col-md-12">
          <div class="card">
          <div class="card-header">
            <h5>My Cart : {{$store.state.cartItemCount}} | Total Charge : {{total}}  </h5>
          </div>
          <div class="card-body cart">
            <div v-for="item in items" :key="item.roomId" class="col-sm-12">
                <div class="mt-4 mb-4 d-flex justify-content-between">
                  {{item.room.roomType.name}} | {{item.room.bedType}} | 
                  <div>Packages:<div v-for="p in item.packages" :key="p.packageId">{{p.name}}</div></div>
                  | ฿ {{item.subtotal}} 
                  <span class="float-right"><button @click="removeItem(item)">x</button></span>
                </div>
                  <!-- {{item}} -->
                   <!-- "this.$store.commit('removeItem',item) -->
            </div>
          </div>
           <div class="card-footer">
             <button @click="backToHome()"
                  class="btn btn-secondary cart-btn-transform m-3"
                  data-abc="true"
                >
                  continue booking
                </button>
                <button class="btn btn-primary" @click="checkOut()">check out</button>
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
      checkEmpty: this.$store.state.cartItemCount,
      items: this.$store.state.cartItems,
    };
  },
  methods: {
    removeItem(item) {
      this.$store.dispatch("removeCartItem", item);
    },
    checkOut(){
      this.createFormData(this.items);
      console.log("test")
    },
    createFormData(items) {
      const jsonNewRoom = JSON.stringify(items);
      const blob = new Blob([jsonNewRoom], {
        type: "application/json",
      });
      let formData = new FormData();
      formData.append("newReservation", blob);
      this.$store.dispatch("addReservation", formData);
    },
    backToHome(){
      this.$router.push("/");
    }
  },
  computed: {
    total(){
      let total = 0;
      for (let i = 0; i < this.items.length; i++) {
        total += this.items[i].subtotal;
      }
      return total
    }
  },
  setup() {
    const store = useStore();
    store.dispatch("getPackages");
    let packages = computed(function () {
      return store.state.package;
    });
    return {
      packages,
    };
  },
};
</script>
<style scoped>
body {
  background-color: #eee;
  font-family: "Calibri", sans-serif !important;
}

.mt-100 {
  margin-top: 100px;
}

.card {
  margin-bottom: 30px;
  border: 0;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  border-radius: 8px;
  -webkit-box-shadow: 1px 5px 24px 0 rgba(68, 102, 242, 0.05);
  box-shadow: 1px 5px 24px 0 rgba(68, 102, 242, 0.05);
}

.card .card-header {
  background-color: #fff;
  border-bottom: none;
  padding: 24px;
  border-bottom: 2px solid #d3d3d3;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.card .card-footer {
  background-color: #fff;
  border-bottom: none;
  padding: 24px;
  border-bottom: 3px solid #d3d3d3;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.card-header:first-child {
  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
}

.card .card-body {
  padding: 30px;
  background-color: transparent;
}

.btn-primary,
.btn-primary.disabled,
.btn-primary:disabled {
  background-color: #4466f2 !important;
  border-color: #4466f2 !important;
}
</style>