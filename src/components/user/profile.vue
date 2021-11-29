<template>
  <div class="container pt-24">
    <div class="container">
      <div class="main-body">
        <div class="row gutters-sm">
          <div class="col-md-4 mb-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                  <img v-if="this.userData.role[0].authority === 'customer'" :src="viewImg(this.userData.authenticationUser.customerId)" class="rounded-circle" width="150"/>
                  <img v-if="this.userData.role[0].authority === 'receptionist'" :src="viewImg(this.userData.authenticationUser.repId)" class="rounded-circle" width="150"/>
                  <div v-if="this.userData != 0" class="mt-3">
                    <h4 v-if="this.userData.role[0].authority === 'customer'">
                      {{ this.customer.fname }}
                      {{ this.customer.lname }}
                    </h4>
                    <h4 v-if="this.userData.role[0].authority === 'receptionist'">
                      {{ this.receptionist.fName }}
                      {{ this.receptionist.lName }}
                    </h4>
                    <p class="text-secondary mb-1">
                      {{ this.userData.role[0].authority }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="profile col-md-8">
            <div class="card mb-3">
              <div class="card-body">
                <div v-if="this.editForm == false" class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">First Name</h6>
                  </div>
                  <div v-if="this.userData != 0" class="col-sm-9 text-secondary">
                    <span v-if="this.userData.role[0].authority === 'customer'">{{ this.customer.fname }}</span>
                    <span v-if="this.userData.role[0].authority === 'receptionist'">{{ this.receptionist.fName }}</span>
                  </div>
                </div>
                <form @submit.prevent="editSubmit()"> 
                <div v-if="this.editForm == true" class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">First Name</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                      <input
                        type="text"
                        v-model="this.fname"
                        class="form-control"/>
                  </div>
                    <span v-if="this.invFname" class="text-red-500 text-sm">
                       Please type your first name
                    </span>
                </div>
                <hr />
                <div v-if="this.editForm == false" class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Last Name</h6>
                  </div>
                  <div v-if="this.userData != 0" class="col-sm-9 text-secondary">
                    <span
                      v-if="this.userData.role[0].authority === 'customer'"
                      >{{ this.customer.lname }}</span>
                    <span
                      v-if="this.userData.role[0].authority === 'receptionist'">
                      {{ this.receptionist.lName }}</span>
                  </div>
                </div>
                <div v-if="this.editForm == true" class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Last Name</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <input
                      type="text"
                      v-model="this.lname"
                      class="form-control"
                    />
                  </div>
                  <span v-if="this.invLname" class="text-red-500 text-sm">
                       Please type your last name
                  </span>
                </div>
                <hr />
                <div v-if="this.editForm == false" class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Email</h6>
                  </div>
                  <div v-if="this.userData != 0" class="col-sm-9 text-secondary">
                    <span
                      v-if="this.userData.role[0].authority === 'customer'"
                      >{{ this.customer.email }}</span>
                    <span
                      v-if="this.userData.role[0].authority === 'receptionist'">
                      {{ this.receptionist.email }}</span>
                  </div>
                </div>
                <div v-if="this.editForm == true" class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Email</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <input
                      type="text"
                      v-model="this.email"
                      class="form-control"
                    />
                  </div>
                  <span v-if="this.invEmail" class="text-red-500 text-sm">
                       Please type your email
                  </span>
                </div>
                <hr />
                <div v-if="this.editForm == false" class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Password</h6>
                  </div>
                  <div v-if="this.userData != 0" class="col-sm-9 text-secondary">
                    <span
                      v-if="this.userData.role[0].authority === 'customer'">*********</span>
                    <span
                      v-if="this.userData.role[0].authority === 'receptionist'">*********</span>
                  </div>
                </div>
                <div v-if="this.editForm == true" class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Password</h6>
                  </div>
                  <div v-if="this.userData != 0" class="col-sm-9 text-secondary">
                    <input
                      type="text"
                      v-model="this.password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" 
                      class="form-control"/>
                  </div>
                  <span v-if="this.invPassword" class="text-red-500 text-sm">
                       Please type password cant be null
                  </span>
                </div>
                <hr />
                <div v-if="this.editForm == false" class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Phone</h6>
                  </div>
                  <div v-if="this.userData != 0" class="col-sm-9 text-secondary">
                    <span
                      v-if="this.userData.role[0].authority === 'customer'"
                      >{{ this.customer.telNo }}</span>
                    <span
                      v-if="this.userData.role[0].authority === 'receptionist'">
                      {{ this.receptionist.telNo }}</span>
                  </div>
                </div>
                <div v-if="this.editForm == true" class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Phone</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <input
                      type="text"
                      v-model="this.telNo"
                      class="form-control"/>
                  </div>
                  <span v-if="this.invTelno" class="text-red-500 text-sm">
                       Please type your phone number 
                  </span>
                </div>
                <hr />
                <div v-if="this.editForm == false" class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Address</h6>
                  </div>
                  <div v-if="this.userData != 0" class="col-sm-9 text-secondary">
                    <span
                      v-if="this.userData.role[0].authority === 'customer'">{{ this.customer.address }}</span>
                    <span
                      v-if="this.userData.role[0].authority === 'receptionist'">{{ this.receptionist.address }}</span>
                  </div>
                </div>
                <div v-if="this.editForm == true" class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Address</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <input
                      type="text"
                      v-model="this.address"
                      class="form-control"
                    />
                  </div>
                  <span v-if="this.invAddress" class="text-red-500 text-sm">
                       Please type address
                  </span>
                </div>
                <hr />
                <div v-if="this.editForm == true" class="custom-file row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Choose Image</h6>
                  </div>
                    <div class="col-sm-9 text-secondary">
                      <img class="rounded mx-auto d-block" v-if="imgSrc" :src="imgSrc" width="150"/>
                      <input type="file" class="form-control" id="customFile" @change="openFile"/>
                  </div>
                </div>
                <div v-if="this.editForm == false" class="row">
                  <div class="col-sm-12">
                    <button class="btn btn-primary" @click="editBtn()">
                      Edit Profile
                    </button>
                  </div>
                </div>
                <div v-if="this.editForm == true" class="row">
                  <div class="col-sm-12 space-x-2">
                    <button class="btn btn-success">
                      Confirm
                    </button>
                    <button class="btn btn-danger" @click="cancel()">
                      Cancel
                    </button>
                  </div>
                </div>
                </form>
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
      editForm: false,
      id: "",
      fname: "",
      lname: "",
      telNo: "",
      address: "",
      password: "",
      invFname:false,
      invLname:false,
      invEmail:false,
      invPassword:false,
      invTelno:false,
      invAddress:false,
      imgSrc: null,
      imgObject: null,
    };
  },
  methods: {
    openFile(ev) {
      const file = ev.target.files[0];
      this.imgSrc = URL.createObjectURL(file);
      this.imgObject = file;
    },
     viewImg(id) {
      if (this.userData.role[0].authority == "receptionist") {
        // console.log(this.$store.state.url + "/api/receptionists/showImage/" + id)
        return this.$store.state.url + "/api/receptionists/showImage/" + id;
      } else if (this.userData.role[0].authority == "customer") {
        // console.log(this.$store.state.url + "/api/customers/showImage/" + id)
        return this.$store.state.url + "/api/customers/showImage/" + id;
      }
    },
    cancel() {
      this.id = "";
      this.email = "";
      this.fname = "";
      this.lname = "";
      this.telNo = "";
      this.address = "";
      this.password = "";
      this.editForm = !this.editForm;
    },
    editBtn() {
      if (this.userData.role[0].authority == "receptionist") {
        this.id = this.receptionist.repId;
        this.email = this.receptionist.email;
        this.fname = this.receptionist.fName;
        this.lname = this.receptionist.lName;
        this.telNo = this.receptionist.telNo;
        this.address = this.receptionist.address;
        this.password = this.receptionist.password;
        this.imgSrc = this.$store.state.url +"/api/receptionists/showImage/"+ this.receptionist.repId 
        this.editForm = !this.editForm;
      } else if (this.userData.role[0].authority == "customer") {
        this.id = this.customer.customerId;
        this.email = this.customer.email;
        this.fname = this.customer.fname;
        this.lname = this.customer.lname;
        this.telNo = this.customer.telNo;
        this.address = this.customer.address;
        this.password = this.customer.password;
        this.imgSrc = this.$store.state.url +"/api/customers/showImage/"+ this.receptionist.repId 
        this.editForm = !this.editForm;
      }
      // console.log(this.id, this.fname, this.lname, this.telNo, this.password);
    },
    editSubmit(){
      this.invFname = this.fname === "" ? true:false; 
      this.invLname = this.lname === "" ? true:false; 
      this.invEmail = this.email === "" ? true:false; 
      this.invPassword = this.password === "" ? true:false;
      this.invTelno = this.telNo === "" ? true:false;
      this.invAddress = this.address === "" ? true:false;
      if(!this.invFname && !this.invLname && !this.invEmail && !this.invPassword && !this.invAddress && !this.invTelno){
      if (this.imgSrc == this.$store.state.url +"/api/customers/showImage/"+ this.receptionist.repId || this.imgSrc == this.$store.state.url +"/api/customers/showImage/"+ this.customer.customerId ) {
          this.imgSrc = null;
          this.imgObject = null;
        }
      if(this.userData.role[0].authority == "customer"){
        const obj = {
            customerId : this.id,
            email : this.email,
            password : this.password,
            fname : this.fname,
            lname : this.lname,
            telNo : this.telNo,
            address : this.address,
            src: this.imgSrc,
            imgObject: this.imgObject,
        }
        this.createEditCustomerProfile(obj)
      }else if(this.userData.role[0].authority == "receptionist"){
        const obj = {
            repId : this.id,
            email : this.email,
            password : this.password,
            fName : this.fname,
            lName : this.lname,
            telNo : this.telNo,
            address : this.address,
            src: this.imgSrc,
            imgObject: this.imgObject,
        }
        this.createEditReceptionistProfile(obj)
      }
      }
    },
    createEditCustomerProfile(obj){
      // console.log(obj)
      const data = {
            customerId : obj.customerId,
            email : obj.email,
            password : obj.password,
            fname : obj.fname,
            lname : obj.lname,
            telNo : obj.telNo,
            address : obj.address,
            src: obj.src,
        }
     const jsonEditProfile = JSON.stringify(data);
      const blob = new Blob([jsonEditProfile], {
        type: "application/json",
      });
      let formData = new FormData();
       if(obj.imgObject != null) {
          formData.append("image-file", obj.imgObject, obj.imgObject.name);
          formData.append("editCustomer", blob);
       }else{
         formData.append("editCustomer", blob);
       }
      this.$store.dispatch("editCustomer",formData);
      this.editForm = !this.editForm
      // location.reload()
    },
    createEditReceptionistProfile(obj){
      //  console.log(obj)
      const data = {
            repId : obj.repId,
            email : obj.email,
            password : obj.password,
            fName : obj.fName,
            lName : obj.lName,
            telNo : obj.telNo,
            address : obj.address,
            src: obj.imgSrc,
        }
     const jsonEditProfile = JSON.stringify(data);
      const blob = new Blob([jsonEditProfile], {
        type: "application/json",
      });
      let formData = new FormData();
      if(obj.imgObject != null) {
          formData.append("image-file", obj.imgObject, obj.imgObject.name);
          formData.append("editReceptionist", blob);
       }else{
          formData.append("editReceptionist", blob);
       }
      this.$store.dispatch("editReceptionist",formData);
      // location.reload()
    }
  },
  setup() {
    const store = useStore();
    store.dispatch("getCustomersById");
    store.dispatch("getReceptionistsById");
    let userData = computed(function () {
      return store.state.user;
    });
    let customer = computed(function () {
      return store.state.customer;
    });
    let receptionist = computed(function () {
      return store.state.receptionist;
    });
    return {
      userData,
      customer,
      receptionist,
    };
  },
};
</script>>
<style scoped>
.profile .form-group {
  position: relative;
  /* margin-bottom: 30px; */
}
.profile .form-control {
  background-color: #ebecee;
  border-radius: 4px;
  border: none;
  height: 40px;
  -webkit-box-shadow: none;
  box-shadow: none;
  color: #3e485c;
  font-size: 14px;
}
body {
  margin-top: 20px;
  color: #1a202c;
  text-align: left;
  background-color: #e2e8f0;
}
.main-body {
  padding: 15px;
}
.card {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1rem;
}

.gutters-sm {
  margin-right: -8px;
  margin-left: -8px;
}

.gutters-sm > .col,
.gutters-sm > [class*="col-"] {
  padding-right: 8px;
  padding-left: 8px;
}
.mb-3,
.my-3 {
  margin-bottom: 1rem !important;
}

.bg-gray-300 {
  background-color: #e2e8f0;
}
.h-100 {
  height: 100% !important;
}
.shadow-none {
  box-shadow: none !important;
}
</style>