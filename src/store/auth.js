import axios from 'axios';
const API_URL = "http://localhost:8081";
const user = JSON.parse(window.localStorage.getItem('user'));
const getUser = user != null ? {status: {isLoggedIn: true},user} : {status: {isLoggedIn: false}, user:null};
localStorage.setItem('data',JSON.stringify(getUser))
console.log(user)
export const auth = {
    namespaced:true,
    state : getUser,
    actions:{
        login({commit},payload){
            return axios.post(`${API_URL}/api/auth/authenticate`,{
                username: payload.email,
                password: payload.password
            }).then(response => {
                if(response){
                    localStorage.setItem('token',JSON.stringify(response.data.token))
                    localStorage.setItem('user',JSON.stringify(response.data))
                }
                commit('auth_success',response)
                return Promise.resolve(response)
            },
            err => {
                commit('auth_error');
                return Promise.reject(err)
            }
            )
        },
        logout({commit}){
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            commit('auth_logout');
        }


    },  
    mutations:{
          auth_success(state, response){
            state.status.isLoggedIn = true
            state.user = response.data
          },
          auth_error(state){
            state.status.isLoggedIn = false
          },
          auth_logout(state){
            state.status.isLoggedIn = false
          }
    }
}
export default auth
