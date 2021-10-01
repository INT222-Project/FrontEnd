<template>
  <div class="w-auto h-full pt-4">
     <div class="container">
        <!-- section -->
        <!-- <form @submit.prevent="checkInput"> -->
        
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
        <!--section-->
        <label class="form-label font-bold">Room charge</label>
        <div class="input-group mb-3">
          <span class="input-group-text">฿</span>
          <input class="form-control" type="number" v-model="roomCharge" min="1" step="0.05"  placeholder="0.00" />
        </div>
        <div v-if="this.invRcharge == true" class="text-red-500 text-sm">
            Please provide a valid room charge.
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
          <div v-if="this.invRimg == true" class="text-red-500 text-sm">
            Please provide a valid room charge.
          </div>
        </div>
        <!-- section -->
        <div class="space-x-2">
        <button class="btn btn-success" @click="checkInput">Submit</button> 
        <button class="btn btn-danger" @click="clear">Cancel</button>
        </div>
        <!-- </form> -->
    </div>
  </div>
</template>

<script>
import RoomDataService from "../service/RoomDataService";
export default {
    props: {
    itemInRooms: Array,
    old_roomId:{type: Number ,require: false ,default:0 },
    old_roomNo:{type: String ,require: false ,default:'' },
    old_bedtype:{type: String ,require: false ,default:'' },
    old_roomtype:{type: Object ,require: false ,default:null },
    old_roomCharge:{type: Number ,require: false ,default:0.00 },
    old_Img:{type:String,require:false,default:null}
  },
  data(){
    return {
      // image
      file:null,
      imgSrc:this.old_Img,
      imgObject:null,
      // Data
      roomId:this.old_roomId,
      roomNo:this.old_roomNo,
      bedtype:this.old_bedtype,
      roomtype:this.old_roomtype,
      roomCharge:this.old_roomCharge,
      // Validation
      rType:[],
      invRNo:false,
      invBtype:false,
      invRtype:false,
      invRcharge:false,
      invRimg:false
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
      this.bedtype = ''
      this.roomtype = null
      this.roomCharge = 0.00
      this.invRNo=false
      this.invBtype=false
      this.invRtype=false
      this.invRcharge=false
      this.invRimg=false
      this.$router.push('/')
    },
    checkInput(){
      // if(this.roomNo!=this.old_roomNo){
      //   console.log(this.old_roomNo)
      // let count = 0;
      //  this.itemInRooms.forEach(r => {
      //     if(this.roomNo==r.roomNo|| this.roomNo == ''){
      //       // this.invRNo = true;
      //       count++
      //       console.log(r);
      //       console.log(this.roomNo)
      //     }
      //   });
      //   if(count>0){
      //     this.invRNo = true;
      //   }else{
      //     this.invRNo = false;
      //   }
      // }
        //  this.itemInRooms.filter(item=>{
        //    if(this.roomNo.has(item)){
        //      this.invRNo = true;
        //    }else{
        //      this.invRNo = false;
        //    }
        //  })
        this.invRNo = this.roomNo === '' ? true : false;
        this.invBtype = this.bedtype === '' ? true : false;
        this.invRtype = this.roomtype === null ? true : false;
        this.invRcharge = this.roomCharge <= 0 ? true : false;
        this.invRimg = this.imgSrc === '' ? true : false;
        
        if(!this.invRNo && !this.invBtype && !this.invRtype && !this.invRcharge &&!this.invRimg){
          if (this.imgSrc == this.old_Img) {
          this.imgSrc = null;
          this.imgObject = null;
        }
        const room = {
        roomId:this.roomId,
        roomNo:this.roomNo,
        roomTypeId:this.roomtype,
        roomCharge:this.roomCharge,
        bedType:this.bedtype,
        src:this.imgSrc,
        imgObject:this.imgObject
        }
        console.log(room)
        this.invRNo = false;
        this.invBtype = false;
        this.invRtype = false;
        this.invRcharge = false;
        this.invRimg = false;
        this.roomId = '';
        this.roomtype = null;
        this.bedtype = '';
        this.imgSrc = '';
        this.imgObject = null;
        this.$emit('add-room',room)

      }
        // this.$store.dispatch('addRoom',room)
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