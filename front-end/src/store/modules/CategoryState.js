
import categoryFunctions from "../../../server/Category-Api"
const state = {
  category:null,
  

}
const getters = {
  getCategory(state){
    return state.category
  },

}
const mutations = {
  setCategory(state,payload){
    state.category=payload
  },
  pushCategory(state,payload){
    state.category.push(payload)
  },
 
  removeCategory(state,payload){
    const category= state.category.filter(p=>{
      return  p._id !== payload
    })
    state.category= category
  },
  editCategory(state,payload){
    let all = state.category
    const findItemIndex =state.category.findIndex(i=>{
      return i._id.toString() ==payload._id.toString()
    })
    all[findItemIndex] ={...payload}
    state.category=all
    


  }
}
const actions = {
  removeCategory({commit},payload){
    commit('removeCategory',payload)

  },
  
  pushCategory({commit},payload){
    commit('pushCategory',payload)
  },
  editCategory({commit},payload){
    commit('editCategory',payload)
  },
  async fetchCategory({commit}){
    try {
    let cat =  await categoryFunctions.getCat()
  //  commit('getProducts')

    const t=[]
    cat.data.cat.forEach(p=>{
     return t.push(p)
    })
    commit('setCategory',t)
      }catch(err){
        console.log(err);
      }
    },

     
    
}
export default {
    state,
    getters,
    mutations,
    actions
}