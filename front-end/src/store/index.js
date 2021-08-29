import Vue from "vue";
import Vuex from "vuex";

import AuthanticationState from "./modules/AuthanticationState"
import CardState from "./modules/CardState.js"
import CategoryState from "./modules/CategoryState"
import DrawerState from "./modules/DrawerState"
import ProductState from "./modules/ProductState"

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    notifications:[],
    errors:null,
    overlay:false,
    loading:false,
    play:null,
    searching:null,
    
  },
  // GETTERS TO SEND DATA ANOTHER PLACE 
  getters:{
    notifications(state) {
      return state.notifications;
    },
    overlay(state) {
      return state.overlay;
    },
   
    getSearching(state){
      return state.searching
    }
  },
  mutations: {
    setOverLay(state, value){
      state.overlay=value
    },
    
    notifications(state, value) {
      state.notifications.push(value) ;
    },
    setSearchingResult(state,payload){
      state.searching = payload

    },
   
    setErros(state,payload){
      state.errors = payload
    },
   

  },
  // THE ALL ACTIONS
  actions: {
    notifications({commit},payload){
      commit('notifications',payload)
    },
  
    
  },
  modules: {
    AuthanticationState,
    CardState,
    CategoryState,
    DrawerState,
    ProductState
  }
});
