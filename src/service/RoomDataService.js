import axios from "axios";
const API_URL = "http://localhost:8082";

class RoomDataService{
    retrieveAllRoom(){
        return axios.get(`${API_URL}/api/rooms`);
    }
    retrieveProductColor(productCode){
        return axios.get(`${API_URL}/api/productscolor/${productCode}`);
    }
    retrieveAllBrands(){
        return axios.get(`${API_URL}/api/brands`)
    }
    retrieveAllProductColor(){
        return axios.get(`${API_URL}/api/productcolors`)
    }

    getImage(productCode){
        return axios.get(`${API_URL}/api/showImage/${productCode}`);
    }
    getImageSource(productCode){
        return axios.get(`${API_URL}/api/getImageSource/${productCode}`);
    }
    retrieveAllColor(){
        return axios.get(`${API_URL}/api/colors`)
    }
    uploadImage(file){
        return axios.post(`${API_URL}/api/uploadImage`,file,{headers: {'Content-Type' : 'multipart/form-data' }});
    }
    addProduct(formData){
        return axios.post(`${API_URL}/api/create`, formData);
    }
    editProducts(formData,productCode){
        return axios.put(`${API_URL}/api/editproduct/${productCode}`, formData)
    }
    detleteProduct(productCode){
        return axios.delete(`${API_URL}/api/deleteproduct/${productCode}`);
    }
}
export default new RoomDataService();