<template>
  <div class="container mt-5 px-5 pt-14">
    <div class="mb-4">
      <h2 v-if="!addForm">
        <button @click="addSwitch()"><i class="far fa-plus-square"></i></button>
      </h2>
      <h2 v-if="addForm">
        <button @click="addSwitch()"><i class="fas fa-minus-square"></i></button>
      </h2>
      <div v-if="addForm && !editForm" class="mb-4">
        <div class="card p-4">
          <label class="form-label font-bold text-center"
            ><h4 class="font-bold">Add Roomtype</h4></label
          >
          <div class="mb-3">
            <label class="form-label font-bold">Roomtype</label>
            <input
              type="text"
              v-model="rName"
              class="form-control"
              placeholder="example type"
            />
            <div v-if="this.invName == true" class="text-red-500 text-sm pt-2">
              Please type package name
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
            <input type="text" v-model="rSize" class="form-control"  placeholder="25 squre meter"/>
            <div
              v-if="this.invSize == true"
              class="text-red-500 text-sm pt-2"
            >
              Please type room size 
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label font-bold">Description</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              v-model="rDescription"
              rows="3"
            ></textarea>
            <div v-if="this.invDes == true" class="text-red-500 text-sm pt-2">
              Please type roomtype description
            </div>
          </div>
          <div>
            <button class="btn btn-primary" @click="addRoomtype()">Add</button>
          </div>
        </div>
      </div>
      <div v-for="item in rType" :key="item.roomTypeId">
        <div class="card p-4" v-if="!editForm || this.rId != item.roomTypeId">
          <p>
            <span class="font-bold"> Roomtype: </span
            ><span> {{ item.name }} </span>
          </p>
          <p>
            <span class="font-bold"> Description:</span
            ><span> {{ item.description }}</span>
          </p>
          <p>
            <span class="font-bold"> Max Rest: </span
            ><span>{{ item.maxRest }}</span>
          </p>
          <p>
            <span class="font-bold"> Room Size: </span
            ><span>{{ item.roomSize }}</span>
          </p>

          <span class="space-x-2">
            <button class="btn btn-success" @click="editBtn(item)">Edit</button>
            <button class="btn btn-danger" @click="deleteRoomtype(item)">
              Delete
            </button>
          </span>
        </div>
        <div class="card p-4" v-if="editForm && this.rId == item.roomTypeId">
          <p>
            <span class="font-bold"> Roomtype:</span
            ><span>
              <input
                type="text"
                v-model="rName"
                class="form-control"
                placeholder="example service"
            /></span>
          </p>
          <p>
            <span class="font-bold"> Description:</span
            ><span>
              <input
                type="text"
                v-model="rDescription"
                class="form-control"
                placeholder="example service"
            /></span>
          </p>
          <p>
            <span class="font-bold"> Max Rest: </span
            ><span
              ><input
                type="text"
                v-model="rMaxrest"
                class="form-control"
                placeholder="example service"
            /></span>
          </p>
          <p>
            <span class="font-bold"> Room Size: </span
            ><span
              ><input
                type="text"
                v-model="rSize"
                class="form-control"
                placeholder="example service"
            /></span>
          </p>
          <span class="space-x-2">
            <button class="btn btn-success" @click="editRoomtype(item)">
              Confirm
            </button>
          </span>
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
      addForm: false,
      editForm: false,
      rId: 0,
      rName: "",
      rMaxrest: 0,
      rDescription: "",
      rSize: "",
      invName: false,
      invMaxrest: false,
      invDes: false,
      invSize: false,
    };
  },
  methods: {
    editBtn(item) {
      this.rId = item.roomTypeId;
      this.rName = item.name;
      this.rMaxrest = item.maxRest;
      this.rDescription = item.description;
      this.rSize = item.roomSize;
      this.editForm = !this.editForm;
      console.log(this.rId)
    },
    addSwitch() {
      this.addForm = !this.addForm;
    },
    editRoomtype() {
      this.invName = this.rName === "" ? true : false;
      this.invMaxrest = this.rMaxrest <= 0 ? true : false;
      this.invDes = this.rDescription === "" ? true : false;
      this.invSize = this.rSize === "" ? true : false;
      if (!this.invName && !this.invMaxrest && !this.invDes && !this.invSize) {
        const obj = {
          roomTypeId: this.rId,
          name: this.rName,
          description: this.rDescription,
          maxRest: this.rMaxrest,
          roomSize: this.rSize,
        };
        console.log(obj);
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
      formData.append("editRoomType", blob);
      this.$store.dispatch("editRoomType", formData);
      location.reload()
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
      this.invName = this.rName === "" ? true : false;
      this.invMaxrest = this.rMaxrest <= 0 ? true : false;
      this.invDes = this.rDescription === "" ? true : false;
      this.invSize = this.rSize === "" ? true : false;
      if (!this.invName && !this.invMaxrest && !this.invDes && !this.invSize) {
        const obj = {
          roomTypeId: this.rId,
          name: this.rName,
          description: this.rDescription,
          maxRest: this.rMaxrest,
          roomSize: this.rSize,
        };
        this.addSwitch();
        console.log(obj);
        this.createFormData(obj);
        // location.reload();
      }
    },
    createFormData(obj) {
      const jsonNewRoomtype = JSON.stringify(obj);
      const blob = new Blob([jsonNewRoomtype], {
        type: "application/json",
      });
      let formData = new FormData();
      formData.append("addRoomType", blob);
      this.$store.dispatch("addRoomType", formData);
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