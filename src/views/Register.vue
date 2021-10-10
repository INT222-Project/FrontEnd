<template>
  <div id="Login" class="bg-blue-500 w-screen h-full">
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
        <form @submit.prevent="handleSubmit">
          <div class="flex justify-center"><h1>Sign up</h1></div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              ><span class="font-bold">First Name</span></label
            >
            <input
              type="text"
              class="form-control"
              id="inputFirstname"
              placeholder="First Name"
              v-model="first_name"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              ><span class="font-bold">Last Name</span></label
            >
            <input
              type="text"
              class="form-control"
              id="inputLastname"
              placeholder="Last Name"
              v-model="last_name"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              ><span class="font-bold">Email address</span></label
            >
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              v-model="email"
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
                id="inputPassword"
                placeholder="Password"
                v-model="password"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputConfirmPassword" class="form-label"
              ><span class="font-bold">Confirm Password</span></label
            >
            <div class="col-sm-12">
              <input
                type="password"
                class="form-control"
                id="inputConfirmPassword"
                placeholder="Confirm Password"
                v-model="password_confirm"
              />
            </div>
          </div>
          <div class="mb-2 row">
            <button class="btn btn-primary btn-block mb-2">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "Signup.vue",
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      password_confirm: "",
    };
  },
  methods: {
    handleSubmit() {
      const data={
        first_name:this.first_name,
        last_name:this.last_name,
        email:this.email,
        username:this.username,
        password:this.username,
        password_confirm:this.password_confirm
      };
      axios.post('http://localhost:8001/signup',data)
        .then(
          res => {
            console.log(res)
          }
        ).catch(
          err=>{
            console.log(err)
          }
        )
      console.log(data);
    },
  },
};
</script>