<template>
  <div class="w-auto h-full pt-4">
     <div class="container">
        <!-- section -->
        <div class="mb-3">
          <label class="form-label font-bold">Room No</label>
          <input type="text" v-model="roomNo" class="form-control"  placeholder="100" />
          <div v-if="this.invRNo == true" class="text-red-500 text-sm">
            Please provide a valid room number.
          </div>
        </div>
        <!-- section -->
        <div class="mb-3">
          <label class="form-check-label font-bold">Bed Type</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            value="Single Bed"
            v-model="bedtype"
          />
          <label class="form-check-label">Single Bed</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            value="Double Bed"
            v-model="bedtype"
          />
          <label class="form-check-label">Double Bed</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            value="Triple Bed"
            v-model="bedtype"
          />
          <label class="form-check-label">Triple Bed</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            value="Double-double Bed"
            v-model="bedtype"
          />
          <label class="form-check-label">Double-double Bed</label>
        </div>
        <div v-if="this.invBtype == true" class="text-red-500 text-sm">
            Please choose a Bed Type.
          </div>
        <!-- section -->
        <div class="mb-3 mt-3">
          <label class="form-label font-bold">Room Type</label>
          <select v-model="roomtype" class="form-select">
            <option v-for="r in rType" :value="r" :key="r.roomTypeId">{{r.name}}</option>
          </select>
          <div v-if="this.invRtype == true" class="text-red-500 text-sm">
            Please select a valid room type.
          </div>
        </div>
        <!-- section -->
        <!-- <div class="mb-3">
          <label class="form-label font-bold">Description</label>
          <textarea
            v-model.trim="description"
            
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div> -->
        <!-- section -->
        <label class="form-label font-bold">Room charge</label>
        <div class="input-group mb-3">
          <span class="input-group-text">฿</span>
          <input class="form-control" type="number" v-model="roomCharge" min="1" step="0.05"  placeholder="0.00" />
        </div>
        <div v-if="this.invRcharge == true" class="text-red-500 text-sm">
            Please provide a valid room number.
          </div>
        <!-- section -->
        <div class="mb-3">
          <label for="formFile" class="form-label font-bold">Images</label>
          <div id="preview">
            <img class="rounded mx-auto d-block" v-if="imgSrc" :src="imgSrc" />
          </div>
          <input
            class="form-control"
            type="file"
            id="formFile"
            @change="openFile"
          />
        </div>
        <!-- section -->
        <div class="space-x-2">
        <button class="btn btn-success" @click="checkInput">Submit</button> 
        <button class="btn btn-danger" @click="clear">Cancel</button>
        </div>
    </div>
  </div>
</template>

<script>
import RoomDataService from "../service/RoomDataService";
export default {
    props: {
    itemInRooms: Array,
  },
  data(){
    return {
      // Data
      imgSrc:'',
      imgObject:null,
      roomNo:'',
      bedtype:'',
      roomtype:null,
      // description:'',
      roomCharge:0.00,
      rType:[],
      // Validation
      invRNo:false,
      invBtype:false,
      invRtype:false,
      invRcharge:false
    }
  },
  methods:{
     openFile(ev) {
      const file = ev.target.files[0];
      this.imgSrc = URL.createObjectURL(file);
      this.imgObject = file;
    },
    clear(){
      this.imgSrc = ''
      this.imgObject = null
      this.roomNo = ''
      this.bedtype = null
      this.roomtype = null
      this.roomCharge = 0.00
      this.invRNo=false
      this.invBtype=false
      this.invRtype=false
      this.invRcharge=false
      this.$router.push('/')
    },
    checkInput(){
      if(this.roomNo == '' && this.roomtype==null && this.roomCharge <= 0 && this.bedtype == ''){
        this.invRNo = true;
        this.invBtype = true;
        this.invRtype = true;
        this.invRcharge = true;

      }else{
        console.log(this.roomNo)
        console.log(this.roomCharge)
        console.log('r'+this.roomtype)
        console.log('b'+this.bedtype)
        const room = {
        roomNo:this.roomNo,
        roomTypeId:this.roomtype,
        roomCharge:this.roomCharge,
        bedType:this.bedtype
        }
        const jsonNewRoom = JSON.stringify(room);
        const blob = new Blob([jsonNewRoom],{
          type: "application/json",
        })
        console.log(jsonNewRoom)
        let formData = new FormData();
        // formData.append("file-image", newProduct.imgObject, newProduct.imgObject.name);
        formData.append("newRoom",blob)
        console.log(room)
        this.$emit('add-room',formData)
        // const jsonNewRoom = JSON.stringify(room);
        // const blob = new Blob([jsonNewRoom],{
        //   type: "application/json",
        // })
        // console.log(jsonNewRoom)
        // let formData = new FormData();
        // formData.append("newRoom",blob)

        this.invRNo = false;
        this.invBtype = false;
        this.invRtype = false;
        this.invRcharge = false;
        // formData.append("file-image", this.imgObject, this.imgObject.name);
        // console.log(room)
        // this.$store.dispatch('addRoom',room)
      }
      this.$router.push('/')
    },
     getRoomtype(){
       RoomDataService.retrieveAllRoomtypes().then((response)=>{
         this.rType = response.data
       }) 
     },
  },
  created(){
    this.rtype = this.getRoomtype();
  }

};
</script>

<style>
</style>