<template>
  <div class="container pt-14 ">
    <div class="row">
      <div class="col-md-8 mb-3">
        <h1>this cart is empty you can go to homepage and view rooms</h1>
        <div class="card p-3">
          <div v-for="item in itemInCart" :key="item.roomId"> 
          {{item.roomType.name}} | {{item.bedType}}
              <button @click="removeItem(item.roomId)" class="btn btn-primary p-2">Remove</button>
                <hr/> 
           </div>
        </div>
      </div>
    </div>
    <button class="btn btn-success p-2">Check out</button>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    removeItem(roomId){
      this.$store.dispatch("removeCartItem",roomId)
    }
  },
  computed: {
    itemInCart() {
      return this.$store.state.cartItems;
    },
    count(){
      return this.$store.state.cartItemCount;
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
.booking-form {
  /* background-color: #fff; */
  padding: 50px 20px;
  /* -webkit-box-shadow: 0px 5px 20px -5px rgba(0, 0, 0, 0.3); */
  /* box-shadow: 0px 5px 20px -5px rgba(0, 0, 0, 0.3); */
  /* border-radius: 4px; */
}

.booking-form .form-group {
  position: relative;
  margin-bottom: 30px;
}

.booking-form .form-control {
  background-color: #ebecee;
  border-radius: 4px;
  border: none;
  height: 40px;
  -webkit-box-shadow: none;
  box-shadow: none;
  color: #3e485c;
  font-size: 14px;
}

.booking-form .form-control::-webkit-input-placeholder {
  color: rgba(62, 72, 92, 0.3);
}

.booking-form .form-control:-ms-input-placeholder {
  color: rgba(62, 72, 92, 0.3);
}

.booking-form .form-control::placeholder {
  color: rgba(62, 72, 92, 0.3);
}

.booking-form input[type="date"].form-control:invalid {
  color: rgba(62, 72, 92, 0.3);
}

.booking-form select.form-control {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.booking-form select.form-control + .select-arrow {
  position: absolute;
  right: 0px;
  bottom: 4px;
  width: 32px;
  line-height: 32px;
  height: 32px;
  text-align: center;
  pointer-events: none;
  color: rgba(62, 72, 92, 0.3);
  font-size: 14px;
}

.booking-form select.form-control + .select-arrow:after {
  content: "\279C";
  display: block;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.booking-form .form-label {
  display: inline-block;
  color: #3e485c;
  font-weight: 700;
  margin-bottom: 6px;
  margin-left: 7px;
}

.booking-form .submit-btn {
  display: inline-block;
  color: #fff;
  background-color: #1e62d8;
  font-weight: 700;
  padding: 14px 30px;
  border-radius: 4px;
  border: none;
  -webkit-transition: 0.2s all;
  transition: 0.2s all;
}

.booking-form .submit-btn:hover,
.booking-form .submit-btn:focus {
  opacity: 0.9;
}

.booking-cta {
  margin-top: 80px;
  margin-bottom: 30px;
}

.booking-cta h1 {
  font-size: 52px;
  text-transform: uppercase;
  color: #fff;
  font-weight: 700;
}

.booking-cta p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
}
.card {
  border: none;
}

/* .form-control {
    border-bottom: 2px solid #eee !important;
    border: none;
    font-weight: 600
}

.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #8bbafe;
    outline: 0;
    box-shadow: none;
    border-radius: 0px;
    border-bottom: 2px solid blue !important
}

.inputbox {
    position: relative;
    margin-bottom: 20px;
    width: 100%
}

.inputbox span {
    position: absolute;
    top: 7px;
    left: 11px;
    transition: 0.5s
}

.inputbox i {
    position: absolute;
    top: 13px;
    right: 8px;
    transition: 0.5s;
    color: #3F51B5
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0
}

.inputbox input:focus~span {
    transform: translateX(-0px) translateY(-15px);
    font-size: 12px
}

.inputbox input:valid~span {
    transform: translateX(-0px) translateY(-15px);
    font-size: 12px
} */

.card-blue {
  background-color: #492bc4;
}

.hightlight {
  background-color: #5737d9;
  padding: 10px;
  border-radius: 10px;
  margin-top: 15px;
  font-size: 14px;
}

.yellow {
  color: #fdcc49;
}

.decoration {
  text-decoration: none;
  font-size: 14px;
}

.btn-success {
  color: #fff;
  background-color: #492bc4;
  border-color: #492bc4;
}

.btn-success:hover {
  color: #fff;
  background-color: #492bc4;
  border-color: #492bc4;
}

.decoration:hover {
  text-decoration: none;
  color: #fdcc49;
}
</style>