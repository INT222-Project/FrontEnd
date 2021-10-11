// store/index.js
import axios from "axios";
const API_URL = "http://localhost:8081";
import { createStore } from "vuex";

export default createStore({
  state: {  
    //user
    status:'',
    token:localStorage.getItem('token') || '',
    user:{},
    //room
    roomReq:[],
    rooms:[],
    rType:[],
    rTypeById:[],
  },
  getter:{
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  },
  actions: {
    // async login({commit},user){
    //     commit('auth_request')
    //     const response = await axios.post(`${API_URL}/api/login`,user)

    // },
    async getRooms({commit}){
      const response = await axios.get(`${API_URL}/api/rooms`);
      commit('setRooms',response.data)
    },
    async getRoomRequirementById({commit},id){
      const response = await axios.get(`${API_URL}/api/rooms/roomRequirement/${id}`)
      commit('setRoomRequirementById',response.data)
    },
    async getRoomRequirement({commit}){
      const response = await axios.get(`${API_URL}/api/rooms/roomRequirement`)
      commit('setRoomRequirement',response.data)
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
      setRoomRequirementById(state,data){
        state.roomReq = data
      },
      setRoomRequirement(state,data){
        state.roomReq = data
      },
      setRoomTypeById(state,data){
        state.rTypeById = data
      },



      auth_request(state){
        state.status = 'loading'
      },
      auth_success(state, token, user){
        state.status = 'success'
        state.token = token
        state.user = user
      },
      auth_error(state){
        state.status = 'error'
      },
      logout(state){
        state.status = ''
        state.token = ''
      },
  },
  modules: {
  }
});