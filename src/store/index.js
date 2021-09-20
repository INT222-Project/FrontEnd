// store/index.js
import axios from "axios";
const API_URL = "http://localhost:8082";
import { createStore } from "vuex";

export default createStore({
  state: {
    rooms:[]
  },
  getter:{
  },
  actions: {
    loadRooms({commit}){
      axios.get(`${API_URL}/api/rooms`).then(response=>{
        commit('SET_ROOMS', response.data)
      }).catch(error=>{
        console.log(error)
      })      
    }
 },
  mutations: {
      SET_ROOMS(state,data){
        state.rooms = data
      }
  },
  modules: {
  }
});