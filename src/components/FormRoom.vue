<template>
  <div class="w-auto h-full pt-4">
    <div class="container pt-14">
      <form >
        <!-- section -->
        <div class="mb-3">
          <label class="form-label font-bold">Room No</label>
          <input type="text" v-model="roomNo" class="form-control" placeholder="100" />
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
        <!-- section -->
        <div class="mb-3 mt-3">
          <label class="form-label font-bold">Room Type</label>
          <select v-model="roomtype" class="form-select">
            <option selected>Open this select menu</option>
            <option value="1">Standard</option>
            <option value="2">Superior</option>
            <option value="3">Deluxe</option>
            <option value="4">Suite</option>
          </select>
        </div>
        <!-- section -->
        <div class="mb-3">
          <label class="form-label font-bold">Description</label>
          <textarea
            v-model.trim="description"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <!-- section -->
        <label class="form-label font-bold">Room charge</label>
        <div class="input-group mb-3">
          <span class="input-group-text">฿</span>
          <input type="number" v-model="roomCharge" class="form-control" placeholder="0.00" />
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
        <button type="button" class="btn btn-success">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      imgSrc:'',
      imgObject:null,
      roomNo:'',
      bedtype:null,
      roomtype:null,
      description:'',
      roomCharge:''
    }
  },
  methods:{
     openFile(ev) {
      const file = ev.target.files[0];
      this.imgSrc = URL.createObjectURL(file);
      this.imgObject = file;
    }
  }

};
</script>

<style>
</style>