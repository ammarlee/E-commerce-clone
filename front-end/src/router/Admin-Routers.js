import guardadmin from "./Guards/admin";
export default[
    {
        path: "/Dashboard",
        name: "Dashboard",
      beforeEnter: guardadmin,
      components:{
        default:()=>{ return import("../views/admin/Dashboard.vue")},
      },
      children:[
      
          {
            path: "/",
            name: "admincategory",
          components:{
            default:()=>{ return import("../views/admin/Category.vue")},
          }
          }, 
          {
            path: "/products",
            name: "adminProducts",
          components:{
            default:()=>{ return import("../views/admin/Products.vue")},
          }
          }, 
          {
            path: "/coupon",
            name: "Coupon",
          components:{
            default:()=>{ return import("../views/admin/Coupon.vue")},
          }
          },

      ]
      },

   
]