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
import Functions from '../server/api'
import VueImg from 'v-img';
Vue.use(VueImg);
const vueImgConfig = {
  // Consider alt of image as its title in gallery?
  altAsTitle: false,
}

Vue.use(VueImg, vueImgConfig);

Vue.mixin({
  data() {
    return {
      errors:null,
       overlay:false,
    }
  },
  computed:{
    drawer: {
      get() {
        return this.$store.getters.drawer;
      },
      set(value) {
        this.$store.dispatch("toggleDrawer", value);
      }
    },
    rightDrawer: {
      get() {
        return this.$store.getters.rightDrawer;
      },
      set(value) {
        this.$store.dispatch("toggleRightDrawer", value);
      }
    },
  },
  methods: {
    alertDisplay(icon,msg,time) {
      const Toast = this.$swal.mixin({
           toast: true,
           position: 'top',
           showConfirmButton: false,
           timer: time,
           timerProgressBar: true,
           didOpen: (toast) => {
             toast.addEventListener('mouseenter', this.$swal.stopTimer)
             toast.addEventListener('mouseleave', this.$swal.resumeTimer)
           }
})

           Toast.fire({
           icon: icon,
           title: msg,
            showClass: {
   popup: 'animate__animated animate__fadeInDown'
 },
 hideClass: {
   popup: 'animate__animated animate__fadeOutUp'
 }
         })
     },
     async addToCart(products){
      try {
       const response = await Functions.addTocart({...products,user:this.user})
       console.log(response);
        this.alertDisplay('success','added to cart',2000)
        this.$store.commit('cartCount')
        this.rightDrawer =!this.rightDrawer
        this.$store.dispatch('findCart',response.data.userId)


      } catch (error) {
        this.errors = error
        this.alertDisplay('error',error.response.data.msg,2500)

      }
    },
  },
  
})
 
const base = axios.create({
  baseURL: 'https://full-meven-stack.herokuapp.com/'
});
Vue.prototype.$http = base; 
  
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
  try{
    this.$store.commit('resetcartCount',0)
    await this.$store.dispatch('getProducts')
    await this.$store.dispatch('fetchCategory')
    const socket = socktConnect('https://full-meven-stack.herokuapp.com/')
    socket.on('category',data=>{
      if(data.action == 'create'){
        this.$store.dispatch('pushCategory',data.category)
      }
      else if(data.action == 'deleteCategory'){
        this.$store.dispatch('removeCategory',data.category._id)
        
      }
     else if(data.action == 'createProduct'){
        this.$store.dispatch('pushProduct',data.product)
        // this.$store.dispatch('notifications',{msg:data.msg, productId:data.product._id,img:data.product.img[0]})
      }
      else if(data.action == 'deleteProduct'){
         this.$store.dispatch('removeProduct',data.product._id)
         
       }

      
    })
  }catch(ee){
    console.log(ee);
  }
    
    
  },
  
}).$mount("#app");
