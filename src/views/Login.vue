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
  <div v-if="this.$store.state.user == 0" class="login bg-blue-500 w-screen h-screen">
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

          <div v-if="this.showSuccess == true" class="alert alert-success" role="alert">
                 Login successfully!
                 {{this.message}}
          </div>
          <div v-if="this.showError == true" class="alert alert-danger
              d-flex
              align-items-center
              alert-dismissible
              fade
              show" 
              role="alert">
              <svg
              class="bi flex-shrink-0 me-2"
              width="24"
              height="24"
              role="img"
              aria-label="Danger:"
            >
              <use xlink:href="#exclamation-triangle-fill" />
            </svg>
            {{this.error}}
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
              <span class="input-group-text"
                ><i class="far fa-envelope"></i
              ></span>
            </div>
             <span v-if="this.invEmail" class="text-red-500 text-sm">
                    Please type your email
            </span>
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
                placeholder="password"
                id="inputPassword"
              />
              <span class="input-group-text"><i class="fas fa-lock"></i></span>
            </div>
            <span v-if="this.invEmail" class="text-red-500 text-sm">
                    Please type your password
            </span>
          </div>

          <div class="mb-3 row">
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
  <div v-if="this.$store.state.user != 0" class="flex justify-center p-24 bg-blue-500">
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
        <button class="btn btn-dark" @click="goHome()">Go Home</button>
        </div>
      </section>
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
      invEmail:false,
      invPassword:false,
      showError:false,
      error:null,
      message:null,
      showSuccess:false,
    };
  },
  methods: {
     goHome(){
       this.$router.push('/')
     },
     login() {
      this.invEmail = this.email === "" ? true:false; 
      this.invPassword = this.password === "" ? true:false;
      if (!this.invEmail && !this.invPassword) {
        const user = {
          email : this.email,
          password : this.password
        }
        this.$store.dispatch('auth/login',user).then(
          data=> {
            this.error = null;
            this.message = data.message;
            this.showError = false;
            this.showSuccess = true;
            this.$store.state.showLoading = true;
            setTimeout(()=> window.location.href='/',2000)
          },
          err => {
          this.showSuccess = false;
          this.message = null ;
          this.error = err.message
          this.showError = true;
          })
      }
    },
  }
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