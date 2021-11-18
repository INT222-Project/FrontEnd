import axios from 'axios';
const API_URL = "http://localhost:8081";
const user = JSON.parse(window.localStorage.getItem('user'));
export const auth = {
    namespaced:true,
    state :{
        user:user,
        status:'',
        token: localStorage.getItem('token') || '',
    },
    actions:{
        login({commit},payload){
            return axios.post(`${API_URL}/api/auth/authenticate`,{
                username: payload.email,
                password: payload.password
            }).then(response => {
                if(response){
                    localStorage.setItem('user',JSON.stringify(response.data.token))
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
            localStorage.removeItem('user');
            commit('auth_logout');
        }


    },  
    mutations:{
          auth_success(state, response){
            state.status = 'success'
            state.user = response
          },
          auth_error(state){
            state.status = 'error'
          },
          auth_logout(state){
            state.status = ''
          }
    }
}
export default auth
