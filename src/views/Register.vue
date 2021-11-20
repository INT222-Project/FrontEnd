<template>
  <div  class="register bg-blue-500 w-screen h-full">
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
        <form @submit.prevent="register">
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
            <!-- <i class="fas fa-eye"></i><i class="fas fa-eye-slash"></i> -->
            <div class="col-sm-12">
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                v-model="password"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputConfirmPassword" class="form-label"
              ><span class="font-bold">Password Confirm</span></label
            >
            <div class="col-sm-12">
              <input
                type="password"
                class="form-control"
                id="inputConfirmPassword"
                placeholder="Password Confirm"
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
// import axios from 'axios'
export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirm: "",
    };
  },
  methods: {
    register() {
      const data={
        first_name:this.first_name,
        last_name:this.last_name,
        email:this.email,
        username:this.username,
        password:this.username,
        password_confirm:this.password_confirm
      };
      console.log(data)
      // this.$store.dispatch('register',data).then(()=>this.$router.push('/')).catch(err=>console.log(err))
    },
  },
};
</script>
<style scoped>
.register .form-group {
  position: relative;
  margin-bottom: 30px;
}
.register .form-control {
  background-color: #ebecee;
  border-radius: 4px;
  border: none;
  height: 40px;
  -webkit-box-shadow: none;
  box-shadow: none;
  color: #3e485c;
  font-size: 14px;
}
span #eye{
  position: absolute;
  transform: translate(0);
}
</style>