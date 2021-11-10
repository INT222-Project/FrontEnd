// store/index.js
import axios from "axios";
import auth from "./auth.js"
import { createStore } from "vuex";
const API_URL = "http://localhost:8081";
let cartItems = window.localStorage.getItem('cartItems');
let cartItemCount = window.localStorage.getItem('cartItemCount')
export default createStore({
  modules:{
    auth
  },
  state: {
    url: "http://localhost:8081",
    // stock:[{}],
    //user
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    showLoading: false,
    //room
    rooms: [],
    rType: [],
    //roomDetails , Booking
    room: {},
    roomReq: [],
    rTypeById: [],
    payment: [],
    package: [],
    reservation: [],
    getReservation: {},
    unpaid:[],
    paid:[],
    cartItems: cartItems ? JSON.parse(cartItems) : [],
    cartItemCount: cartItemCount ? JSON.parse(cartItemCount) : 0,
    reservationDetail: [],
  },
  getter: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  },
  actions: {
    // async login({commit},user){
    //     commit('auth_request')
    //     const response = await axios.post(`${API_URL}/api/login`,user)
    // },
    async getPackages({ commit }) {
      const response = await axios.get(`${API_URL}/api/packages`);
      commit('setPackages', response.data)
    },
    async addPackages({ commit }, formData) {
      const response = await axios.post(`${API_URL}/api/packages/add`, formData);
      commit('newPackage', response.data);
    },
    async editPackages({ commit }, formData) {
      const response = await axios.put(`${API_URL}/api/packages/edit`,formData);
      commit('editPackage', response.data);
    },
    async deletePackages({ commit }, packageId) {
      const response = await axios.delete(`${API_URL}/api/packages/delete/${packageId}`);
      commit('delPackage', response.data);
    },
    async getPaymentMethods({ commit }) {
      const response = await axios.get(`${API_URL}/api/paymentMethods`);
      commit('setPaymentMethods', response.data)
    },
    async getRooms({ commit }) {
      const response = await axios.get(`${API_URL}/api/rooms`);
      commit('setRooms', response.data)
    },
    async getAvailableRooms({ commit }) {
      const response = await axios.get(`${API_URL}/api/rooms/available`);
      commit('setRooms', response.data)
    },
    async getUnsuccessReservation({ commit }) {
      const response = await axios.get(`${API_URL}/api/reservations/unsuccessReservation`);
      commit('setReservationsUnsuccess', response.data)
    },
    async getRoomById({ commit }, roomId) {
      const response = await axios.get(`${API_URL}/api/rooms/${roomId}`);
      commit('setRoomById', response.data)
    },
    async getRoomByRoomtypeId({ commit }, roomTypeId) {
      const response = await axios.get(`${API_URL}/api/rooms/roomType/${roomTypeId}`);
      commit('setRoomByRoomtypeId', response.data)
    },
    async getRoomRequirementById({ commit }, id) {
      const response = await axios.get(`${API_URL}/api/rooms/roomRequirement/${id}`)
      commit('setRoomRequirementById', response.data)
    },
    async getRoomRequirement({ commit }) {
      const response = await axios.get(`${API_URL}/api/rooms/roomRequirement`)
      commit('setRoomRequirement', response.data)
    },
    async getRoomType({ commit }) {
      const response = await axios.get(`${API_URL}/api/roomTypes`);
      commit('setRoomType', response.data)
    },
    async deleteRoomType({ commit }, roomTypeId) {
      const response = await axios.delete(`${API_URL}/api/roomTypes/delete/${roomTypeId}`);
      commit('delRoomtype', response.data);
    },
    async addRoomType({ commit }, formData) {
      const response = await axios.post(`${API_URL}/api/roomTypes/add`, formData);
      commit('newRoomType', response.data);
    },
    async editRoomType({ commit }, formData) {
      const response = await axios.put(`${API_URL}/api/roomTypes/edit`,formData);
      commit('editRoomType', response.data);
    },
    async getRoomTypeById({ commit }, roomTypeId) {
      const response = await axios.get(`${API_URL}/api/roomTypes/${roomTypeId}`);
      commit('setRoomTypeById', response.data)
    },
    async addRoom({ commit }, formData) {
      const response = await axios.post(`${API_URL}/api/rooms/add`, formData);
      commit('newRoom', response.data);
    },
    async deleteRoom({ commit }, roomId) {
      const response = await axios.delete(`${API_URL}/api/rooms/delete/${roomId}`);
      commit('delRoom', response.data);
    },
    async editRoom({ commit }, formData, roomId) {
      const response = await axios.put(`${API_URL}/api/rooms/edit/${roomId}`, formData);
      commit('editedRoom', response.data);
    },
    async addReservation({ commit }, formData) {
      const response = await axios.post(`${API_URL}/api/reservations/add`, formData);
      commit('newReservation', response.data);
    },
    addRoomToCart({ commit }, room) {
      commit('addToCart', room)
    },
    removeCartItem({ commit }, room) {
      commit('removeItem', room)
    },
    clearItemInCart({ commit }) {
      commit('clearItem')
    },
    async editReservation({ commit }, formData) {
      const response = await axios.put(`${API_URL}/api/reservations/edit`, formData);
      commit('editReservation', response.data);
    }
    ,
    async getReservationDetailByReservationNo({ commit }, reservNo) {
      const response = await axios.get(`${API_URL}/api/reservationDetails/byReservationNo/${reservNo}`);
      commit('setReservationDetailByReservationNo', response.data);
    },
    async getReservationByCustomerId({ commit }, customerId) {
      const response = await axios.get(`${API_URL}/api/reservations/byCustomerId/${customerId}`);
      commit('setReservationByCustomerId', response.data);
    },
    async getReservationByReservationDetailId({ commit }, reservDetailId) {
      const response = await axios.get(`${API_URL}/api/reservations/byReservationDetailId/${reservDetailId}`);
      commit('setReservationByReservationDetailId', response.data);
    },
    async getUnpaidReservation({ commit }) {
      const response = await axios.get(`${API_URL}/api/reservations/unpaidReservation`);
      commit('setUnpaid', response.data)
    },
    async getPaidReservation({ commit }) {
      const response = await axios.get(`${API_URL}/api/reservations/successReservation`);
      commit('setPaid', response.data)
    },
  },
  mutations: {
    setRooms(state, data) {
      state.rooms = data
    },
    newRoom(state, data) {
      state.rooms.push(data)
    },
    setRoomType(state, data) {
      state.rType = data
    },
    delRoom(state, data) {
      state.rooms = state.rooms.filter(d => d.id != data)
    },
    setRoomRequirementById(state, data) {
      state.roomReq = data
    },
    setRoomRequirement(state, data) {
      state.roomReq = data
    },
    setRoomTypeById(state, data) {
      state.rTypeById = data
    },
    setPackages(state, data) {
      state.package = data
    },
    newPackage(state,data){
      state.package.push(data)
    },
    delPackage(state,data){
      state.package = state.package.filter(d => d.id != data)
    },
    newRoomType(state,data){
      state.rType.push(data)
    },
    delRoomtype(state,data){
      state.rType = state.rType.filter(d => d.id != data)
    },
    editPackage(state,data){
      const index = state.package.findIndex(r => r.packageId == data.packageId);
      if(index){
        state.package = state.package.splice(index,data);
      }
    },
    editRoomType(state,data){
      const index = state.rType.findIndex(r => r.roomTypeId == data.roomTypeId);
      if(index){
        state.rType = state.rType.splice(index,data);
      }
    },
    setRoomById(state, data) {
      state.room = data
    },
    setPaymentMethods(state, data) {
      state.payment = data
    },
    newReservation(state, data) {
      state.reservation = data
    },
    editReservation(state, data) {
      state.reservation = data
    }
    ,
    setReservationsUnsuccess(state, data) {
      state.reservation = data
    },
    setRoomByRoomtypeId(state, data) {
      state.rooms = data
    },
    setReservationDetailByReservationNo(state, data) {
      state.reservationDetail = data
    },
    setReservationByReservationDetailId(state, data) {
      state.getReservation = data
    },
    setUnpaid(state,data){
      state.unpaid = data
    },
    setPaid(state,data){
      state.paid = data
    },
    addToCart(state, room) {
      state.cartItems.push(room)
      state.cartItemCount++
      this.commit('saveData');
      this.commit('saveCountData')
    },
    removeItem(state, room) {
      let index = state.cartItems.indexOf(room);
      state.cartItems.splice(index, 1);
      state.cartItemCount--
      this.commit('saveData');
      this.commit('saveCountData')
    },
    clearItem(state) {
      state.cartItemCount = 0;
      state.cartItems = []
      this.commit('saveData');
      this.commit('saveCountData')
    },
    saveData(state) {
      window.localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    saveCountData(state) {
      window.localStorage.setItem('cartItemCount', JSON.stringify(state.cartItemCount))
    },
    setReservationByCustomerId(state, data) {
      state.reservation = data;
    }

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
});