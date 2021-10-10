// store/index.js
import axios from "axios";
const API_URL = "http://localhost:8081";
import { createStore } from "vuex";

export default createStore({
  state: {
    rooms:[],
    rType:[],
    rTypeById:[],
  },
  getter:{
  },
  actions: {
    async getRooms({commit}){
      const response = await axios.get(`${API_URL}/api/rooms`);
      commit('setRooms',response.data)
    },
    async getRoomType({commit}){
      const response = await axios.get(`${API_URL}/api/roomTypes`);
      commit('setRoomType',response.data)
    },
    async addRoom({commit}, formData){
      const response = await axios.post(`${API_URL}/api/rooms/add`,formData);
      commit('newRoom',response.data);
    },
    async deleteRoom({commit}, roomId){
      const response = await axios.delete(`${API_URL}/api/rooms/delete/${roomId}`);
      commit('delRoom',response.data);
    },
    async editRoom({commit},formData,roomId){
      const response = await axios.put(`${API_URL}/api/rooms/edit/${roomId}`,formData);
      commit('editedRoom',response.data);
    },
    async getRoomTypeById({commit},roomTypeId){
      const response = await axios.get(`${API_URL}/api/roomTypes/${roomTypeId}`);
      commit('setRoomTypeById',response.data)
    }
 },
  mutations: {
      setRooms(state,data){
        state.rooms = data
      },
      newRoom(state,data){
        state.rooms.push(data)
      },
      setRoomType(state,data){
        state.rType = data
      },
      delRoom(state,data){
        state.rooms = state.rooms.filter(d=>d.id != data)
      },
      setRoomTypeById(state,data){
        state.rTypeById = data
      }
      // editedRoom(state,data){
      //   const index = state.rooms.findIndex()
      // }
  },
  modules: {
  }
});