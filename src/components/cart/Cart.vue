<template>
  <div class="container pt-14">
    <div class="container-fluid h-screen mt-100">
      <div class="col-md-12">
        <div v-if="$store.state.cartItemCount == 0" class="card">
          <div class="card-header">
            <h5>Cart</h5>
          </div>
          <div class="card-body cart">
            <div class="col-sm-12 text-center">
              <div class="d-flex justify-center">
                <img
                  src="https://i.imgur.com/dCdflKN.png"
                  width="130"
                  height="130"
                  class="mb-4 mr-3"
                />
              </div>
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

      <div v-if="$store.state.cartItemCount > 0" class="col-md-16">
        <div class="card">
          <div class="card-header">
            <h5 class="font-bold blue">
              Your Cart : {{ $store.state.cartItemCount }} | Total (฿) : ฿
              {{ total.toLocaleString() }}
            </h5>
          </div>
          <div class="card-body cart">
            <table class="table table-responsive table-bordered">
              <thead class="">
                <tr>
                  <th scope="col" width="15%">Roomtype</th>
                  <th scope="col" width="15%">Bedtype</th>
                  <th scope="col" width="15%">Roomcharge</th>
                  <th scope="col" width="15%">Guest</th>
                  <th scope="col" width="15%">Check in</th>
                  <th scope="col" width="15%">Check out</th>
                  <th scope="col" width="15%">Packages</th>
                  <th scope="col" width="15%">Delete</th>
                </tr>
              </thead>
              <tbody class="">
                <tr v-for="item in items" :key="item.roomId">
                  <td>{{ item.room.roomType.name }}</td>
                  <td>{{ item.room.bedType }}</td>
                  <td>{{ item.subtotal }}</td>
                  <td>{{ item.numOfRest }}</td>
                  <td>{{ item.checkInDate }}</td>
                  <td>{{ item.checkOutDate }}</td>
                  <td>
                    <button v-if="item.packages.length > 0" class="btn btn-success"  @click="getListPackage(item.packages)"  
                    data-bs-toggle="modal" data-bs-target="#packages">
                      Details
                    </button>
                    <span v-if="item.packages.length == 0">
                      No Packages
                    </span>
                  </td>
                  <td>
                    <button @click="removeItem(item)" class="btn btn-danger">
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer">
            <div class="col-sm-4">
              <div class="form-group">
                <div class="mb-2">
                  <span class="form-label font-bold">Payment</span>
                </div>
                <div
                  v-for="item in payment"
                  :key="item.paymentMethodId"
                  class="form-check"
                >
                  <input
                    class="form-check-input"
                    v-model="paymentMethod"
                    :value="item"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    {{ item.paymentMethodName }}
                  </label>
                </div>
                <span class="select-arrow"></span>
                <div v-if="this.invPaymentMethod" class="text-red-500 text-sm">
                  Please select PaymentMethod.
                </div>
              </div>
            </div>
            <hr />
            <button
              @click="backToHome()"
              class="btn btn-secondary cart-btn-transform m-3"
              data-abc="true"
            >
              continue booking
            </button>
            <button
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              continue to confirm
            </button>
          </div>
        </div>
      </div>
      <!-- Button trigger modal -->
      <!-- Modal -->
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content text-center">
            <div p v-if="paymentMethod == null" class="modal-body">
              <div class="d-flex justify-center">
                <img
                  src="https://i.imgur.com/dCdflKN.png"
                  width="130"
                  height="130"
                  class="mb-4 mr-3"
                />
              </div>
              <h1>Please select a payment method.</h1>
            </div>
            <div p v-if="paymentMethod != null" class="modal-body">
              <div class="d-flex justify-center">
                <img
                  src="https://i.imgur.com/dCdflKN.png"
                  width="130"
                  height="130"
                  class="mb-4 mr-3"
                />
              </div>
              <h1>Are You Sure ?</h1>
              <p>
                The total amount is
                <span class="font-bold">฿{{ total }}</span> and you choose to
                pay with
                <span class="font-bold">{{
                  paymentMethod.paymentMethodName
                }}</span>
                Do you want to continue?
              </p>
            </div>
            <div class="modal-footer bg-blue-600">
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
                @click="checkOut()"
              >
                Yes
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
      class="modal fade"
      id="packages"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="checkoutLabel"
      aria-hidden="true"
    >
      <div
        class="
          modal-dialog modal-dialog-scrollable modal-md modal-dialog-centered
        "
      >
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title text-white" id="checkoutLabel">
              Package Details
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row p-4" v-for="p in packageStatus" :key="p.packageId">
                <p>{{p.name}} ฿{{p.packageCharge}}</p>
                <span>Description:</span>
                <p>{{p.description}}</p>
              </div>
            </div>
          </div>
          <div class="modal-footer bg-success">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Close
            </button>
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
      paymentMethod: null,
      invPaymentMethod: false,
      isShowpackage: false,
      packageStatus: null,
    };
  },
  methods: {
    getListPackage(item) {
      this.packageStatus = item;
    },
    removeItem(item) {
      this.$store.dispatch("removeCartItem", item);
    },
    checkOut() {
      console.log(this.paymentMethod);
      this.invPaymentMethod = this.paymentMethod === null ? true : false;
      if (!this.invPaymentMethod) {
        if (this.$store.state.cartItemCount > 0) {
          const booking = {
            reservationRequirements: this.items,
            paymentMethod: this.paymentMethod,
          };
          this.createFormData(booking);
        }
      }
    },
    createFormData(booking) {
      this.invPaymentMethod = this.paymentMethod === null ? true : false;
      if (!this.invPaymentMethod) {
        const jsonNewRoom = JSON.stringify(booking);
        const blob = new Blob([jsonNewRoom], {
          type: "application/json",
        });
        console.log(booking)
        let formData = new FormData();
        formData.append("newReservation", blob);
        this.$store.dispatch("addReservation", formData);
      }
      this.$store.dispatch("clearItemInCart");
    },
    backToHome() {
      this.$router.push("/");
    },
  },
  computed: {
    total() {
      let total = 0;
      for (let i = 0; i < this.items.length; i++) {
        total += this.items[i].subtotal;
      }
      return total.toLocaleString();
    },
  },
  setup() {
    const store = useStore();
    store.dispatch("getPackages");
    store.dispatch("getPaymentMethods");
    let payment = computed(function () {
      return store.state.payment;
    });
    let packages = computed(function () {
      return store.state.package;
    });
    return {
      payment,
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
.blue {
  color: #0000ff;
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