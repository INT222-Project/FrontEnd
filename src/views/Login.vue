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
  <div class="login bg-blue-500 w-screen h-screen">
    <form @submit.prevent="login()">
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
            <h1>Sign in</h1>
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
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              ><span class="font-bold">Email Address</span></label
            >
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                v-model.trim="email"
                id="inputUsername"
                placeholder="name@example.com"
              />
              <div class="error" v-if="errors.email">{{errors.email}}</div>
              <span class="input-group-text"
                ><i class="far fa-envelope"></i
              ></span>
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputPassword" class="form-label"
              ><span class="font-bold">Password</span></label
            >
            <div class="input-group">
              <input
                type="password"
                class="form-control"
                v-model.trim="password"
                id="inputPassword"
              />
              <div class="error" v-if="errors.password">{{errors.password}}</div>
              <span class="input-group-text"><i class="fas fa-lock"></i></span>
            </div>
          </div>

          <div class="mb-2 row">
            <button class="btn btn-primary btn-block mb-2">Login</button>
          </div>
          <div class="text-center">
            <p>
              <router-link to="/register">Create an account</router-link> to use
              bbooking for free
            </p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
// import { computed } from "vue";
// import { useStore } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("data")) || null,
      email: "",
      password: "",
      errors:[],
      authen: false,
    };
  },
  methods: {
     login() {
      if (this.email == "" || this.password == "") {
        this.authen = true;
      }else {
        const user = {
          email : this.email,
          password : this.password
        }
        this.$store.state.showLoading = true;
        setTimeout(()=>{this.$store.dispatch('auth/login',user).then(()=>{
        window.location.href='/'},2000)
      }).catch(err=>{console.log(err)
        this.authen = true
       })
      }
    }
  },
  //  setup() {
  //   const store = useStore();
  //   store.dispatch("getAllCustomer");
  //   let users = computed(function () {
  //     return store.state.users;
  //   });
  //   return {
  //       users
  //   }
  //  }
};
</script>
<style scoped>
.login .form-group {
  position: relative;
  /* margin-bottom: 30px; */
}
.login .form-control {
  background-color: #ebecee;
  border-radius: 4px;
  border: none;
  height: 40px;
  -webkit-box-shadow: none;
  box-shadow: none;
  color: #3e485c;
  font-size: 14px;
}
</style>