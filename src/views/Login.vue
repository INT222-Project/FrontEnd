<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
    <symbol
      id="exclamation-triangle-fill"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
      />
    </symbol>
  </svg>
  <div id="Login" class="bg-blue-500 w-screen h-screen">
    <form @submit.prevent="handleSubmit()">
      <div class="flex justify-center p-24">
        <div
          class="
            w-full
            md:w-2/4
            bg-white
            p-10
            shadow-md
            rounded-lg
            tracking-wide
            shadow-lg
          "
        >
          <div class="flex justify-center mb-3">
            <h1>Sign in to Booking.com</h1>
          </div>

          <div
            v-if="authen"
            class="
              alert alert-danger
              d-flex
              align-items-center
              alert-dismissible
              fade
              show
            "
            role="alert"
          >
            <svg
              class="bi flex-shrink-0 me-2"
              width="24"
              height="24"
              role="img"
              aria-label="Danger:"
            >
              <use xlink:href="#exclamation-triangle-fill" />
            </svg>
            <div>Incorrect username or password.</div>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              ><span class="font-bold">Email</span></label
            >
            <input
              type="email"
              class="form-control"
              v-model="email"
              id="inputUsername"
              placeholder="name@example.com"
            />
          </div>
          <div class="mb-3 row">
            <label for="inputPassword" class="form-label"
              ><span class="font-bold">Password</span></label
            >
            <div class="col-sm-12">
              <input
                type="password"
                class="form-control"
                v-model="password"
                id="inputPassword"
                placeholder="Password"
              />
            </div>
          </div>
          <div class="mb-2 row">
            <button class="btn btn-primary btn-block mb-2">Login</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      authen: false,
    };
  },
  methods: {
    // handleSubmit(){
    //   this.authen = this.authen === "" ? true : false;
    // }
    async handleSubmit() {
      if (this.email == "" || this.password == "") {
        this.authen = true;
      }
      const response = await axios.post("login", {
        username: this.username,
        password: this.password,
      });
      console.log(response);
    },
  },
};
</script>>