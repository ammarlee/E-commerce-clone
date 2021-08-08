<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1 class="stepper-head text-center my-6 header">shopping</h1>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" sm="8" md="8">
          <v-stepper v-model="e6" vertical>
            <v-stepper-step
              :complete="e6 > 1"
              step="1"
              class="stepper-head"
              color="grey"
              editable
              d
            >
              customer
            </v-stepper-step>

            <v-stepper-content step="1" class="stepper-head">
              <div class="mt-3">
                <h5 class="mb-2">
                  write your email to be able to contact with you
                </h5>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      dense
                      outlined
                      label="email"
                      v-model="currentUser.email"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
              <v-btn color="success" @click="e6 = 2"> Continue </v-btn>
            </v-stepper-content>

            <v-stepper-step
              :complete="e6 > 2"
              step="2"
              editable
              class="stepper-head"
            >
              shipping
            </v-stepper-step>

            <v-stepper-content step="2">
              <!-- second  -->
              <v-row dense>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    outlined
                    dense
                    label="first name"
                    v-model="shipping.firstName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    outlined
                    dense
                    label="last name"
                    v-model="shipping.lastName"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    dense
                    label="company name"
                    v-model="shipping.company"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    dense
                    label="phone number"
                    v-model="shipping.phone"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    dense
                    label="address"
                    v-model="shipping.address"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    dense
                    label="Apartment/Suite/Building (Optional)"
                    v-model="shipping.Apartment"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    dense
                    label="city"
                    v-model="shipping.city"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    dense
                    label="Country"
                    v-model="shipping.Country"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    outlined
                    dense
                    label="state/province"
                    v-model="shipping.state"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    outlined
                    dense
                    label="postal code"
                    v-model="shipping.postal"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    dense
                    label="order comments "
                    v-model="shipping.comment"
                  ></v-text-field>
                </v-col>
              </v-row>
               <v-btn color="black white--text" @click="handlePayment">
                <v-icon>mdi-cash</v-icon>checkout
              </v-btn>
            </v-stepper-content>

            <!-- <v-stepper-step
              :complete="e6 > 3"
              class="stepper-head"
              step="3"
              editable
            >
              payment
            </v-stepper-step>

            <v-stepper-content step="3">
              <v-card
                color="grey lighten-1"
                class="mb-12"
                height="200px"
              ></v-card>
              <v-btn color="black white--text" @click="handlePayment">
                <v-icon>mdi-cash</v-icon>checkout
              </v-btn>
            </v-stepper-content> -->
          </v-stepper>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-card class="pa-2 pl-4 pr-4">
            <v-row dense class="text-capitalize font-weight-bold">
              <v-col cols="12" sm="6" md="6" class="">order summery</v-col>
              <v-col
                cols="12" sm="6" md="6"
                @click="goToCard"
                class="
                  text--body-2
                  pointer
                  text-right text-decoration-underline
                "
                >edit cart</v-col
              >
            </v-row>
            <v-divider></v-divider>
            <div>
              <p class="text-body-2">{{ sum }} items</p>
              <div v-for="item in cart.products" :key="item.id">
                <v-row>
                  <v-col cols="3">
                    <img
                      :src="item.img"
                      :alt="item.name"
                      style="width: 100%; height: 100%"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="d-flex align-center text-body-2">
                    {{ item.name }}
                  </v-col>

                  <v-col
                    cols="3"
                    class="d-flex align-right text-body-2 font-weight-bold"
                  >
                    ${{ item.price * item.quantity }}
                  </v-col>
                </v-row>
              </div>
              <v-divider></v-divider>
              <v-row class="text-left" dense>
                <v-col cols="8">
                  <h5>subtotal</h5>
                </v-col>
                <v-col cols="4" class="text-body-1">${{ total }} </v-col>
              </v-row>
              <v-row class="text-left" dense>
                <v-col cols="8">
                  <h5>tax</h5>
                </v-col>
                <v-col cols="4" class="text-body-1">$0.00 </v-col>
              </v-row>
              <v-row class="text-left" dense>
                <v-col cols="8">
                  <h5>shipping</h5>
                </v-col>
                <v-col cols="4" class="text-body-1"
                  >${{ extraShipping }}
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="text-left" dense>
                <v-col cols="8">
                  <h5>Total (USD)</h5>
                </v-col>
                <v-col cols="4" class="text-h5"
                  >${{ +extraShipping + +total }}</v-col
                >
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "../../../server/MainApi";
import { loadStripe } from "@stripe/stripe-js";

export default {
  data() {
    return {
      shipping: {},
      extraShipping: 9,
      e6: 2,
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      steps: 2,
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

  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    },
  },

  methods: {
    goToCard() {
      this.$router.push("/card");
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
        this.$store.commit("setShippingData",this.shipping)
        
        await stripe.redirectToCheckout({
          sessionId: session.data.id,
        });
      } catch (error) {
        this.errors = error;
      }
    },
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.stepper-head {
  text-transform: capitalize;
  font-weight: bold;
   font-family: 'Caudex', serif !important;
  font-size: 30px;
}

.header {
  font-size: 60px;
}
</style>