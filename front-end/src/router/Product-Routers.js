import guardadmin from "./Guards/admin.js";
import header from '../views/user/Add.vue'
import footer from '../views/user/Footer.vue'
import guardPage from "./Guards/guardPage";

export default[
    {
        path: "/card",
        name: "card",
        beforeEnter: guardPage,
        components:{
          default:()=>{ return import("../views/product/Card.vue")},
          header,footer
        }
      },
      {
        path: "/details/:id",
        name: "details",
        // query:new Date().getTime(),
        props:true,
        components:{
          default:()=>{ return import("../views/product/Details.vue")},
          header,footer
        }
      },
      {
        path: "/orders",
        name: "orders",
      beforeEnter: guardPage,
      components:{
        default:()=>{ return import("../views/product/Orders.vue")},
        header,footer
    
      }
      },
      {
        path: "/showOrder/:id",
        name: "showOrder",
      beforeEnter: guardPage,
      components:{
        default:()=>{ return import("../views/product/ShowOrder.vue")},
        header,footer
    
      }
      },
      {
        path: "/products",
        name: "products",
      beforeEnter: guardadmin,
      components:{
        default:()=>{ return import("../views/user/Products.vue")},
        header,footer
      }
    
      },
      
      {
        path: "/allproducts",
        name: "allproducts",
      beforeEnter: guardPage,
      components:{
        default:()=>{ return import("../views/user/userProducts.vue")},
        header,footer
      }
    
      
      },
      {
        path: "/addReview/:id",
        name: "addReview",
      beforeEnter: guardPage,
      components:{
        default:()=>{ return import("../views/product/addReview.vue")},
        header,footer
      }
      },
      {
        path: "/add",
        name: "add",
        beforeEnter: guardPage,
        components:{
          default:()=>{ return import("../views/user/Add.vue")},
          header,footer
        }
    
      },
]