<template >

  <div class="about text-center danger--text">

       <div class="erro pb-10 " v-if="!total ">
         <div  style="height:400px;margin:10px auto; width:600px;">
        <v-img  src="./cart.png"  style="width:100% ; height:100%" alt="name"></v-img>
         <h4 class="mt-5">
                <router-link to="/" >
                <v-btn class="primary">shopping now</v-btn>
               </router-link> 
          </h4>
         </div>
       </div>
       <!-- overlay -->
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

    <div class="cart" v-show="cart">
      <v-row>
        <v-col cols='12' md="7" sm='7' v-if="cart.products" offset-sm='1'>

            <div v-for="item in cart.products" :key="item.id"  class="d-flex justify-space-between  loopig mb-3" style="min-width: 100%;" >
                

                      <v-col cols="4" @click="details(item._id)" style="max-height:250px ;cursor: pointer;" class="pt-0 pb-0 pl-0 rounded-l-lg ">
                        <img 
                        :src="item.img" 
                        :alt="item.name" 
                        class="rounded-l-lg"
                        style="width: 100%;  height: 100%;">
                        </v-col>

                        <v-col cols="8 " class="rounded-r-lg " style="position:relative">
                          <h3 class="title " id="name"> {{item.name}}</h3>
                          <p id="data" class="pink--text mb-0"> <span > 
                            price: ${{item.price}} 
                            </span>  
                          </p>
                          <p id="data">
                            <span >
                              quantity :{{item.quantity}}  </span> 
                          </p>
                        <div class="deleting d-block" 
                        style="position:absolute; 
                         bottom: 10px; left: 3px;
                         width: 100%;">
                          <v-divider></v-divider>
                          <v-btn  id="deletebtn" class="pink--text mt-2 d-block text-capitalize"  @click="deletefromCart({cart:cart._id,productId:item.productId})">
                            <v-icon>mdi-delete</v-icon>
                            delete</v-btn>
                        </div>

                        </v-col>
            
                

                <hr>
             </div>

       </v-col>


        <v-col cols='12' md="3" sm='3' >
            <div class="payment pt-3 rounded-lg  d-lg  " v-if="total" style="margin-top:26px;">
              <h4 class="font-weight-bold ">Subtotal (<span class="red--text">{{sum}}</span> items): $ <span class="pink--text">{{total}}</span></h4>
              <v-btn class="checkout text-capitalize font-weight-bold mt-1 " @click="handleClick"> checkout</v-btn>
              <!-- <span v-if="cart.products">

              <hr  v-if="cart.products.length >2" class="mt-3 mb-1">
              <v-btn class=" clearall pink white--text d-none  d-sm-inline" v-if="cart.products.length >2" @click="clearCart(cart)" >
            Delete all
          </v-btn>
              </span> -->

            </div>
        </v-col>

      </v-row>
    </div>

  </div>
</template>
<script>
import Functions from "../../../server/api"
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios'
export default {
  data() {
    return {
      cart:null,
      errors:null,
      total:null,
      sum:null,
      overlay:false
      
    }
  },
  computed:{
    userCart(){
      return this.$store.getters.getCart
    }
  },
   mounted() {
     this.overlay=true
     this.cart =this.$store.getters.getCart
     this.sum =this.$store.getters.getCartCount
     this.total =this.$store.getters.getTotalPrice
     this.overlay=false

    
  },
  methods: {
   async makeorder(){
    try {
     Functions.makeOrder({cart:this.cart,total:this.total})
    } catch (error) {
      this.errors = error
    }
    },
    async  handleClick(){
      this.overlay =true
     try {
      const stripePromise = loadStripe("pk_test_51HW8XsFcp3bB6NpnedYc62t1S6sDcqnQQ5Bg0Dk8omjIyCF4y1frCqgIsCq5WQDum8b4PJAiOONN05ILQeQ8SWte00LMEnghcw");
      const stripe = await stripePromise;
      const response = await axios.post("https://full-meven-stack.herokuapp.com/create-session",{total:this.total,quantity:this.sum,cart:this.cart});
      const session = await response;
      this.clearCart(this.cart)
        this.$store.commit('resetcartCount')
      this.makeorder({cart:this.cart,total:this.total})

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.data.id,
    }); 
    console.log(result);
    } catch (error) {
      
      this.errors = error
    }
     
    },
    //  DLETE A PRODUCT FROM THE CART 
    async deletefromCart(productId){
     
      try {
      this.overlay = true
     const res =  await Functions.removeFromCard(productId)
     
      if(!res.data.data.products){
        this.overlay = false
          this.errors = true
          this.cart = null
          this.$store.commit('resetcartCount',0)

      }else{

        let workout = res.data.data.products

         const totalcart= workout.reduce((accumulator, currentValue)=>{
           return accumulator+ currentValue.price * currentValue.quantity
   
         },0)
   
         const sumItem= workout.reduce((accumulator, currentValue)=>{
           return  accumulator + currentValue.quantity
         },0)
        this.cart = res.data.data
        this.total = totalcart
        this.sum = sumItem
        this.overlay = false

        this.$store.commit('setCart',res.data.data)
        this.$store.commit('setTotalPrice',totalcart)
        this.$store.commit('resetcartCount',sumItem)

      }
       
     } catch (error) {
       this.errors = error.response.data
      this.overlay = false
       
     }
    },
    details(productId){
      this.$router.push('/details/'+productId)
    },
    //  CLEAR ALL PRODUCTS IN THE CART 
    async clearCart(cart){
      try {
      this.overlay = true
        await Functions.clearTheCart(cart)
        
          this.overlay = false
          this.errors = true
          this.cart = null
          this.total = null
          this.$store.commit('resetcartCount',0)
        this.$store.commit('setCart',null)
        this.$store.commit('setTotalPrice',null)
        




      } catch (error) {
        this.errors = error.response.data
      this.overlay = false

      }
    }
  },
}
</script>

<style lang="scss"  >
.about{
  background: #EAEDED;
  min-height: 800px;
}
.col ,title{
      background: #fff;
    color: black;
    background: #FFF;
    color: black;
    font-size: 22px;
    text-transform: capitalize;
    font-family: 'Material Design Icons';
    font-weight: bold;
}
.checkout{
  background-image: linear-gradient(rgb(247, 223, 165), rgb(240, 193, 75));
}
.clearall{
  display: block;
    width: 100%;
    background: brown;
    color: white;
    font-weight: bold;
    font-family: math;
    font-size: 17px;
}
.v-progress-circular {
  margin: 1rem;
      height: 90px;
    width: 90px;
    position: fixed;
    left: 44%;
    top: 50%;
}
.title{
  
  color: #007185;


}
.payment{
    background-color: #161a3a !important;
   font-weight: bold;
    text-transform: capitalize;
     padding-bottom: 14px; 
    color: white;
}
@media (max-width: 352px) {
  // .payment{
  //   position: fixed;
  //   left: 0;
  //   bottom: 0;
  //   width: 80%;
  //   height: 113px;
  //   font-size: 18px;

  // }
  #name{
    font-size: 8px !important;
    line-height: 1.1;

  }
  #data{
    font-size: 6px !important;

  }
  #deletebtn{

  }
}
// media query
@media (min-width: 352px) and (max-width: 600px) {
  // .payment{
  //   position: fixed;
  //   left: 0;
  //   bottom: 0;
  //   width: 80%;
  //   height: 113px;
  //   font-size: 18px;

  // }
  #name{
    font-size: 15px !important;

  }
  #data{
    font-size: 10px !important;

  }
}
@media (min-width: 600px) and (max-width: 768px) {

  #name{
    font-size: 13px !important;

  }
  #data{
    font-size: 9px !important;

  }

}
@media (min-width: 768px) and (max-width: 992px) {

  .payment{
    font-size: 15px;
    .checkout{
      font-size: 10px;

    }
    .clearall{
      font-size: 10px;

    }

  }
  #name{
    font-size: 17px !important;

  }
  #data{
    font-size: 12px !important;

  }

}


</style>