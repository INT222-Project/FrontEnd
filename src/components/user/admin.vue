<template>
    <div class="container my-5 pt-20">
    <!-- {{this.users}} -->
    <div class="d-md-flex d-none justify-content-md-between justify-content-sm-center align-content-center border-bottom border-2 my-2 bg-dark text-light p-3 rounded-3">
        <div class="col-2 text-sm-center text-md-start align-self-center">
            <h1 class="h5 fw-bold">User ID</h1>
        </div>
        <div class="col-3 align-self-center">
            <h1 class="h5 fw-bold">Email</h1>
        </div>
        <div class="col-2 align-self-center">
            <h1 class="h5 fw-bold">Customer</h1>
        </div>
        <div class="col-2 align-self-center">
            <h1 class="h5 fw-bold">Address</h1>
        </div>
        <div class="col-2 align-self-center">
            <h1 class="h5 fw-bold">Tel no</h1>
        </div>
        <div class="col-2 align-self-center">
            <h1 class="h5 fw-bold">Role</h1>
        </div>
    </div>
    <div v-for="(item,index) in users" :key="index"  class="d-md-flex d-sm-block justify-content-md-between justify-content-sm-center text-center border-bottom border-2 my-2 bg-light p-6 rounded-3">
        <div class="col-md-1 text-sm-center text-md-start align-self-center my-2">
            <h1 v-if="item.role[0].authority == 'customer'" class="h6">
                {{item.authenticationUser.customerId}}</h1>
            <h1 v-if="item.role[0].authority == 'receptionist'" class="h6">
                {{item.authenticationUser.repId}}</h1>
        </div>
         <div class="col-md-1 text-sm-center text-md-start align-self-center my-2">
             <img v-if="item.role[0].authority == 'customer'" :src="viewImg(item.authenticationUser.customerId)" class="rounded-circle" width="30"/>
             <img v-if="item.role[0].authority == 'receptionist'" :src="viewImg(item.authenticationUser.repId)" class="rounded-circle" width="30"/>
        </div>
        <div class="col-md-3 text-sm-center text-md-start align-self-center my-2">
            <h1  class="h6">{{item.authenticationUser.email}}</h1>
        </div>
        <div class="col-md-2 text-sm-center text-md-start align-self-center my-2">
            <h1 v-if="item.role[0].authority == 'customer'" class="h6">{{item.authenticationUser.fname}} {{item.authenticationUser.lname}}</h1>
            <h1 v-if="item.role[0].authority == 'receptionist'" class="h6">{{item.authenticationUser.fName}} {{item.authenticationUser.lName}}</h1>
        </div>
        <div class="col-md-2 text-sm-center text-md-start align-self-center my-2">
             <h1 v-if="item.role[0].authority == 'customer'" class="h6">{{item.authenticationUser.address}}</h1>
            <h1 v-if="item.role[0].authority == 'receptionist'" class="h6">{{item.authenticationUser.address}}</h1>
        </div>
        <div class="col-md-2 text-sm-center text-md-start align-self-center my-2">
             <h1 v-if="item.role[0].authority == 'customer'" class="h6">{{item.authenticationUser.telNo}}</h1>
            <h1 v-if="item.role[0].authority == 'receptionist'" class="h6">{{item.authenticationUser.telNo}}</h1>
        </div>
        <div class="col-md-1 text-sm-center text-md-start align-self-center my-2">
           <p v-if="item.role[0].authority == 'customer' && item.authenticationUser.customerId !== this.editId">{{item.role[0].authority}}</p>
           <div class="space-x-2">
           <button v-if="item.role[0].authority == 'customer' && this.editForm == false" class="btn btn-success" @click="editBtn(item.authenticationUser.customerId,item.role[0].authority)">
               <i class="fas fa-edit"></i>
           </button>
           <button v-if="item.role[0].authority == 'customer' && this.editForm == false" class="btn btn-danger" @click="deleteUser(item.authenticationUser.customerId,item.role[0].authority)">
               <i class="far fa-trash-alt"></i>
           </button>
           <p v-if="item.role[0].authority == 'receptionist' && item.authenticationUser.repId !== this.editId">{{item.role[0].authority}}</p>
           <button v-if="item.role[0].authority == 'receptionist' && this.editForm == false" class="btn btn-success" @click="editBtn(item.authenticationUser.repId,item.role[0].authority)">
               <i class="fas fa-edit"></i>
           </button>
           <button v-if="item.role[0].authority == 'receptionist' && this.editForm == false" class="btn btn-danger" @click="deleteUser(item.authenticationUser.repId,item.role[0].authority)">
               <i class="far fa-trash-alt"></i>
           </button>
           </div>
           <select class="btn btn-outline-dark" v-model="this.newRole" v-if="this.editForm == true && item.role[0].authority == 'customer'  && item.authenticationUser.customerId == editId">
                <option v-for="role in roles" :key="role" :value="role">
                    {{role}}
                </option>
            </select>
            <button @click="changeRole(item)" class="btn btn-outline-dark" v-if="this.editForm == true && item.role[0].authority == 'customer'  && item.authenticationUser.customerId == editId">OK</button>  
            <select class="btn btn-outline-dark" v-model="this.newRole" v-if="this.editForm == true && item.role[0].authority == 'receptionist'  && item.authenticationUser.repId == editId">
                <option v-for="role in roles" :key="role" :value="role">
                    {{role}}
                </option>
            </select>
            <button @click="changeRole(item)" class="btn btn-outline-dark" v-if="this.editForm == true && item.role[0].authority == 'receptionist'  && item.authenticationUser.repId == editId">OK</button>  
        </div>
    </div>
</div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
    data(){
        return{
            newRole:'',
            editId:'',
            editForm:false,
            roles:['customer','receptionist']
        }
    },
    methods:{
        viewImg(id){
            return this.$store.state.url + "/api/receptionists/showImage/" + id;
        },
        deleteUser(id,role){
            let response = confirm(`Are you want to delete this ${role} ${id}`)
            if(response){
                let formData = new FormData();
                formData.append("id",id);
                formData.append("role",role)
                this.$store.dispatch('deleteUserRole',formData).then(this.location.reload())
                // if(role == 'receptionist')
                // {
                //     this.$store.dispatch('deleteReceptionist',id).then(this.location.reload())
                // }
                // if(role == 'customer')
                // {
                //     this.$store.dispatch('deleteCustomer',id).then(this.location.reload())
                // }
            }
        },
        editBtn(id,role){
            this.editForm = !this.editForm
            this.editId = id 
            this.newRole = role
        },
        changeRole(obj){
            if(this.newRole == 'receptionist'){
                if(obj.role[0].authority == 'customer'){
                    const editRole = {
                    customerId : obj.authenticationUser.customerId,
                    password:obj.authenticationUser.password,
                    fname : obj.authenticationUser.fname,
                    lname : obj.authenticationUser.lname,
                    email : obj.authenticationUser.email,
                    telNo : obj.authenticationUser.telNo,
                    address : obj.authenticationUser.address
                     }
                     console.log(editRole)
                     const jsonEditProfile = JSON.stringify(editRole);
                     const blob = new Blob([jsonEditProfile], {
                     type: "application/json",
                     });
                     let formData = new FormData();
                     formData.append("newReceptionist", blob);
                     formData.append("newRole",this.newRole);
                     this.$store.dispatch('editUserRole',formData)
                }else if(obj.role[0].authority == 'receptionist'){
                    this.editForm = !this.editForm
                    this.editId = ''
                }
            }else if(this.newRole == 'customer'){
                 if(obj.role[0].authority == 'customer'){
                    this.editForm = !this.editForm
                    this.editId = ''
                 }else if(obj.role[0].authority == 'receptionist'){
                    const editRole = {
                    repId : obj.authenticationUser.repId,
                    fName : obj.authenticationUser.fName,
                    lName : obj.authenticationUser.lName,
                    email : obj.authenticationUser.email,
                    telNo : obj.authenticationUser.telNo,
                    address : obj.authenticationUser.address
                     }
                     console.log(editRole)
                     const jsonEditProfile = JSON.stringify(editRole);
                     const blob = new Blob([jsonEditProfile], {
                     type: "application/json",
                     });
                     let formData = new FormData();
                     formData.append("newCustomer", blob);
                     formData.append("newRole",this.newRole);
                     this.$store.dispatch('editUserRole',formData)
                 }
            }
        }
    },
    setup() {
    const store = useStore();
    store.dispatch("getAllUsers");
    let users = computed(function () {
      return store.state.users;
    });
    let customer = computed(function () {
      return store.state.customer;
    });
    let receptionist = computed(function () {
      return store.state.receptionist;
    });
    return {
        users,
        customer,
        receptionist
    }
    },
}
</script>