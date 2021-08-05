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
            pt-3
            pr-6
            pl-6
            white--text
            pb-3
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
                  <!-- <th class="text-center detailsFont">image</th> -->
                  <th class="text-center detailsFont">item</th>
                  <th class="text-center detailsFont">price</th>
                  <th class="text-center detailsFont">Quantity</th>
                  <th class="text-center detailsFont">total</th>
                  <th class="text-center detailsFont">delete</th>
                </tr>
              </thead>
              <tbody class="table-body">
                <tr v-for="item in cart.products" :key="item.id">
                  <!-- <td>  -->
                  <!-- <v-row @click="details(item._id)" style="cursor: pointer">
                    <v-col cols="12" sm="3" md="3" class="d-flex justify-center">
                      <img
                        :src="item.img"
                        :alt="item.name"
                        style="width: 100%; height: 100%"
                      />
                    </v-col>
                   </v-row> -->

                  <!-- </td> -->
                  <td>
                    <v-row @click="details(item._id)" style="cursor: pointer">
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
                <v-col cols="8"><h5>shipping :</h5> </v-col>
                <v-col
                  cols="4"
                  class="text-body-1"
                  @click="ShippingDetails = !ShippingDetails"
                  style="cursor: pointer"
                >
                  {{ ShippingDetails ? "cancel" : "add info" }}

                  <v-icon
                    >mdi-chevron-{{ ShippingDetails ? "up" : "down" }}</v-icon
                  >
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <transition
                appear
                enter-active-class="animate__animated animate__fadeInRight"
                leave-active-class="animate__animated animate__fadeOut"
                mode="in-out"
                type="animation"
              >
                <v-row
                  v-if="ShippingDetails"
                  dense
                  class="ShippingDetails text-left text-capitalize"
                >
                  <v-col cols="6" class="text-body-2" dense>country </v-col>
                  <v-col cols="6" class="text-body-2" dense>
                    <v-text-field
                      v-model="shipping.country"
                      label="country"
                      outlined
                      dense
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" class="text-body-2" dense
                    >state/province
                  </v-col>
                  <v-col cols="6" class="text-body-2" dense>
                    <v-text-field
                      v-model="shipping.state"
                      label="state/province"
                      outlined
                      dense
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" class="text-body-2" dense>Suburb/city </v-col>
                  <v-col cols="6" class="text-body-2" dense>
                    <v-text-field
                      hide-details
                      v-model="shipping.city"
                      label="Suburb/city"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" class="text-body-2" dense
                    >Zip/postcode
                  </v-col>
                  <v-col cols="6" class="text-body-2" dense>
                    <v-text-field
                      hide-details
                      v-model="shipping.postcode"
                      label="Zip/postcode"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" dense>
                    <v-btn outlined class="white--text black">
                      estimate shipping
                    </v-btn></v-col
                  >
                  <v-divider></v-divider>
                </v-row>
              </transition>

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
                >checkout</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col
              dense
              md="4"
              offset-md="8"
              class="detailsFont d-flex justify-end"
              style="background: transparent !important"
              @click="handlePayment"
            >
              <v-btn class="font-weight-bold pl-6 pr-6"
                ><v-icon>mdi-cash</v-icon> checkout</v-btn
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
            src="./cart.png"
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
      <!-- overlay -->
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>

      <!-- <span v-if="cart.products">

              <hr  v-if="cart.products.length >2" class="mt-3 mb-1">
              <v-btn class=" clearall pink white--text d-none  d-sm-inline" v-if="cart.products.length >2" @click="clearCart(cart)" >
            Delete all
          </v-btn>
              </span> -->
      <!-- start dialog  -->
      <v-dialog v-model="dialog" width="600">
        <v-card>
          <v-container class="pb-0">
            <v-form v-model="isValid">
              <v-card-title class="font-weight-bold text-capitalize red--text">
                payment information
              </v-card-title>
              <v-row dense>
                <v-col cols="12" sm="4">
                  <v-text-field
                    label="name"
                    readonly
                    outlined
                    dense
                    v-model="order.name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    label="total"
                    readonly
                    outlined
                    dense
                    v-model="order.total"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    label="count"
                    readonly
                    outlined
                    dense
                    v-model="order.count"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    hide-details
                    label="address"
                    outlined
                    dense
                    v-model="order.address"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col col="12">
                  <div style="height: 200px">
                    <app-map @location="userLocation($event)"></app-map>
                  </div>
                </v-col>
              </v-row>

              <v-row dense class="mt-5">
                <v-col class="d-flex justify-end">
                  <v-card-actions>
                    <v-btn text color="red" @click="dialog = false"
                      >cancel</v-btn
                    >
                    <v-btn text color="success" @click="handlePayment"
                      >submit</v-btn
                    >
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
      <div></div>
    </v-container>
  </div>
</template>
<script>
import CardFunctions from "../../../server/Card-Api";
import CouponFunctions from "../../../server/Coupon-Api";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../../../server/MainApi";
import map from "../Map.vue";
import Categories from "../Category/Categories";
export default {
  components: {
    "app-map": map,
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
      shipping: {},
      ShippingDetails: false,
      ShippingCoupon: false,
      order: {},
      couponNumber: "",
      isValid: false,
      dialog: false,
      errors: null,
      overlay: false,
      orderlocation: null,
    };
  },
  computed: {
    userCart() {
      return this.$store.getters.getCart;
    },
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
  mounted() {
    this.overlay = true;
    this.overlay = false;
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
          let userId = this.currentUser._id;
          await CardFunctions.setQuantity({
            ...product,
            userId,
          });
          this.$store.commit("cartCount");
          this.$store.dispatch("findCart", userId);
        } catch (error) {
          console.log(error);
        }
      }
    },
    async increaseQuantity(product) {
      try {
        let userId = this.currentUser._id;
        const { data } = await CardFunctions.increaseQuantity({
          ...product,
          userId,
        });
        console.log(data);
        this.$store.commit("cartCount");
        // this.rightDrawer =!this.rightDrawer
        this.$store.dispatch("findCart", userId);
      } catch (error) {
        console.log(error);
      }
    },
    async decreaseQuantity(product) {
      try {
        let userId = this.currentUser._id;
        if (product.quantity == 1) {
          this.deleteItemfromCart({
            cart: this.cart._id,
            productId: product.productId,
          });
        } else {
          const { data } = await CardFunctions.decreaseQuantity({
            ...product,
            userId,
          });
          console.log(data);
          this.$store.commit("cartCount");
          // this.rightDrawer =!this.rightDrawer
          this.$store.dispatch("findCart", userId);
        }
      } catch (error) {
        console.log(error);
      }
    },
    openDialog() {
      this.dialog = true;
      this.order.name = this.currentUser.name;
      this.order.count = this.sum;
      this.order.total = this.total;
    },
    userLocation(e) {
      let location = {
        location: e,
        address: this.order.address,
      };
      localStorage.setItem("orderLocation", JSON.stringify(location));
      this.orderlocation = e;
    },

    async handlePayment() {
      this.overlay = true;
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
      } catch (error) {
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
                this.overlay = true;
                const res = await CardFunctions.removeFromCard(productId);
                console.log(res.data);
                this.dialogNotifySuccess("deleted");
                if (res.data.data.products.length == 0) {
                  console.log("itts empty !");
                  this.overlay = false;
                  this.errors = true;
                  this.cart = null;
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
                  this.overlay = false;
                  // if (condition) {

                  // }
                  this.updateCardInfo(res.data.data, totalcart, sumItem);
                }
              } catch (error) {
                this.errors = error.response.data;
                this.overlay = false;
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
      this.$router.push("/details/" + productId);
    },
    updateCardInfo(a, b, c) {
      this.$store.commit("setCart", a);
      this.$store.commit("setTotalPrice", b);
      this.$store.commit("resetcartCount", c);
    },
    //  CLEAR ALL PRODUCTS IN THE CART
    async clearCart(cart) {
      try {
        this.overlay = true;
        await CardFunctions.clearTheCart(cart);
        this.dialogNotifySuccess("cleared card");

        this.overlay = false;
        this.errors = true;
        this.cart = null;
        this.total = null;
        this.updateCardInfo(null, null, 0);
      } catch (error) {
        this.errors = error.response.data;
        this.overlay = false;
      }
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
  // .payment{
  //   position: fixed;
  //   left: 0;
  //   bottom: 0;
  //   width: 80%;
  //   height: 113px;
  //   font-size: 18px;
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
  #deletebtn {
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
