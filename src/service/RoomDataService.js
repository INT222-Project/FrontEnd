import axios from "axios";
// const API_URL = "http://localhost:8081";
const API_URL = "https://www.beebooking.company";
let token = 'Bearer '+ localStorage.getItem('token') 

class RoomDataService{
    retrieveAllRoom(){
        return axios.get(`${API_URL}/api/rooms`);
    }
    retrieveAllPackage(){
        return axios.get(`${API_URL}/api/packages`)
    }
    retrieveAllRoomtypes(){
        return axios.get(`${API_URL}/api/roomTypes`)
    }
    addNewRoom(formData){
        return axios.post(`${API_URL}/api/rooms/add`, formData,{headers:{Authorization:token}})
    }
    deleteRoom(roomId){
        return axios.delete(`${API_URL}/api/rooms/delete/${roomId}`,{headers:{Authorization:token}})
    }
    editRoom(formData,roomId){
        return axios.put(`${API_URL}/api/rooms/edit/${roomId}`, formData,{headers:{Authorization:token}})
    }
    


    
    getImage(roomId){
        return axios.get(`${API_URL}/api/showImage/${roomId}`);
    }
    getImageSource(roomId){
        return axios.get(`${API_URL}/api/getImageSource/${roomId}`);
    }
    uploadImage(file){
        return axios.post(`${API_URL}/api/uploadImage`,file,{headers: {'Content-Type' : 'multipart/form-data' }});
    }

}
export default new RoomDataService();