// import guardadmin from "./Guards/admin.js";
import header from '../views/shared/NavBar.vue'
import footer from '../views/shared/Footer.vue'
import guardPage from "./Guards/guardPage";

export default[
    {
        path: "/card",
        name: "card",
        beforeEnter: guardPage,
        components:{
          default:()=>{ return import("../views/Card/Card.vue")},
          header,footer
        }
      },
      {
        path: "/checkout",
        name: "checkout",
        beforeEnter: guardPage,
        components:{
          default:()=>{ return import("../views/Payment/Checkout.vue")},
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
        default:()=>{ return import("../views/Order/Orders.vue")},
        header,footer
    
      }
      },
      {
        path: "/showOrder/:id",
        name: "showOrder",
      beforeEnter: guardPage,
      components:{
        default:()=>{ return import("../views/Order/ShowOrder.vue")},
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
   
]