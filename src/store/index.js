import { createStore } from 'vuex'
import getAPI from "../../services/getAPI";

export default createStore({
  state: {
    user:{
      balance:{},
    },
    products:{
    },
    compras:{},
  },
  getters: {
  },
  mutations: {
    get_user(state,data){
      state.user = data
    },
    comprasUpdate(state,data){
      state.compras = data
    },
    balance_user(state, data){
      state.user.balance.balance = data
    },
    logoutUser(state){
      state.user = null;
      state.compras = null;
    },
    stockUpdate(state,data){
      state.products = data
    }
  },
  actions: {
    updateBalance({ commit }){
      getAPI('get-user').then(response =>{
        commit('get_user',response.data)
      }).catch(error =>{
        console.log(error)
      });
    },

    updateCompras({ commit }){
      getAPI('get-list-order').then(response =>{
        commit('comprasUpdate',response)
      }).catch(error =>{
        console.log(error)
      })
    },

    updateStock({ commit }){
      getAPI('get_all_products').then(response =>{
        commit('stockUpdate',response.data)
      }).catch(error =>{
        console.log(error)
      })
    },

    logoutUser({commit}){
      try {
        commit('logoutUser');
      }catch (error){
        console.log(error)
      }
    }
  },
  modules: {
  }
})
