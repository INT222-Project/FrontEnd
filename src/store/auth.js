import axios from 'axios';
const API_URL = "http://localhost:8081";
const user = JSON.parse(window.localStorage.getItem('user'));
const getUser = user != null ? {status: {isLoggedIn: true},user} : {status: {isLoggedIn: false}, user:null};
localStorage.setItem('data',JSON.stringify(getUser))
console.log('user= '+user)
export const auth = {
    namespaced:true,
    state : getUser,
    actions:{
        login({commit},payload){
            return axios.post(`${API_URL}/api/auth/authenticate`,{
                username: payload.email,
                password: payload.password
            }).then(
            response => {
                console.log(response)
                if(response.status == 400){
                    console.log('ไม่เจออะ')
                    console.log(response.status)
                }
                if(response.status == 200){
                    localStorage.setItem('token',JSON.stringify(response.data.token))
                    localStorage.setItem('user',JSON.stringify(response.data))
                    commit('auth_success',response)
                    return Promise.resolve(response)
                }
            }
            ,
            err => {
                console.log(err)
                if(err){
                    err.message = 'Incorrect email or password'
                    commit('auth_error');
                    return Promise.reject(err)
                }
            }
            )
        },
        logout({commit}){
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            commit('auth_logout');
        },
        register({commit},formData){
            return axios.post(`${API_URL}/api/auth/createUser`,formData).then(response =>{
                if(response){
                    commit('register_success')
                    return Promise.resolve(response.data)
                }
            },
                err=>{
                    if(err){
                        err.message = 'Email already exists'
                        commit('register_error')
                        return Promise.reject(err)
                    }
                }
            )
        }


    },  
    mutations:{
          register_success(state){
            state.status.isLoggedIn = false
          },
          register_error(state){
              state.status.isLoggedIn = false
          },
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
