
import cardFunctions from "../../../server/Card-Api"
const state = {
  cart:[],
  cartCount:0,
  totalPrice:null,


};
const getters = {
  getTotalPrice(state){
    return state.totalPrice
  },
  getCartCount(state){
    return state.cartCount
  },
  getCart(state){
    return state.cart
  },
};
const mutations = {
  
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
      console.log(cartItems);
    if(!cartItems.data.cart && cartItems.data.cart.products.length ==0){
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
    console.log('this is th data in vux',payload);
    commit('addToCart',payload)
  },
  
};
export default {
  state,
  getters,
  mutations,
  actions,
};