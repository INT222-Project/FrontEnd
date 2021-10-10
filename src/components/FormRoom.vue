<template>
  <div class="w-auto h-full pt-4">
    <div class="container">
      <!-- section -->
      <div class="mb-3">
        <label class="form-label font-bold">Room No</label>
        <input
          type="text"
          v-model="roomNo"
          class="form-control"
          placeholder="100"
        />
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
          <option v-for="r in rType" :value="r" :key="r.roomTypeId">
            {{ r.name }}
          </option>
        </select>
        <div v-if="this.invRtype == true" class="text-red-500 text-sm">
          Please select a valid room type.
        </div>
      </div>
      <!--section-->
      <label class="form-label font-bold">Room charge</label>
      <div class="input-group mb-3">
        <span class="input-group-text">฿</span>
        <input
          class="form-control"
          type="number"
          v-model="roomCharge"
          min="1"
          step="0.05"
          placeholder="0.00"
        />
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
          Please provide a valid image.
        </div>
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
import { computed } from "vue";
import { useStore } from "vuex";
// import RoomDataService from "../service/RoomDataService";
export default {
  props: {
    old_roomId: { type: Number, require: false, default: 0 },
    old_roomNo: { type: String, require: false, default: "" },
    old_bedtype: { type: String, require: false, default: "" },
    old_roomtype: { type: Object, require: false, default: null },
    old_roomCharge: { type: Number, require: false, default: 0.0 },
    old_Img: { type: String, require: false, default: null },
    itemInRooms: { type: Array, require: false, default: null },
  },
  data() {
    return {
      edited: this.editedRoom,
      file: null,
      imgSrc: this.old_Img,
      imgObject: null,
      roomId: this.old_roomId,
      roomNo: this.old_roomNo,
      bedtype: this.old_bedtype,
      roomtype: this.old_roomtype,
      roomCharge: this.old_roomCharge,
      // rType:[],
      invRNo: false,
      invBtype: false,
      invRtype: false,
      invRcharge: false,
      invRimg: false,
    };
  },
  methods: {
    openFile(ev) {
      const file = ev.target.files[0];
      this.imgSrc = URL.createObjectURL(file);
      this.imgObject = file;
    },
    clear() {
      this.imgSrc = null;
      this.imgObject = null;
      this.roomNo = "";
      this.bedtype = "";
      this.roomtype = null;
      this.roomCharge = 0.0;
      this.invRNo = false;
      this.invBtype = false;
      this.invRtype = false;
      this.invRcharge = false;
      this.invRimg = false;
      this.$router.push("/");
    },
    checkInput() {
      this.invRNo = this.roomNo === "" ? true : false;
      this.invBtype = this.bedtype === "" ? true : false;
      this.invRtype = this.roomtype === null ? true : false;
      this.invRcharge = this.roomCharge <= 0 ? true : false;
      this.invRimg = this.imgSrc === null ? true : false;

      if (this.invRNo == false) {
        if (this.old_roomNo != "") {
          if (this.roomNo == this.old_roomNo) this.invRNo = false;
          else {
            for (let i = 0; i < this.itemInRooms.length; i++) {
              if (this.itemInRooms[i].roomNo == this.roomNo) {
                this.invRNo = true;
                break;
              }
            }
          }
        } else {
          for (let i = 0; i < this.itemInRooms.length; i++) {
            if (this.itemInRooms[i].roomNo == this.roomNo) {
              this.invRNo = true;
              break;
            }
          }
        }
      }
      if (
        !this.invRNo &&
        !this.invBtype &&
        !this.invRtype &&
        !this.invRcharge &&
        !this.invRimg
      ) {
        if (this.imgSrc == this.old_Img) {
          this.imgSrc = null;
          this.imgObject = null;
        }
        const room = {
          roomId: this.roomId,
          roomNo: this.roomNo,
          roomType: this.roomtype,
          roomCharge: this.roomCharge,
          bedType: this.bedtype,
          src: this.imgSrc,
          imgObject: this.imgObject,
        };
        console.log(room);
        this.invRNo = false;
        this.invBtype = false;
        this.invRtype = false;
        this.invRcharge = false;
        this.invRimg = false;
        this.roomId = "";
        this.roomtype = null;
        this.bedtype = "";
        this.imgSrc = null;
        this.imgObject = null;
        this.$emit("add-room", room);
      }
    },
  },
  setup() {
    const store = useStore();
    store.dispatch("getRoomType");
    let rType = computed(function () {
      return store.state.rType;
    });
    return {
      rType,
    };
  },
};
</script>

<style>
</style>