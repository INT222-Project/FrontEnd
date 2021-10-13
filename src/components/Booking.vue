<template>
  <div class="w-auto h-full pt-4">
    <div id="booking" class="section">
      <div class="section-center">
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-md-push-5">
              <div class="booking-cta">
                <h1>Make your reservation</h1>
                <p>
                  From comfortable standard rooms to the hippest suites in the
                  heart of the city.
                </p>
              </div>
            </div>
            <div class="d-flex gap-4">
              <div class="col-md-7 col-md-pull-6">
                <div class="booking-form">
                  <h4 class="form-label">Please Type Your Information</h4>
                  <form class="pt-4">
                    <div class="form-group">
                      <span class="form-label">Your Name</span>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Please Type Your Name"
                      />
                    </div>
                    <div class="form-group">
                      <span class="form-label">Your Email</span>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Please Check Your Email Carefully"
                      />
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <span class="form-label">Check In</span>
                          <input class="form-control" type="date" required />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <span class="form-label">Check out</span>
                          <input class="form-control" type="date" required />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-4">
                        <div class="form-group">
                          <span class="form-label">Rooms</span>
                          <select class="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                          </select>
                          <span class="select-arrow"></span>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group">
                          <span class="form-label">Adults</span>
                          <select class="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                          </select>
                          <span class="select-arrow"></span>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group">
                          <span class="form-label">Children</span>
                          <select class="form-control">
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                          </select>
                          <span class="select-arrow"></span>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <span class="form-label">Packages (extra charge)</span>
                      <div
                        class="form-check col-sm-6"
                        v-for="p in packages"
                        :key="p.packageId"
                      >
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :value="v"
                        />
                        <label class="form-check-label">
                          {{ p.name }}
                        </label>
                      </div>
                    </div>
                    <div class="form-btn">
                      <button class="submit-btn">Check Out</button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-md-5 md-4">
                <div class="booking-form">
                  <div class="form-group">
					<div><span class="form-label">Room Charge (1 Room)</span> 1500</div>
					<div><span class="form-label">Package price</span> 1500</div>
                    <div><span class="form-label">Sub total</span> ฿5000</div>
                  </div>
                </div>
              </div>
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
      selectedPackages: [],
    };
  },
  methods: {},
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
.section {
  position: relative;
  height: 120vh;
}

.section .section-center {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}

#booking {
  font-family: "Montserrat", sans-serif;
  background-image: url("../assets/img/background.jpg");
  background-size: cover;
  background-position: center;
}

#booking::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(47, 103, 177, 0.6);
}

.booking-form {
  background-color: #fff;
  padding: 50px 20px;
  -webkit-box-shadow: 0px 5px 20px -5px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 5px 20px -5px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
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
</style>