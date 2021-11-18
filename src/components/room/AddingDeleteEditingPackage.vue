<template>
  <div class="container mt-5 px-5 pt-14">
    <div class="mb-4">
      <h2 v-if="!addForm && editForm === false">
        <button class="btn btn-outline-dark" @click="addSwitch()"><i class="far fa-plus-square"></i> Add Packages</button>
      </h2>
      <h2 v-if="addForm && editForm === false">
        <button class="btn btn-dark" @click="addSwitch()">
          <i class="fas fa-minus-square"></i> Close
        </button>
      </h2>
      <div v-if="addForm" class="mb-4 package">
        <div class="card p-4 mb-4">
          <label class="form-label font-bold text-center"
            ><h4 class="font-bold">Add Package</h4></label
          >
          <div class="mb-3">
            <label class="form-label font-bold">Package Name</label>
            <input
              type="text"
              v-model="pName"
              class="form-control"
              placeholder="example service"
            />
            <div v-if="this.invName == true" class="text-red-500 text-sm pt-2">
                Please type package name or this package already exist
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label font-bold">Package Charge</label>
            <input
              type="number"
              v-model="pCharge"
              class="form-control"
            />
            <div v-if="this.invCharge == true" class="text-red-500 text-sm pt-2">
               Please type package charge more than 0 
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label font-bold">Description</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              v-model="pDescription"
              rows="3"
            ></textarea>
            <div v-if="this.invDes == true" class="text-red-500 text-sm pt-2">
               Please type package description 
            </div>
          </div>
          <div>
            <button class="btn btn-primary" @click="addPackage()">Add</button>
          </div>
        </div>
      </div>
      <div class="package card p-4 mb-4"  v-if="editForm">
        <label class="form-label font-bold text-center"
            ><h4 class="font-bold">Edit package</h4></label
          >
          <p><span class="font-bold">Package Name:</span><span> <input
              type="text"
              v-model="pName"
              class="form-control"
              placeholder="example service"
            /></span></p>
            <p v-if="this.invName == true" class="text-red-500 text-sm ">
                Please type package name 
            </p>
          <p><span class="font-bold"> Description:</span><span> 
              <input
              type="text"
              v-model="pDescription"
              class="form-control"
              placeholder="example service"
            /></span></p>
             <p v-if="this.invDes == true" class="text-red-500 text-sm ">
               Please type package description 
            </p>
          <p><span class="font-bold"> Package Charge: </span><span><input
              type="text"
              v-model="pCharge"
              class="form-control"
              placeholder="example service"
            /></span></p>
            <p v-if="this.invCharge == true" class="text-red-500 text-sm ">
               Please type package charge more than 0 
            </p>
          <span class="space-x-2">
            <button class="btn btn-success" @click="editPackage()">Confirm</button>
            <button class="btn btn-danger" @click="cancel()">Cancel</button>
          </span>
        </div>
      <div class="card p-4">
           <label class="form-label font-bold "
            ><h4 class="font-bold text-start">Package Data</h4>
            </label >
        <table class="table table-responsive table-bordered">
          <thead class="table-primary">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Roomtype</th>
              <th scope="col" width="30%">Description</th>
              <th scope="col">PackageCharge</th>
              <th scope="col"><div class="search"> 
              <i class="fa fa-search"></i> 
              <input type="text" class="form-control" v-model="search" placeholder="Type to search package"> 
              </div></th>
            </tr>
          </thead>
          <tbody class="table-light">
            <tr v-for="item in filterRoomtype" :key="item.packageId">
              <td>{{ item.packageId }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.packageCharge.toLocaleString() }}</td>
            
              <td class="space-x-2 text-center">
                <button class="btn btn-success" @click="editBtn(item)">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="deletePackage(item)" class="btn btn-danger">
                  <i class="far fa-trash-alt"></i>
                </button> 
              </td>
             
            </tr>
          </tbody>
        </table>
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
      search:"",
      addForm: false,
      editForm:false,
      pId:"",
      pName: "",
      pCharge: 0,
      pDescription:'',
      invName:false,
      invCharge:false,
      invDes:false
    };
  },
  methods: {
    cancel(){
      this.pId="" ;
      this.pName= "" ;
      this.pCharge = "" ;
      this.pDescription = "" ;
      this.editForm = !this.editForm
    },
    editBtn(item){
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.pId = item.packageId
        this.pName = item.name
        this.pCharge = item.packageCharge
        this.pDescription = item.description
        this.editForm = !this.editForm
    },
    addSwitch() {
      this.addForm = !this.addForm;
    },
    editPackage(){
      this.invName = this.pName === "" ? true : false;
      this.invCharge = this.pCharge <=0 ? true : false;
      this.invDes = this.pDescription === "" ? true : false;
      if(!this.invName && !this.invCharge && !this.invDes){
           const obj = {
            packageId: this.pId,
            name: this.pName,
            description: this.pDescription,
            packageCharge : this.pCharge
        }
        console.log(obj)
         this.createEditFormData(obj)
      }
    this.editForm = !this.editForm
    },
    createEditFormData(obj){
     const jsonEditPackage = JSON.stringify(obj);
      const blob = new Blob([jsonEditPackage], {
        type: "application/json",
      });
      let formData = new FormData();
      formData.append("editRoomType", blob);
      this.$store.dispatch("editPackages", formData);
      location.reload()
    },
    deletePackage(item){
    let response = confirm(`Are you sure you want to delete package: ${item.name}`)
    if(response){
      this.$store.dispatch("deletePackages", item.packageId);
      location.reload()
    }
    },
    addPackage(){
        this.invName = this.pName === "" ? true : false;
        if(this.invName == false){
        for(let i = 0; i<this.packages.length ;i++){
          if(this.packages[i].name == this.pName){
          this.invName = false
          break;
          }
        }
      }
        this.invCharge = this.pCharge <=0 ? true : false;
        this.invDes = this.pDescription === "" ? true : false;
        if(!this.invName && !this.invCharge && !this.invDes ){
        const obj = {
            packageId: this.pId,
            name: this.pName,
            description: this.pDescription,
            packageCharge : this.pCharge
        }
        this.addSwitch()
        console.log(obj)
        this.createFormData(obj)
        location.reload()
        }
    },
    createFormData(obj){
     const jsonNewPackage = JSON.stringify(obj);
      const blob = new Blob([jsonNewPackage], {
        type: "application/json",
      });
      let formData = new FormData();
      formData.append("addPackage", blob);
      this.$store.dispatch("addPackages", formData);
    }
  },
  computed: {
    filterRoomtype: function(){
     return this.packages.filter((temp)=>{
        return temp.name.toLowerCase().match(this.search.toLowerCase())
      })
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
.package .form-group {
  position: relative;
  /* margin-bottom: 30px; */
}
.package .form-control {
  background-color: #ebecee;
  border-radius: 4px;
  border: none;
  height: 40px;
  -webkit-box-shadow: none;
  box-shadow: none;
  color: #3e485c;
  font-size: 14px;
}
.card {
     border-radius: 10px !important
 }
</style>