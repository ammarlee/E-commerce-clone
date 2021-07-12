import Vue from "vue";
import VueRouter from "vue-router";

// header and footer
import header from '../views/user/Add.vue'
import footer from '../views/user/Footer.vue'
// auth guard
import guardPage from "./Guards/guardPage";
import AuthantactionRouters from "./Authantication-Routers"
import ProductRouters from "./Product-Routers"
import AdminRouters from "./Admin-Routers"

Vue.use(VueRouter);

const routes = [
  ...AuthantactionRouters,
  ...ProductRouters,
  ...AdminRouters,
  {
    path: "/",
    name: "Home",
    components: {
      default:()=>{ return import("../views/Home.vue")},
      header: header,
      footer: footer,
    },
  },{
    path: "/:id",
    name: "payment",
    components: {
      default:()=>{ return import("../views/Payment.vue")},
      header: header,
      footer: footer,
    },
  },
  
  {
    path: "/cat/:name",
    name: "cat",
    components:{
      default:()=>{ return import("../views/user/CategoryProduct.vue")},
      header,footer
    }

  },
  
  {
    path: "/profile",
    name: "profile",
  beforeEnter: guardPage,
  components:{
    default:()=>{ return import("../views/user/Profile.vue")},
    header,footer
  }

  },
 

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
