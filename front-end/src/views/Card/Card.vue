<template>
  <div class="about text-center danger--text">
    <v-container>
      <!-- 1-breadcrumbs  -->
      <v-breadcrumbs :items="location">
        <template v-slot:divider>
          <v-icon>mdi-arrow-right</v-icon>
        </template>
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :to="item.href"
            ><span class="text-capitalize black--text">{{
              item.name
            }}</span></v-breadcrumbs-item
          >
          <router-link :to="item.href"></router-link>
        </template>
      </v-breadcrumbs>
      <!-- 2 -title page  -->
      <div v-if="cart && cart.products && cart.products.length > 0">
        <div
          v-if="cart && cart.products"
          class="
            page-title
            black
            text-center text-capitalize
            white--text
            py-3
            px-6
          "
        >
          <h1 class="fontName">your card</h1>
          <div class="sum-location">
            <span
              class="
                px-3
                py-2
                font-weight-bold
                rounded-circle
                white
                black--text
              "
              >{{ sum }}</span
            >
          </div>
          <div>
            <p class="pa-2 rounded-lg grey mt-3"></p>
          </div>
        </div>
        <!-- 3- the card items {table} -->
        <div class="card-items mt-10 mb-10" v-if="cart && cart.products">
          <v-simple-table light>
            <template v-slot:default>
              <thead>
                <tr class="edit-header">
                  <th class="text-center detailsFont">item</th>
                  <th class="text-center detailsFont">price</th>
                  <th class="text-center detailsFont">Quantity</th>
                  <th class="text-center detailsFont">total</th>
                  <th class="text-center detailsFont">delete</th>
                </tr>
              </thead>
              <tbody class="table-body">
                <tr v-for="item in cart.products" :key="item.id">
                  <td>
                    <v-row @click="details(item.productId)" style="cursor: pointer">
                      <v-col cols="12" sm="3">
                        <img
                          :src="item.img"
                          :alt="item.name"
                          contain
                          style="width: 100%; height: 100%"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="9"
                        class="d-flex align-center text-body-2 detailsFont"
                      >
                        {{ item.name }}
                      </v-col>
                    </v-row>
                  </td>
                  <td class="font-weight-bold">${{ item.price }}</td>
                  <td>
                    <div>
                      
                      <v-row dense>
                        <v-col cols="6" sm="4" dense class="mr-1"
                          ><v-btn
                            outlined
                            @click.prevent="decreaseQuantity(item)"
                            ><v-icon>mdi-chevron-down</v-icon></v-btn
                          ></v-col
                        >

                        <v-col cols="8" sm="3" dense>
                          <v-text-field
                            align-center
                            @blur="setQuantity(item)"
                            class="d-inline-block"
                            v-model="item.quantity"
                            outlined
                            hide-details
                            dense
                          ></v-text-field
                        ></v-col>

                        <v-col cols="6" sm="4" dense class="mr-1"
                          ><v-btn
                            outlined
                            @click.prevent="increaseQuantity(item)"
                            ><v-icon>mdi-chevron-up</v-icon></v-btn
                          ></v-col
                        >
                      </v-row>
                    </div>
                  </td>
                  <td class="font-weight-bold">
                    ${{ +item.price * +item.quantity }}
                  </td>
                  <td>
                    <v-btn
                      outlined
                      icon
                      color="red"
                      @click="
                        deleteItemfromCart({
                          cart: cart._id,
                          productId: item.productId,
                        })
                      "
                    >
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
        <!-- 4- totalt and payment buttons -->
        <div class="payment-handel">
          <v-row>
            <v-col md="6" offset-md="6" class="fontName">
              <v-row class="text-left">
                <v-col cols="8">
                  <h5>subtotal :</h5>
                </v-col>
                <v-col cols="4" class="text-body-1">${{ total }} </v-col>
              </v-row>
              <v-divider></v-divider>

              <v-row class="text-left">
                <v-col cols="8"> <h5>quantity :</h5> </v-col>
                <v-col cols="4" class="text-body-1">{{ sum }} </v-col>
              </v-row>
              <v-divider></v-divider>

              <v-row class="text-left">
                <v-col cols="8"><h5>coupon code :</h5></v-col>
                <v-col
                  cols="4"
                  class="text-body-1"
                  @click="ShippingCoupon = !ShippingCoupon"
                  style="cursor: pointer"
                >
                  {{ ShippingCoupon ? "cancel" : "add coupon" }}

                  <v-icon
                    >mdi-chevron-{{ ShippingCoupon ? "up" : "down" }}</v-icon
                  >
                </v-col>
              </v-row>
              <v-divider></v-divider>

              <transition
                appear
                enter-active-class="animate__animated animate__fadeInRight"
                leave-active-class="animate__animated animate__fadeOut"
                mode="out-in"
              >
                <v-row v-if="ShippingCoupon" class="text-left">
                  <v-col cols="8">
                    <v-text-field
                      v-model="couponNumber"
                      type="text"
                      label="enter your coupon code"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4"
                    ><v-btn
                      class="black white--text"
                      @click="checkCoupon"
                      :disabled="couponNumber.length < 26"
                      >apply</v-btn
                    >
                  </v-col>
                  <v-divider></v-divider>
                </v-row>
              </transition>

              <v-row class="text-left">
                <v-col cols="8"><h5>grand total :</h5></v-col>
                <v-col cols="4" class="text-body-1">${{ total }} </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
        <!-- 5-  payment buttons -->
        <div class="checkpayment mt-3">
          <v-row dense>
            <v-col
              md="4"
              offset-md="8"
              class="detailsFont d-flex justify-end"
              dense
              style="background: transparent !important"
            >
            
              <v-btn
                class="white--text black font-weight-bold"
                @click="goToCheckout"
                ><v-icon class="mr-1">mdi-cash</v-icon> checkout</v-btn
              >
            </v-col>
          </v-row>
        
        </div>
      </div>

      <!-- erro div -->
      <div class="erro pb-10" v-if="!cart">
        <div style="height: 400px; margin: 10px auto; width: 600px">
          <v-img
            id="mainImg"
            src="@/assets/cart.png"
            style="width: 100%; height: 100%"
            alt="name"
          ></v-img>
          <h4 class="mt-5" id="emptyMsg">
            <router-link to="/">
              <v-btn class="primary">shopping now</v-btn>
            </router-link>
          </h4>
        </div>
        <div class="mt-16">
          <app-categories></app-categories>
        </div>
      </div>
     
    </v-container>
  </div>
</template>
<script>
import CardFunctions from "../../../server/Card-Api";
import CouponFunctions from "../../../server/Coupon-Api";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../../../server/MainApi";
import Categories from "../Category/Categories";
export default {
  components: {
    "app-categories": Categories,
  },
  data() {
    return {
      location: [
        {
          name: "Home",
          href: "/",
          icon: "mdi-home",
          disabled: true,
        },

        {
          name: "Your Card",
          disabled: false,
          href: "/card",
        },
      ],
      ShippingCoupon: false,
      order: {},
      couponNumber: "",
      isValid: false,
      dialog: false,
      errors: null,
    };
  },
  computed: {
    cart() {
      return this.$store.getters.getCart;
    },
    total() {
      return this.$store.getters.getTotalPrice;
    },
    sum() {
      return this.$store.getters.getCartCount;
    },
  },
  
  methods: {
    countPercentage(total, percentX) {
      return ((percentX / 100) * total).toFixed(2);
    },
    async checkCoupon() {
      let data = {
        card: this.cart,
        total: this.total,
        userId: this.currentUser._id,
        couponNumber: this.couponNumber,
      };
      if (data.couponNumber && data.couponNumber.length > 25) {
        try {
          const res = await CouponFunctions.checkCoupon(data);
          console.log(res.data);
          let Discount = (res.data.coupon.percentage / 100) * data.total;
          let totalAfterDiscount = data.total - Discount;
          console.log(totalAfterDiscount);
          this.$store.commit("setTotalPrice", totalAfterDiscount);

          console.log(res);
        } catch (error) {
          console.log(error);
          this.errors = error;
        }
      }
    },
    goToCheckout() {
      this.$router.push("/checkout");
    },
    async setQuantity(product) {
      if (product.quantity == 0) {
        return;
      } else {
        try {
         this.showOverlay = true
          let userId = this.currentUser._id;
          await CardFunctions.setQuantity({
            ...product,
            userId,
          });
          this.$store.commit("cartCount");
          this.$store.dispatch("findCart", userId);
         this.showOverlay = false
        } catch (error) {
         this.showOverlay = false

          console.log(error);
        }
      }
    },
    async increaseQuantity(product) {
      try {
       this.showOverlay =true
        let userId = this.currentUser._id;
         await CardFunctions.increaseQuantity({
          ...product,
          userId,
        });
       this.showOverlay =false
        this.$store.commit("cartCount");
        this.$store.dispatch("findCart", userId);
      } catch (error) {
       this.showOverlay =false
        console.log(error);
      }
    },
    async decreaseQuantity(product) {
      try {
        let userId = this.currentUser._id;
       this.showOverlay =true

        if (product.quantity == 1) {
          this.deleteItemfromCart({
            cart: this.cart._id,
            productId: product.productId,
          });
        } else {
       await CardFunctions.decreaseQuantity({
            ...product,
            userId,
          });
          this.$store.commit("cartCount");
          this.$store.dispatch("findCart", userId);
       this.showOverlay =false

        }
      } catch (error) {
       this.showOverlay =false
        console.log(error);
      }
    },
    openDialog() {
      this.dialog = true;
      this.order.name = this.currentUser.name;
      this.order.count = this.sum;
      this.order.total = this.total;
    },
    async handlePayment() {
     this.showOverlay = true;
      try {
        const stripePromise = loadStripe(
          "pk_test_51HW8XsFcp3bB6NpnedYc62t1S6sDcqnQQ5Bg0Dk8omjIyCF4y1frCqgIsCq5WQDum8b4PJAiOONN05ILQeQ8SWte00LMEnghcw"
        );
        const stripe = await stripePromise;
        const response = await axios().post("create-session", {
          total: this.total,
          quantity: this.sum,
          cart: this.cart,
        });

        const session = await response;
        await stripe.redirectToCheckout({
          sessionId: session.data.id,
        });
       this.showOverlay =false
      } catch (error) {
       this.showOverlay =false
        this.errors = error;
      }
    },
    deleteItemfromCart(productId) {
      this.$dialog.info({
        text: "are you sure that you wanna delete item",
        title: "  Delete Product  ",
        color: "red",
        persistent: true,
        actions: {
          true: {
            text: "yes",
            color: "green",
            handle: async () => {
              try {
                const res = await CardFunctions.removeFromCard(productId);
                this.dialogNotifySuccess("deleted");
                if (res.data.data.products.length == 0) {
                 this.showOverlay = false;
                  this.errors = true;
                  // this.cart = null;
                  this.$store.dispatch("setCart", null);
                  this.$store.commit("resetcartCount", 0);
                } else {
                  let productsList = res.data.data.products;
                  const totalcart = productsList.reduce(
                    (accumulator, currentValue) => {
                      return (
                        accumulator + currentValue.price * currentValue.quantity
                      );
                    },
                    0
                  );

                  const sumItem = productsList.reduce(
                    (accumulator, currentValue) => {
                      return accumulator + currentValue.quantity;
                    },
                    0
                  );
                  this.updateCardInfo(res.data.data, totalcart, sumItem);
                }
              } catch (error) {
                this.errors = error.response.data;
               this.showOverlay = false;
              }
            },
          },
          false: {
            text: "cancel",
          },
        },
      });
    },

    details(productId) {
      this.$router.push("/Product/" + productId);

    },
    updateCardInfo(a, b, c) {
      this.$store.commit("setCart", a);
      this.$store.commit("setTotalPrice", b);
      this.$store.commit("resetcartCount", c);
    },
 
  },
};
</script>

<style lang="scss">
.about {
  background: #eaeded;
  // min-height: 600px;
  .fontName {
    font-family: "Euphoria Script" !important;
  }
  .page-title {
    position: relative;
  }
  .sum-location {
    position: absolute;
    top: 20px;
    right: 17px;
  }
  .edit-header th {
    text-transform: uppercase;
    font-size: 18px !important;
  }
  // .ShippingDetails div{
  //   background-color:rgb(180, 178, 178)

  // }
  .theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background: transparent !important;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height: 40px !important;
  }
}
.col,
title {
  background: #fff;
  color: black;
  background: #fff;
  color: black;
  font-size: 22px;
  text-transform: capitalize;
  font-family: "Material Design Icons";
  font-weight: bold;
}
.checkout {
  background-image: linear-gradient(rgb(247, 223, 165), rgb(240, 193, 75));
}
.clearall {
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
.title {
  color: #007185;
}
.payment {
  background-color: #161a3a !important;
  font-weight: bold;
  text-transform: capitalize;
  padding-bottom: 14px;
  color: white;
}
@media (max-width: 352px) {
  
  .erro {
    #mainImg {
      width: 40% !important;
    }
    #emptyMsg {
      position: absolute !important;
      left: 25%;
    }
  }
  // }
  #name {
    font-size: 8px !important;
    line-height: 1.1;
  }
  #data {
    font-size: 6px !important;
  }

}
// media query
@media (min-width: 352px) and (max-width: 600px) {
 
  #name {
    font-size: 15px !important;
  }
  #data {
    font-size: 10px !important;
  }
}
@media (min-width: 600px) and (max-width: 768px) {
  #name {
    font-size: 13px !important;
  }
  #data {
    font-size: 9px !important;
  }
}
@media (min-width: 768px) and (max-width: 992px) {
  .payment {
    font-size: 15px;
    .checkout {
      font-size: 10px;
    }
    .clearall {
      font-size: 10px;
    }
  }
  #name {
    font-size: 17px !important;
  }
  #data {
    font-size: 12px !important;
  }
}
</style>
