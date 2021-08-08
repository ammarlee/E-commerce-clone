
import cardFunctions from "../../../server/Card-Api"
const state = {
  cart:[],
  cartCount:0,
  totalPrice:null,
  shipping:null,


};
const getters = {
  getTotalPrice(state){
    return state.totalPrice
  },
  shipping(state){
    let getshipping= localStorage.getItem('setShippingData')
    return state.shipping ||JSON.parse(getshipping) 
  },
  getCartCount(state){
    return state.cartCount
  },
  getCart(state){
    return state.cart
  },
};
const mutations = {
  setShippingData(state,payload){
    localStorage.setItem("setShippingData",JSON.stringify(payload));
    state.shipping = payload


  },
  
  addToCart(state,payload){
    state.cart.push(payload)
  },
  setCart(state,payload){
    state.cart=payload
  },
  setTotalPrice(state,payload){
    state.totalPrice=payload
  },
  cartCount(state){
    state.cartCount +=1
  },
  resetcartCount(state,payload){
    state.cartCount =payload
  }
};
const actions = {
  // GET ALL DETAILS ABOUT THE CARD BELONG TO THE CURRENT USER
  async findCart({commit,getters},userId){
      
    try {
    let cartItems =  await cardFunctions.getCardItems({userId,token:getters.token})
    if(!cartItems.data.cart){
        commit('resetcartCount',0)
      }else{
        const cart = cartItems.data.cart
        let thecartPrice=cartItems.data.cart.products

        const totalcart= thecartPrice.reduce((accumulator, currentValue)=>{
          return accumulator+ currentValue.price * currentValue.quantity
  
        },0)
  
        const sumItem= thecartPrice.reduce((accumulator, currentValue)=>{
          return  accumulator + currentValue.quantity
        },0)
        this.sum = sumItem
        commit('resetcartCount',sumItem)
        commit('setTotalPrice',totalcart)
        commit('setCart',cart)
      }

    } catch (error) {
      console.log(error);
      this.errors = 'you have to login to be able to show your cart'
    }
    },
  setCart({commit},payload){
    commit('setCart',payload)
  },
 
  resetcartCount({commit},payload){
    commit('resetcartCount',payload)

  },
  async addToCart({commit},payload){
    commit('addToCart',payload)
  },
  
};
export default {
  state,
  getters,
  mutations,
  actions,
};
