<template>
  <div class="container mt-5 px-5 pt-14">
    <div class="mb-4">
      <h2 v-if="!addForm && editForm === false">
        <button class="btn btn-outline-dark" @click="addSwitch()">
          <i class="far fa-plus-square"></i> Add Roomtype
        </button>
      </h2>
      <h2 v-if="addForm && editForm === false">
        <button class="btn btn-dark" @click="addSwitch()">
          <i class="fas fa-minus-square"></i> Close
        </button>
      </h2>
      <div v-if="addForm && !editForm" class="roomtype mb-4 col-md-16">
        <div class="card p-12">
          <label class="form-label font-bold text-center"
            ><h4 class="font-bold">Add Roomtype</h4></label
          >
          <div class="mb-3">
            <label class="form-label font-bold">Roomtype</label>
            <input
              type="text"
              v-model.trim="rName"
              class="form-control"
              placeholder="example type"
            />
            <div v-if="this.invName == true" class="text-red-500 text-sm pt-2">
              Incorrect package name or This package name already exist
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label font-bold">Max Rest</label>
            <input type="number" v-model="rMaxrest" class="form-control" />
            <div
              v-if="this.invMaxrest == true"
              class="text-red-500 text-sm pt-2"
            >
              Please type max rest more than 0
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label font-bold">Room Size</label>
            <input
              type="text"
              v-model.trim="rSize"
              class="form-control"
              placeholder="25 squre meter"
            />
            <div v-if="this.invSize == true" class="text-red-500 text-sm pt-2">
              Please type room size
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label font-bold">Description</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              placeholder="description"
              v-model.trim="rDescription"
              rows="3"
            ></textarea>
            <div v-if="this.invDes == true" class="text-red-500 text-sm pt-2">
              Please type roomtype description
            </div>
            <div class="mb-3">
              <h6 class="mb-0 font-bold">Choose Image</h6>
            </div>
            <div class="text-secondary">
              <img
                class="rounded mx-auto d-block"
                v-if="imgSrc"
                :src="imgSrc"
                width="150"
              />
              <input
                type="file"
                class="form-control"
                id="customFile"
                @change="openFile"
              />
            </div>
            <div v-if="this.invImg == true" class="text-red-500 text-sm pt-2">
              Please choose img room
            </div>
          </div>
          <div class="space-x-2">
            <button class="btn btn-primary" @click="addRoomtype()">Add</button>
            <button class="btn btn-danger" @click="cancelAdd()">Cancel</button>
          </div>
        </div>
      </div>
      <div class="card p-4 mb-4 roomtype" v-if="editForm">
        <label class="form-label font-bold text-center"
          ><h4 class="font-bold">Edit Roomtype</h4></label
        >
        <p>
          <span class="font-bold"> Roomtype:</span
          ><span>
            <input type="text" v-model.trim="rName" class="form-control"
          /></span>
        </p>
        <div v-if="this.invName == true" class="text-red-500 text-sm pt-2">
          Incorrect package name or This package name already exist
        </div>
        <p>
          <span class="font-bold"> Description:</span
          ><span>
            <input type="text" v-model.trim="rDescription" class="form-control"
          /></span>
        </p>
        <div v-if="this.invDes == true" class="text-red-500 text-sm pt-2">
          Please type roomtype description
        </div>
        <p>
          <span class="font-bold"> Max Rest: </span
          ><span
            ><input type="text" v-model.trim="rMaxrest" class="form-control"
          /></span>
        </p>
        <div v-if="this.invMaxrest == true" class="text-red-500 text-sm pt-2">
          Please type max rest more than 0
        </div>
        <p>
          <span class="font-bold"> Room Size: </span
          ><span
            ><input type="text" v-model.trim="rSize" class="form-control"
          /></span>
        </p>
        <div v-if="this.invSize == true" class="text-red-500 text-sm pt-2">
          Please type room size
        </div>
        <div class="text-secondary">
          <img
            class="rounded mx-auto d-block"
            v-if="imgSrc"
            :src="imgSrc"
            width="150"
          />
          <input
            type="file"
            class="form-control"
            id="customFile"
            @change="openFile"
          />
        </div>
        <div v-if="this.invImg == true" class="text-red-500 text-sm pt-2">
          Please choose img room
        </div>
        <span class="space-x-2">
          <button class="btn btn-success" @click="editRoomtype(item)">
            Confirm
          </button>
          <button class="btn btn-danger" @click="cancel()">Cancel</button>
        </span>
      </div>
      <div
        class="
          d-md-flex d-none
          justify-content-md-between justify-content-sm-center
          align-content-center
          border-bottom border-2
          my-2
          bg-primary
          text-light
          p-3
          rounded-3
        "
      >
        <div class="col-1 text-sm-center text-md-start align-self-center">
          <h1 class="h5 fw-bold">ID</h1>
        </div>
        <div class="col-2 align-self-center">
          <h1 class="h5 fw-bold">Roomtype</h1>
        </div>
        <div class="col-2 align-self-center">
          <h1 class="h5 fw-bold">Description</h1>
        </div>
        <div class="col-2 align-self-center">
          <h1 class="h5 fw-bold">RoomSize</h1>
        </div>
        <div class="col-2 align-self-center">
          <h1 class="h5 fw-bold">MaxRest</h1>
        </div>
        <div class="col-2 align-self-center">
          <h1 class="h5 fw-bold">
            <input
              type="search"
              class="form-control"
              v-model="search"
              placeholder="Type to search package"
            />
          </h1>
        </div>
      </div>
      <div
        v-for="item in filterRoomtype"
        :key="item.roomTypeId"
        class="
          d-md-flex d-sm-block
          justify-content-md-between justify-content-sm-center
          text-center
          border-bottom border-2
          my-2
          bg-light
          p-6
          rounded-3
        "
      >
        <div
          class="col-md-1 text-sm-center text-md-start align-self-center my-2"
        >
          {{ item.roomTypeId }}
        </div>
        <div
          class="col-md-2 text-sm-center text-md-start align-self-center my-2"
        >
          <h1 class="h6">{{ item.name }}</h1>
          <img :src="viewImg(item.roomTypeId)" width="150" />
        </div>
        <div
          class="col-md-2 text-sm-center text-md-start align-self-center my-2"
        >
          <h1 class="h6">{{ item.description }}</h1>
        </div>
        <div
          class="col-md-2 text-sm-center text-md-start align-self-center my-2"
        >
          <h1 class="h6">{{ item.roomSize }}</h1>
        </div>
        <div
          class="col-md-2 text-sm-center text-md-start align-self-center my-2"
        >
          <h1 class="h6">{{ item.maxRest }}</h1>
        </div>
        <div
          class="
            col-md-2
            text-sm-center text-md-start
            align-self-center
            my-2
            space-x-2
          "
        >
          <button class="btn btn-success" @click="editBtn(item)">
            <i class="fas fa-edit"></i>
          </button>
          <button @click="deleteRoomtype(item)" class="btn btn-danger">
            <i class="far fa-trash-alt"></i>
          </button>
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
      search: "",
      addForm: false,
      editForm: false,
      rId: 0,
      rName: "",
      rMaxrest: 0,
      rDescription: "",
      rSize: "",
      old_Img: null,
      imgSrc: null,
      imgObject: null,
      invName: false,
      invMaxrest: false,
      invDes: false,
      invSize: false,
      invImg: false,
    };
  },
  methods: {
    viewImg(roomId) {
      return this.$store.state.url + "/api/roomTypes/showImage/" + roomId;
    },
    openFile(ev) {
      const file = ev.target.files[0];
      this.imgSrc = URL.createObjectURL(file);
      this.imgObject = file;
    },
    cancel() {
      this.editForm = !this.editForm;
      this.rName = "";
      this.rMaxrest = 0;
      this.rDescription = "";
      this.rSize = "";
      this.rId = 0;
      this.imgSrc = null;
      this.invName = false;
      this.invMaxrest = false;
      this.invDes = false;
      this.invSize = false;
      this.invImg = false;
    },
    editBtn(item) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.rId = item.roomTypeId;
      this.rName = item.name;
      this.rMaxrest = item.maxRest;
      this.rDescription = item.description;
      this.rSize = item.roomSize;
      this.editForm = !this.editForm;
      this.old_name = item.name;
      this.old_Img =
        this.$store.state.url + "/api/roomTypes/showImage/" + item.roomTypeId;
      this.imgSrc =
        this.$store.state.url + "/api/roomTypes/showImage/" + item.roomTypeId;
    },
    addSwitch() {
      this.addForm = !this.addForm;
    },
    editRoomtype() {
      this.invName = this.rName === "" ? true : false;
      if (this.invName == false) {
        if (this.old_name == this.rName) {
          this.invName = false;
        } else {
          for (let i = 0; i < this.rType.length; i++) {
            if (this.rType[i].name == this.rName) {
              this.invName = true;
              break;
            }
          }
        }
      }
      this.invMaxrest = this.rMaxrest <= 0 ? true : false;
      this.invDes = this.rDescription === "" ? true : false;
      this.invSize = this.rSize === "" ? true : false;
      this.invImg = this.imgSrc === null ? true : false;
      if (
        !this.invName &&
        !this.invMaxrest &&
        !this.invDes &&
        !this.invSize &&
        !this.invImg
      ) {
        if (this.imgSrc == this.old_Img) {
          this.imgSrc = null;
          this.imgObject = null;
        }
        const obj = {
          roomTypeId: this.rId,
          name: this.rName,
          description: this.rDescription,
          maxRest: this.rMaxrest,
          roomSize: this.rSize,
          src: this.imgSrc,
        };
        // console.log(obj);
        this.createEditFormData(obj);
        this.editForm = !this.editForm;
      }
    },
    createEditFormData(obj) {
      const jsonEditRoomtype = JSON.stringify(obj);
      const blob = new Blob([jsonEditRoomtype], {
        type: "application/json",
      });
      let formData = new FormData();
      if (this.imgObject != null) {
        formData.append("image-file", this.imgObject, this.imgObject.name);
        formData.append("editRoomType", blob);
        this.rName = "";
        this.rMaxrest = 0;
        this.rDescription = "";
        this.rSize = "";
        this.rId = 0;
      } else {
        formData.append("editRoomType", blob);
        this.rName = "";
        this.rMaxrest = 0;
        this.rDescription = "";
        this.rSize = "";
        this.rId = 0;
      }
      this.$store.dispatch("editRoomType", formData);
      location.reload();
    },
    deleteRoomtype(item) {
      let response = confirm(
        `Are you sure you want to delete package: ${item.name}`
      );
      if (response) {
        this.$store.dispatch("deleteRoomType", item.roomTypeId);
        location.reload();
      }
    },
    addRoomtype() {
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.invName = this.rName === "" ? true : false;
      if (this.invName == false) {
        for (let i = 0; i < this.rType.length; i++) {
          if (this.rType[i].name == this.rName) {
            this.invName = true;
            break;
          }
        }
      }
      this.invMaxrest = this.rMaxrest <= 0 ? true : false;
      this.invDes = this.rDescription === "" ? true : false;
      this.invSize = this.rSize === "" ? true : false;
      this.invImg = this.imgSrc === null ? true : false;
      if (!this.invName && !this.invMaxrest && !this.invDes && !this.invSize) {
        const obj = {
          roomTypeId: this.rId,
          name: this.rName,
          description: this.rDescription,
          maxRest: this.rMaxrest,
          roomSize: this.rSize,
          src: this.imgSrc,
        };
        this.addSwitch();
        // console.log(obj);
        this.createFormData(obj);
        location.reload();
      }
    },
    createFormData(obj) {
      const jsonNewRoomtype = JSON.stringify(obj);
      const blob = new Blob([jsonNewRoomtype], {
        type: "application/json",
      });
      let formData = new FormData();
      formData.append("image-file", this.imgObject, this.imgObject.name);
      formData.append("addRoomType", blob);
      this.$store.dispatch("addRoomType", formData);
    },
    cancelAdd() {
      this.addForm = !this.addForm;
      this.rName = "";
      this.rMaxrest = 0;
      this.rDescription = "";
      this.rSize = "";
      this.rId = 0;
      this.imgSrc = null;
      this.invName = false;
      this.invMaxrest = false;
      this.invDes = false;
      this.invSize = false;
      this.invImg = false;
    },
  },
  computed: {
    filterRoomtype: function () {
      return this.rType.filter((temp) => {
        return temp.name.toLowerCase().match(this.search.toLowerCase());
      });
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
<style scoped>
.card {
  border-radius: 10px !important;
}
.card .card-header {
  background-color: #fff;
  border-bottom: none;
  padding: 24px;
  border-bottom: 2px solid #d3d3d3;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.card .card-footer {
  background-color: #fff;
  border-bottom: none;
  padding: 24px;
  border-bottom: 3px solid #d3d3d3;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.roomtype .form-group {
  position: relative;
  /* margin-bottom: 30px; */
}
.roomtype .form-control {
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