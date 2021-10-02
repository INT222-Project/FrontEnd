import axios from "axios";
const API_URL = "http://localhost:8081"; //change ip

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
        return axios.post(`${API_URL}/api/rooms/add`, formData);
    }
    deleteRoom(roomId){
        return axios.delete(`${API_URL}/api/rooms/delete/${roomId}`);
    }
    editRoom(formData,roomId){
        return axios.put(`${API_URL}/api/rooms/edit/${roomId}`, formData)
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