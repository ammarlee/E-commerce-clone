import Vue from "vue";
import Vuex from "vuex";
import Functions from "../../server/api"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products:null,
    user:null,
    notifications:[],
    errors:null,
    loading:false,
    isAuthanticated:false,
    token:null,
    play:null,
    cart:[],
    cartCount:0,
    totalPrice:null,
    searching:null,
    category:null,
    drawer:false,
    rightDrawer:false

    
  },
  // GETTERS TO SEND DATA ANOTHER PLACE 
  getters:{
    drawer(state) {
      return state.drawer;
    },
    notifications(state) {
      return state.notifications;
    },
    rightDrawer(state) {
      return state.rightDrawer;
    },
    getCategory(state){
      return state.category
    },
    getUser(state){
      return state.user
    },
    getTotalPrice(state){
      return state.totalPrice
    },
    getCartCount(state){
      return state.cartCount
    },
    getCart(state){
      return state.cart
    },
    isLoggedIn(state){
      return state.isAuthanticated
    },
    token(state){
      return state.token
    },
    getProducts(state){
      return state.products
    },
    // get single product with id 
    singleProduct(state){
      return (singleId)=>{
        return state.products.find(p=>{
          return p._id ==singleId
        })
      }
    },
    getSearching(state){
      return state.searching
    }

  },
  mutations: {
    toggleDrawer(state, value) {
      state.drawer = value;
    },
    notifications(state, value) {
      state.notifications.push(value) ;
    },
    toggleRightDrawer(state, value) {
      state.rightDrawer = value;
    },
    setCategory(state,payload){
      state.category=payload
    },
    pushCategory(state,payload){
      state.category.push(payload)
    },
    pushProduct(state,payload){
      state.products.posts.push(payload)
    },
    removeCategory(state,payload){
      const category= state.category.filter(p=>{
        return  p._id !== payload
       })
       state.category= category
    },
    removeProduct(state,payload){
      const posts= state.products.posts.filter(p=>{
       return  p._id !== payload
      })
      state.products.posts= posts
    },
    setProducts(state,payload){
      state.products=payload
    },
   
    setSearchingResult(state,payload){
      state.searching = payload

    },
    setUser(state,user){
      state.user= user
    },
    token(state,token){
      state.token=token
    },
    isAuthanticated(state,payload){
      state.isAuthanticated = payload
    },
    getProducts(state,data){
      state.products = data 
    },
    
    logoutUser(state){
      state.isAuthanticated = false
    },
    addToCart(state,payload){
      state.cart.push(payload)
    },
    setErros(state,payload){
      state.errors = payload
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

  },
  // THE ALL ACTIONS
  actions: {
    removeProduct({commit},payload){
      commit('removeProduct',payload)

    },
    removeCategory({commit},payload){
      commit('removeCategory',payload)

    },
    notifications({commit},payload){
      console.log(payload);
      commit('notifications',payload)

    },
    
    pushCategory({commit},payload){
      commit('pushCategory',payload)

    },
    pushProduct({commit},payload){
      commit('pushProduct',payload)

    },
    toggleDrawer({ commit }, value) {
      commit("toggleDrawer", value);
    },
    toggleRightDrawer({ commit }, value) {
      commit("toggleRightDrawer", value);
    },
    async fetchCategory({commit}){
      
      try {
      let cat =  await Functions.getCat()
      
      const t=[]
      cat.data.cat.forEach(p=>{
       return t.push(p)
      })
      commit('setCategory',t)
        }catch(err){
console.log(err);
        }
  
     
  
      },
    // GET ALL DETAILS ABOUT THE CARD BELONG TO THE CURRENT USER
    async findCart({commit,getters},userId){
      
    try {
    let cartItems =  await Functions.getCardItems({userId,token:getters.token})
      if(cartItems.data.cart.products.length ==0){
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
    // CREATE NEW PRODUCT AND THEN ADD IT TO THE DATABASE 
   async creatProduct({commit},payload){
      try{
       let newone= await Functions.postProduct(payload)
     
         commit('setProducts',newone)
      }catch(err){
        console.log(err);
      }
    },
    // DELETE A SINGLE PRODUCT FROM THE DATABASE 
   async deleteProduct({dispatch},id){
     try{
     await Functions.deleteProduct(id)
     dispatch('getProducts')

     }catch(err){
       console.log(err);
     }
      
    },
 
  // SET THE DATA OF THE USER IN STATE
  setUser({commit},user){
    commit('setUser',user)

  },
  // SET THE SATAE OF THE USER 
  setAuth({commit},isauth){
    commit('isAuthanticated',isauth)

  },
  setCart({commit},payload){
    commit('setCart',payload)

  },
 
  resetcartCount({commit},payload){
    commit('resetcartCount',payload)


  },
  // SET TOKEN FOR USER 
  setToken({commit},token){
    commit('token',token)

  },
  // FETCH ALL PRODUCTS FROM DATABASE 
  async getProducts({commit}){
    try {
      const data = await Functions.fetchProducts()
      commit('setProducts',data.data)
    } catch (error) {
      console.log(error);
      commit('setErros',error)
      
    }
  },
  async addToCart({commit},payload){
    console.log('this is th data in vux',payload);
    commit('addToCart',payload)
  },
  
  },
  modules: {}
});
