<template>
  <div
    class="about text-center white pl-5"
    :class="showReview ? 'pt-15' : 'pt-2'"
  >
    <div class="details text-center" v-if="product">
      <v-row>
        <!-- left one -->
        <v-col cols="12" sm="6" md="6">
          <div>
            <v-img
              contain
              :src="productImg"
              width="600"
              height="400"
              :alt="productImg"
            ></v-img>
          </div>
          <div class="mt-4 pl-5">
            <v-row>
              <v-col
                class="pa-1 rounded-lg grey lighten-3 pointer mr-2"
                cols="12"
                sm="2"
                md="2"
                v-for="(item, i) in product.img"
                :key="i"
                @click="productImg = item"
              >
                <v-img contain :src="item" width="110" height="80"></v-img>
              </v-col>
            </v-row>
          </div>
        </v-col>

        <!-- right one -->
        <v-col cols="12" sm="4" md="4">
          <div class="pt-10 text-center detailsFont">
            <h2 class="mb-2 headers-title">{{ product.name }}</h2>
            <strong class="headers-title detailsFont"
              >${{ product.price }}</strong
            >
          </div>
          <div class="pt-5 rounded-lg pl-2 pr-2 pb-3">
            <p class="detailsFont" v-html="product.description"></p>

            <v-btn
              color="black pa-5 white--text mr-2  "
              @click="addToCart(product)"
              ><v-icon>mdi-cart</v-icon>add to Card</v-btn
            >
            <v-btn
              v-if="this.currentUser && this.showReview"
              class="yellow darken-2 white--text left"
              left
              @click="reviewpage(product._id)"
              >add review
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <!-- <v-divider class="mb-3"></v-divider> -->
      <!-- <div class="d-inline-block"> -->
      <!-- <star-rating class="ml-15" disabled  v-model="rating" /> -->
      <!-- <v-btn
              class="yellow darken-2 white--text mt-2 left"
              left
              @click="reviewpage(product._id)"
              >add review
            </v-btn>
          </div> -->
      <!-- <div class="text-capitalize">
        <h1>reviews</h1>
      </div> -->

      <!-- review section   will be below here -->
    </div>
    <div v-else>
      <v-row>
        <v-col class="d-flex justify-center text-capitalize">
          <h2>there are an error try again !</h2>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import Functions from "../../../server/Products-Api";
import { CardMixins } from "../../plugins/CardMixins";
// import StarRating from "vue-star-rating";
export default {
  components: {
    // StarRating,
  },
  mixins: [CardMixins],
  props: ["productId", "showReview"],
  data() {
    return {
      product: null,
      id: this.productId || this.$route.params.id,
      errors: null,
      rout: this.$route.name,
      length: 3,
      window: 3,
      rating: 5,
      productImg: null,
    };
  },
  async mounted() {
    try {
     this.showOverlay = true;
      let res = await Functions.getSingleProduct(this.id);
      this.product = res.data.product;
      this.productImg = this.product.img[0];
     this.showOverlay = false;
    } catch (error) {
     this.showOverlay = false;
      this.errors = error;
    }
  },

  methods: {
    reviewpage(productId) {
      this.$router.push("/addReview/" + productId);
    },
  },
};
</script>

<style lang="scss" >
</style>