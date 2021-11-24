<template>
  <div class="register bg-blue-500 w-screen h-full ">
    <div v-if="this.$store.state.user == 0" class="flex justify-center p-24">
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
        ">
        <form @submit.prevent="register()">
          <div class="flex justify-center"><h1>Sign up</h1></div>
          <div class="mb-3 row">
            <div class="col-sm-6">
            <label for="exampleFormControlInput1" class="form-label"><span class="font-bold">Email address</span></label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              title="name@example.com"
              v-model.trim="email"
              required/>
            <span v-if="this.invEmail" class="text-red-500 text-sm">
                    Please type email
            </span>
            </div>
            <div class="col-sm-6">
              <!-- pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" -->
                <!-- title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"  -->
            <label for="inputPassword" class="form-label"><span class="font-bold">Password</span></label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
          
                required
                v-model.trim="password"/>
             <span v-if="this.invPassword" class="text-red-500 text-sm">
                    Please type password
            </span>
          </div>
          </div>
          <div class="mb-3 row">
            <div class="col-sm-6">
            <label for="exampleFormControlInput1" class="form-label"><span class="font-bold">First Name</span></label>
            <input
              type="text"
              class="form-control"
              id="inputFirstname"
              placeholder="First Name"
              v-model.trim="fname"
            />
            <span v-if="this.invFname" class="text-red-500 text-sm">
                    Please type firstname
            </span>
            </div>
            
            <div class="col-sm-6">
            <label for="exampleFormControlInput1" class="form-label"><span class="font-bold">Last Name</span></label>
            <input
              type="text"
              class="form-control"
              id="inputLastname"
              placeholder="Last Name"
              v-model.trim="lname"
            />
            <span v-if="this.invLname" class="text-red-500 text-sm">
                    Please type lastname
            </span>
          </div>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"><span class="font-bold">Telephone</span></label>
            <input
              type="number"
              class="form-control"
              placeholder="123-456-7891" 
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              v-model.trim="telNo"
            />
            <span v-if="this.invTelno" class="text-red-500 text-sm">
                    Please type telephone
            </span>
          </div>
          <div class="mb-3 row">
            <label for="inputConfirmPassword" class="form-label"><span class="font-bold">Address</span></label>
            <div class="col-sm-12">
              <input
              type="text"
              class="form-control"
              placeholder="address"
              v-model="address"
            />
            <span v-if="this.invAddress" class="text-red-500 text-sm">
                    Please type address
            </span>
            </div>
          </div>
          <div class="mb-2 row">
            <div class="col-sm-12 space-x-2">
            <button class="btn btn-primary btn-block mb-2">Sign up</button>
            <button class="btn btn-danger btn-block mb-2" @click="cancel()">Cancel</button>
            </div>
          </div>
          </form>
      </div>
    </div>
    <div v-if="this.$store.state.user != 0" class="flex justify-center p-24">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      customerId:"",
      fname: "",
      lname: "",
      email: "",
      password: "",
      telNo: "",
      address: "",
      invFname:false,
      invLname:false,
      invEmail:false,
      invPassword:false,
      invTelno:false,
      invAddress:false,
    };
  },
  methods: {
    cancel(){
      this.customerId = ""
      this.fname = ""
      this.lname = ""
      this.email = ""
      this.password = ""
      this.telNo = ""
      this.address = ""
      this.$router.push('/login')
    },
    goHome(){
      this.$router.push('/')
    },
    register() {
      this.invFname = this.fname === "" ? true:false; 
      this.invLname = this.lname === "" ? true:false; 
      this.invEmail = this.email === "" ? true:false; 
      this.invPassword = this.password === "" ? true:false;
      this.invTelno = this.telNo === "" ? true:false;
      this.invAddress = this.address === "" ? true:false;
      if(!this.invFname && !this.invLname && !this.invEmail && !this.invPassword && !this.invTelno && !this.invAddress){
       const data = {
        fname: this.fname,
        lname: this.lname,
        email: this.email,
        password: this.password,
        telNo: this.telNo,
        address: this.address,
      };
      console.log(data);
      this.createFormdata(data);
      }
    },
    createFormdata(obj){
      console.log(obj)
     const json = JSON.stringify(obj);
      const blob = new Blob([json], {
        type: "application/json",
      });
      let formData = new FormData();
      formData.append("newUser", blob);
      // this.$store.state.showLoading = true;
      setTimeout(()=>{this.$store.dispatch("auth/register", formData).then(()=>{window.location.href='/login'},2000)})
    }
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