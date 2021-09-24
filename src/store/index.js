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
        commit('setRooms', response.data)
      }).catch(error=>{
        console.log(error)
      })      
    },
    async addRoom({commit}, room){
      const response = await axios.post(`${API_URL}/api/rooms/add`,room)
      commit('newRoom',response.data);
    }
 },
  mutations: {
      setRooms(state,data){
        state.rooms = data
      },
      newRoom(state,data){
        state.rooms.push(data)
      }
  },
  modules: {
  }
});