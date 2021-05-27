import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
//  ROUTERS FOR THE PRODUCT
import card from "../views/product/Card.vue";
import details from "../views/product/Details.vue";
import orders from "../views/product/Orders.vue";
import review from "../views/product/addReview.vue"

// ROUTERS FOR USER 
import add from "../views/user/Add.vue";
import categoryPage from "../views/user/CategoryProduct.vue";
import products from "../views/user/Products.vue";
import userProducts from "../views/user/userProducts.vue";
import profile from "../views/user/Profile.vue"
// ROUTERS FOR AUTHANTICATION
import login from "../views/auth/Login.vue";
import signup from "../views/auth/Signup.vue";
import forgetPassword from "../views/auth/forgetPassword.vue";
import resetPassword from "../views/auth/forgetPassword.vue";
// header and footer
import header from '../views/user/Add'
import footer from '../views/user/Footer'
// auth guard
import guardPage from "@/router/guardPage.js";
import guardadmin from "@/router/admin.js";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    components:{
      default:Home,
      "header":header,
      "footer":footer
    }

  },
  {
    path: "/forgetPassword",
    name: "forgetPassword",
    component: forgetPassword ,
    components:{
      default:forgetPassword,
    }
  },
  {
    path: "/reset/:token",
    name: "resetPassword",
    component:resetPassword,
    components:{
      default:resetPassword,
    }
  },
  {
    path: "/card",
    name: "card",
    beforeEnter: guardPage,
    components:{
      default:card,
      "header":header,
      "footer":footer
    }
  },
  {
    path: "/details/:id",
    name: "details",
    // query:new Date().getTime(),
    props:true,
    components:{
      default:details,
      "header":header,
      "footer":footer
    }
  },
  {
    path: "/orders",
    name: "orders",
  beforeEnter: guardPage,
  components:{
    default:orders,
    "header":header,
    "footer":footer
  }

  },
  {
    path: "/add",
    name: "add",
    beforeEnter: guardPage,
    components:{
      default:add,
      "header":header,
      "footer":footer
    }

  },
  {
    path: "/cat/:name",
    name: "cat",
    components:{
      default:categoryPage,
      "header":header,
      "footer":footer
    }

  },
  {
    path: "/products",
    name: "products",
  beforeEnter: guardadmin,
  components:{
    default:products,
    "header":header,
    "footer":footer
  }

  },
  
  {
    path: "/allproducts",
    name: "allproducts",
  beforeEnter: guardPage,
  components:{
    default:userProducts,
    "header":header,
    "footer":footer
  }

  },
  {
    path: "/profile",
    name: "profile",
  beforeEnter: guardPage,
  components:{
    default:profile,
    "header":header,
    "footer":footer
  }

  },
 
  {
    path: "/addReview/:id",
    name: "addReview",
  beforeEnter: guardPage,
  components:{
    default:review,
    "header":header,
    "footer":footer
  }
  },
  {
    path: "/login",
    name: "login",
    components:{
      default:login,
    }
  },
  {
    path: "/signup",
    name: "signup",
    components:{
      default:signup,
    }
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
