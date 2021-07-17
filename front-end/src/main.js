import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from 'axios'
import VueAxios from 'vue-axios'
import socktConnect from "socket.io-client";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Mixins from './plugins/mixins';
import VueImg from 'v-img';
Vue.use(VueImg);
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'
Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})
const vueImgConfig = {
  // Consider alt of image as its title in gallery?
  altAsTitle: false,
}
import moment from 'moment'

Vue.use(VueImg, vueImgConfig);
Vue.mixin(Mixins);
Vue.filter('formateDate', function (value) {
  return moment(value).format("LLL")
})

  
Vue.use(VueSweetalert2);
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
async  mounted() {
  let currentUrl = 'http://localhost:3000/'
  // let currentUrl = 'https://ammarshop.herokuapp.com/'
  
  try{
    this.$store.commit('resetcartCount',0)
    await this.$store.dispatch('getProducts')
    const socket = socktConnect(currentUrl)
    socket.on('category',data=>{
      if(data.action == 'create'){
        this.$store.dispatch('pushCategory',data.category)
      }
      else if(data.action == 'deleteCategory'){
        this.$store.dispatch('removeCategory',data.category._id)
      }
      else if(data.action == 'edit'){
        this.$store.dispatch('editCategory',data.category)
      }
     else if(data.action == 'createProduct'){
        this.$store.dispatch('pushProduct',data.product)
      }
      else if(data.action == 'deleteProduct'){
         this.$store.dispatch('removeProduct',data.product._id)
       }
    })
  }catch(error){
    console.log(error);
  }
  },
  created () {
    let getuser = localStorage.getItem('user')
    let user = JSON.parse(getuser)
    this.$store.dispatch("autoSigningUser",user)
    
    const findUserToken= function readCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
  }
    axios.interceptors.request.use(
      config => {
       config.headers['authorization'] = `Bearer ${findUserToken('TokenUser')}`
       return config;
     });
    
  },
  
  
}).$mount("#app");
