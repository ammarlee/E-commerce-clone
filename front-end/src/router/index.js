import Vue from "vue";
import VueRouter from "vue-router";

// header and footer
import header from '../views/shared/NavBar.vue'
import footer from '../views/shared/Footer.vue'
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
    path: "/checkpayment/:id",
    name: "payment",
    beforeEnter:guardPage,
    components: {
      default:()=>{ return import("../views/Payment/Payment.vue")},
      header: header,
      footer: footer,
    },
  },
  
  {
    path: "/cat/:name",
    name: "cat",
    components:{
      default:()=>{ return import("../views/product/CategoryProduct.vue")},
      header,footer
    }
  },
  {
    path: "/chart/chart",
    name: "chart",
    components:{
      default:()=>{ return import("../views/Chart/Chart.vue")},
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
  {path: "*",redirect:'/'}  

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
