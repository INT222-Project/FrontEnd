// store/index.js
import axios from "axios";
import { createStore } from "vuex";
const API_URL = "http://localhost:8081";
let cartItems = window.localStorage.getItem('cartItems') ;
let cartItemCount = window.localStorage.getItem('cartItemCount')
export default createStore({
  state: {  
    url:"http://localhost:8081",
    //user
    status:'',
    token:localStorage.getItem('token') || '',
    user:{},
    showLoading:false,
    //room
    rooms:[],
    rType:[],
    //roomDetails , Booking
    room:{},
    roomReq:[],
    rTypeById:[],
    payment:[],
    package:[],
    reservation:[],

    cartItems: cartItems ? JSON.parse(cartItems) : [],
    cartItemCount: cartItemCount ? JSON.parse(cartItemCount) : 0,
    reservationDetail: [],
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
    async getPackages({commit}){
      const response = await axios.get(`${API_URL}/api/packages`);
      commit('setPackages',response.data)
    },
    async getPaymentMethods({commit}){
      const response = await axios.get(`${API_URL}/api/paymentMethods`);
      commit('setPaymentMethods',response.data)
    },
    async getRooms({commit}){
      const response = await axios.get(`${API_URL}/api/rooms`);
      commit('setRooms',response.data)
    },
    async getUnsuccessReservation({commit}){
      const response = await axios.get(`${API_URL}/api/reservations/unsuccessReservation`);
      commit('setReservationsUnsuccess',response.data)
    },
    async getRoomById({commit},roomId){
      const response = await axios.get(`${API_URL}/api/rooms/${roomId}`);
      commit('setRoomById',response.data)
    },
    async getRoomByRoomtypeId({commit},roomTypeId){
      const response = await axios.get(`${API_URL}/api/rooms/roomType/${roomTypeId}`);
      commit('setRoomByRoomtypeId',response.data)
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
    async getRoomTypeById({commit},roomTypeId){
      const response = await axios.get(`${API_URL}/api/roomTypes/${roomTypeId}`);
      commit('setRoomTypeById',response.data)
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
    async addReservation({commit}, formData){
      const response = await axios.post(`${API_URL}/api/reservations/add`,formData);
      commit('newReservation',response.data);
    },
    addRoomToCart({commit},room){
      commit('addToCart',room)
    },
    removeCartItem({commit},room){
      commit('removeItem',room)
    },
    clearItemInCart({commit}){
      commit('clearItem')
    },
    async editReservation({commit} , formData){
      const response = await axios.put(`${API_URL}/api/reservations/edit`,formData);
      commit('editReservation',response.data);
    }
    ,
    async getReservationDetailByReservationNo({commit}, reservNo){
      const response = await axios.get(`${API_URL}/api/reservationDetails/byReservationNo/${reservNo}`);
      commit('setReservationDetailByReservationNo', response.data);
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
      setPackages(state,data){
        state.package = data
      },
      setRoomById(state,data){
        state.room = data
      },
      setPaymentMethods(state,data){
        state.payment = data
      },
      newReservation(state,data){
        state.reservation = data
        // state.cartItemCount = 0;
        // state.cartItems = []
        // this.commit('saveData');
        // this.commit('saveCountData')
      },
      editReservation(state,data){
        state.reservation = data
      }
      ,
      setReservationsUnsuccess(state,data){
        state.reservation = data
      },
      setRoomByRoomtypeId(state,data){
        state.rooms = data
      },
      setReservationDetailByReservationNo(state,data){
        state.reservationDetail = data
      },
      addToCart(state,room){
        state.cartItems.push(room)
        state.cartItemCount++
        this.commit('saveData');
        this.commit('saveCountData')
      },
      removeItem(state,room){
        let index = state.cartItems.indexOf(room);
        state.cartItems.splice(index,1);
        state.cartItemCount--
        this.commit('saveData');
        this.commit('saveCountData')
      },
      clearItem(state){
        state.cartItemCount = 0;
        state.cartItems = []
        this.commit('saveData');
        this.commit('saveCountData')
      },
      saveData(state){
        window.localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
      },
      saveCountData(state){
        window.localStorage.setItem('cartItemCount',JSON.stringify(state.cartItemCount))
      },

      // auth_request(state){
      //   state.status = 'loading'
      // },
      // auth_success(state, token, user){
      //   state.status = 'success'
      //   state.token = token
      //   state.user = user
      // },
      // auth_error(state){
      //   state.status = 'error'
      // },
      // logout(state){
      //   state.status = ''
      //   state.token = ''
      // },
  },
  modules: {
  }
});