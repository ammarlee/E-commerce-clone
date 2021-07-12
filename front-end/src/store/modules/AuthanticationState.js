

const state = {
    user:null,
    isAuthanticated:false,
    token:null,
}
const getters = {
    getUser(){
        // return state.user
        let getuser = localStorage.getItem('user')
          return JSON.parse(getuser)
      },
      isLoggedIn(state){
        return state.isAuthanticated
      },
      token(state){
        return state.token
      },

}
const mutations = {
    setUser(state,user){
        state.user= user
      },
      token(state,token){
        state.token=token
      },
      isAuthanticated(state,payload){
        state.isAuthanticated = payload
      },
      logoutUser(state){
        state.isAuthanticated = false
        localStorage.setItem("user",JSON.stringify(null));
      localStorage.setItem("userToken", JSON.stringify(null));


       
      },

}
const actions = {
    logoutUser({dispatch,commit}){
      console.log('logout now');
        dispatch('setUser',null)
        commit('logoutUser')
        dispatch('setAuth',false)
        dispatch('resetcartCount',0)
        dispatch('setCart',null)
  
      },
      autoSigningUser({ dispatch }, currentUser){
        dispatch('setUser',currentUser)
        dispatch('setAuth',currentUser.authanticated)
        dispatch('setToken',currentUser.token)
        dispatch('findCart',currentUser._id)
  
      },
      setallUserData({ dispatch }, currentUser) {
        const token = currentUser.data.token
        let CurrentDate = new Date();
       CurrentDate.setTime(CurrentDate.getTime() + 1 * 24 * 60 * 60 * 7 *1000);
       let expires = "expires=" + CurrentDate.toUTCString();
       document.cookie =
   "TokenUser=" + token + ";" + expires + ";path=/";
      currentUser.data.user.authanticated =true;
      currentUser.data.user.token =token;
      dispatch('setUser',currentUser.data.user)
      dispatch('setAuth',currentUser.data.authanticated)
      dispatch('setToken',token)
      dispatch('findCart',currentUser.data.user._id)
        localStorage.setItem("userToken", token);
        localStorage.setItem("user",JSON.stringify(currentUser.data.user));
      },
       // SET THE DATA OF THE USER IN STATE
  setUser({commit},user){
    commit('setUser',user)

  },
  // SET THE SATAE OF THE USER 
  setAuth({commit},isauth){
    commit('isAuthanticated',isauth)

  },
  // SET TOKEN FOR USER 
  setToken({commit},token){
    commit('token',token)

  },
    
}
export default {
    state,
    getters,
    mutations,
    actions
}