// store/index.js
import axios from "axios";
import auth from "./auth.js"
import { createStore } from "vuex";

// const API_URL = "http://localhost:8082";
const API_URL = "https://www.beebooking.company";
let cartItems = window.localStorage.getItem('cartItems');
let cartItemCount = window.localStorage.getItem('cartItemCount')
let checkInDate = window.localStorage.getItem('checkInDate')
let checkOutDate = window.localStorage.getItem('checkOutDate')  
let token = 'Bearer '+ localStorage.getItem('token') 
const userData = JSON.parse(window.localStorage.getItem('user'));
export default createStore({
  modules:{
    auth
  },
  state: {
    url: API_URL,
    //user
    users:[],
    customer:[],
    receptionist:[],
    user: userData == null ? 0 : userData, 
    showLoading: false,
    checkIn: checkInDate ? checkInDate : '',
    checkOut:checkOutDate ? checkOutDate : '',
    //room
    rooms: [],
    remainingRoom:[],
    rType: [],
    //roomDetails , Booking
    room: {},
    roomReq: [],
    rTypeById: [],
    payment: [],
    package: [],
    reservation: [],
    allReservationDetails : [],
    getReservation: {},
    unpaid:[],
    paid:[],
    cartItems: cartItems ? JSON.parse(cartItems) : [],
    cartItemCount: cartItemCount ? JSON.parse(cartItemCount) : 0,
    reservationDetail: [],
  },
  actions: {
    async deleteReservation({commit},reservNo){
      const response = await axios.delete(`${API_URL}/api/reservations/delete/${reservNo}`,{headers:{Authorization:token}})
      commit ('setDeleteReservation',response.data)
    },
    async deleteUserRole({commit},formData){
      const response = await axios.delete(`${API_URL}/api/auth/deleteUser`,{headers:{Authorization:token},data:formData})
      commit('setDeleteUserRole',response.data)
    },
    async editUserRole({commit},formData){
      const response = await axios.put(`${API_URL}/api/auth/editRole`,formData,{headers:{Authorization:token}})
      commit('setEditUserRole',response.data)
    },
    async editCustomerPackage({commit},formData){
      const response = await axios.put(`${API_URL}/api/reservations/editCustomerPackage`,formData,{headers:{Authorization:token}})
      commit('setEditCustomerPackage',response.data)
    },
    async getAllUsers({commit}){
      const response = await axios.get(`${API_URL}/api/auth/getAllUsers`,{headers:{Authorization:token}})
      commit('setAllUsers',response.data)
    },
    async getCustomersById({ commit }) {
      const response = await axios.get(`${API_URL}/api/customers/${this.state.user.authenticationUser.customerId}`,{headers:{Authorization:token}});
      commit('setCustomers', response.data)
    },
    async getReceptionistsById({ commit }) {
      const response = await axios.get(`${API_URL}/api/receptionists/${this.state.user.authenticationUser.repId}`,{headers:{Authorization:token}});
      commit('setReceptionists', response.data)
    },
    async editCustomer({commit},formData){
      const response = await axios.put(`${API_URL}/api/customers/edit/${this.state.user.authenticationUser.customerId}`,formData,{headers:{Authorization:token}});
      commit('editCustomer', response.data);
    },
    async editReceptionist({commit},formData){
      const response = await axios.put(`${API_URL}/api/receptionists/edit/${this.state.user.authenticationUser.repId}`,formData,{headers:{Authorization:token}});
      // console.log(formData.get('editReceptionist'))
      commit('editReceptionist', response.data);
    },
    async getAllCustomer({commit}){
      const response = await axios.get(`${API_URL}/api/customers`,{headers:{Authorization:token}});
      commit('setAllCustomer',response.data)
    },
    async getAllReservationDetails({commit}){
      const response = await axios.get(`${API_URL}/api/reservationDetails`,{headers:{Authorization:token}});
      commit('setAllReservationDetails', response.data);
    },
    async getGetRemaining({commit}){
      const response = await axios.get(`${API_URL}/api/rooms/getRemainingRoom/${this.state.checkIn}/${this.state.checkOut}`);
      commit('setRemaining',response.data);
    },
    async getPackages({ commit }) {
      const response = await axios.get(`${API_URL}/api/packages`);
      commit('setPackages', response.data);
    },
    async addPackages({ commit }, formData) {
      const response = await axios.post(`${API_URL}/api/packages/add`, formData,{headers:{Authorization:token}});
      commit('newPackage', response.data);
    },
    async editPackages({ commit }, formData) {
      const response = await axios.put(`${API_URL}/api/packages/edit`,formData,{headers:{Authorization:token}});
      commit('editPackage', response.data);
    },
    async deletePackages({ commit }, packageId) {
      const response = await axios.delete(`${API_URL}/api/packages/delete/${packageId}`,{headers:{Authorization:token}});
      commit('delPackage', response.data);
    },
    async getPaymentMethods({ commit }) {
      const response = await axios.get(`${API_URL}/api/paymentMethods`,{headers:{Authorization:token}});
      commit('setPaymentMethods', response.data)
    },
    async getRooms({ commit }) {
      const response = await axios.get(`${API_URL}/api/rooms`);
      commit('setRooms', response.data)
    },
    async getAvailableRooms({ commit }) {
      const response = await axios.get(`${API_URL}/api/rooms/available`,{headers:{Authorization:token}});
      commit('setRooms', response.data)
    },
    async getUnsuccessReservation({ commit }) {
      const response = await axios.get(`${API_URL}/api/reservations/unsuccessReservation`,{headers:{Authorization:token}});
      commit('setReservationsUnsuccess', response.data)
    },
    async getRoomById({ commit }, roomId) {
      const response = await axios.get(`${API_URL}/api/rooms/${roomId}`,{headers:{Authorization:token}});
      commit('setRoomById', response.data)
    },
    async getRoomByRoomtypeId({ commit }, roomTypeId) {
      const response = await axios.get(`${API_URL}/api/rooms/roomType/${roomTypeId}`,{headers:{Authorization:token}});
      commit('setRoomByRoomtypeId', response.data)
    },
    async getRoomRequirementById({ commit }, id) {
      const response = await axios.get(`${API_URL}/api/rooms/roomRequirement/${id}`)
      commit('setRoomRequirementById', response.data)
    },
    async getRoomRequirement({ commit }) {
      const response = await axios.get(`${API_URL}/api/rooms/roomRequirement`,{headers:{Authorization:token}})
      commit('setRoomRequirement', response.data)
    },
    async getRoomType({ commit }) {
      const response = await axios.get(`${API_URL}/api/roomTypes`);
      commit('setRoomType', response.data)
    },
    async deleteRoomType({ commit }, roomTypeId) {
      const response = await axios.delete(`${API_URL}/api/roomTypes/delete/${roomTypeId}`,{headers:{Authorization:token}});
      commit('delRoomtype', response.data);
    },
    async addRoomType({ commit }, formData) {
      const response = await axios.post(`${API_URL}/api/roomTypes/add`, formData,{headers:{Authorization:token}});
      commit('newRoomType', response.data);
    },
    async editRoomType({ commit }, formData) {
      const response = await axios.put(`${API_URL}/api/roomTypes/edit`,formData,{headers:{Authorization:token}});
      commit('editRoomType', response.data);
    },
    async getRoomTypeById({ commit }, roomTypeId) {
      const response = await axios.get(`${API_URL}/api/roomTypes/${roomTypeId}`);
      commit('setRoomTypeById', response.data)
    },
    async addRoom({ commit }, formData) {
      const response = await axios.post(`${API_URL}/api/rooms/add`, formData,{headers:{Authorization:token}});
      commit('newRoom', response.data);
    },
    async deleteRoom({ commit }, roomId) {
      const response = await axios.delete(`${API_URL}/api/rooms/delete/${roomId}`,{headers:{Authorization:token}});
      commit('delRoom', response.data);
    },
    async editRoom({ commit }, formData, roomId) {
      const response = await axios.put(`${API_URL}/api/rooms/edit/${roomId}`, formData,{headers:{Authorization:token}});
      commit('editedRoom', response.data);
    },
    async addReservation({ commit }, formData) {
      const response = await axios.post(`${API_URL}/api/reservations/add`, formData,{headers:{Authorization:token}});
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
    clearDate({commit}){
      commit('clearDateItem')
    },
    addCheckInDate({ commit }, checkIn) {
      commit('addCheckIn', checkIn)
    },
    addCheckOutDate({ commit }, CheckOut) {
      commit('addCheckOut', CheckOut)
    },
    async editReservation({ commit }, formData) {
      const response = await axios.put(`${API_URL}/api/reservations/edit`, formData,{headers:{Authorization:token}});
      commit('editReservation', response.data);
    }
    ,
    async getReservationDetailByReservationNo({ commit }, reservNo) {
      const response = await axios.get(`${API_URL}/api/reservationDetails/byReservationNo/${reservNo}`,{headers:{Authorization:token}});
      commit('setReservationDetailByReservationNo', response.data);
    },
    async getReservationByCustomerId({ commit }) {
      const response = await axios.get(`${API_URL}/api/reservations/byCustomerId/${this.state.user.authenticationUser.customerId}`,{headers:{Authorization:token}});
      commit('setReservationByCustomerId', response.data);
    },
    async getReservationByReservationDetailId({ commit }, reservDetailId) {
      const response = await axios.get(`${API_URL}/api/reservations/byReservationDetailId/${reservDetailId}`,{headers:{Authorization:token}});
      commit('setReservationByReservationDetailId', response.data);
    },
    async getUnpaidReservation({ commit }) {
      const response = await axios.get(`${API_URL}/api/reservations/unpaidReservation`,{headers:{Authorization:token}});
      commit('setUnpaid', response.data)
    },
    async getPaidReservation({ commit }) {
      const response = await axios.get(`${API_URL}/api/reservations/successReservation`,{headers:{Authorization:token}});
      commit('setPaid', response.data)
    },
  },
  mutations: {
    setDeleteReservation(state,data){
      state.reservation = state.reservation.filter(d => d.id != data)
    },
    setDeleteUserRole(state,data){
      state.users = state.users.filter(user => {
        if(user.role[0].authority == "customer" && user.authenticationUser.customerId == data.customerId) return user.authenticationUser.customerId == data.customerId;
        else if(user.role[0].authority == "receptionist" && user.authenticationUser.repId == data.repId) return user.authenticationUser.repId == data.repId;
      })
      state.users = data
    },
    setEditUserRole(state,data){
      state.users = data
    },
    setEditCustomerPackage(state,data){
      state.reservation = data
    },
    setAllUsers(state,data){
      state.users = data
    },
    setCustomers(state,data){
      state.customer = data
    },
    setReceptionists(state,data){
      state.receptionist = data
    },
    editCustomer(state,data){
      state.customer = data
    },
    editReceptionist(state,data){
       state.receptionist = data
    },
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
    setAllReservationDetails(state,data){
      state.allReservationDetails = data
    },
    setUnpaid(state,data){
      state.unpaid = data
    },
    setPaid(state,data){
      state.paid = data
    },
    addCheckIn(state,data){
      state.checkIn = data;
      this.commit('saveCheckIn');
    },
    addCheckOut(state,data){
      state.checkOut = data;
      this.commit('saveCheckOut')
    },
    addToCart(state, room) {
      state.cartItems.push(room)
      state.cartItemCount++
      this.commit('saveData');
      this.commit('saveCountData')
    },
    clearDateItem(state){
      state.checkIn = '';
      state.checkOut = '';
      this.commit('saveCheckIn');
      this.commit('saveCheckOut');
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
    saveCheckIn(state) {
      window.localStorage.setItem('checkInDate', state.checkIn)
    },
    saveCheckOut(state){
      window.localStorage.setItem('checkOutDate', state.checkOut)
    },
    saveData(state) {
      window.localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    saveCountData(state) {
      window.localStorage.setItem('cartItemCount', JSON.stringify(state.cartItemCount))
    },
    setReservationByCustomerId(state, data) {
      state.reservation = data;
    },
    setRemaining(state,data){
      state.remainingRoom = data;
    },
    setAllCustomer(state,data){
      state.users.push(data)
    },
  },
});