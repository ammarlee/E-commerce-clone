<template>
  <div class="about text-center white  pl-5" :class="showReview? 'pt-15':'pt-2'">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div class="details text-center" v-if="products">
      <!-- <small class="info--text">{{ products.category }}</small> -->

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
                class="pa-1 rounded-lg grey  lighten-3 pointer mr-2"
                cols="12"
                sm="2"
                md="2"
                v-for="(item, i) in products.img"
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
            <h2 class="mb-2 headers-title ">{{ products.name }}</h2>
            <strong class="headers-title detailsFont"
              >${{ products.price }}</strong
            >
          </div>
          <div class="pt-5 rounded-lg pl-2 pr-2 pb-3">
            <p class="detailsFont" v-html="products.description"></p>

            <v-btn
              color="black pa-5 white--text mr-2  "
              @click="addToCart(products)"
              ><v-icon>mdi-cart</v-icon>add to Card</v-btn
            >
             <v-btn v-if="this.currentUser && this.showReview"
              class="yellow darken-2 white--text  left"
              left
              @click="reviewpage(products._id)"
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
              @click="reviewpage(products._id)"
              >add review
            </v-btn>
          </div> -->
      <!-- <div class="text-capitalize">
        <h1>reviews</h1>
      </div> -->

      <!-- review section   will be below here -->
    </div>
  </div>
</template>
<script>
import Functions from "../../../server/Products-Api";
// import StarRating from "vue-star-rating";
export default {
  components: {
    // StarRating,
  },
  // mixins:{},
    props:["productId","showReview"],
  data() {
    return {
      products: null,
      id: this.productId||this.$route.params.id,
      errors: null,
      rout: this.$route.name,
      length: 3,
      window: 3,
      rating: 5,
      overlay: false,
      productImg: null,
    };
  },
  async mounted() {
    this.overlay = true;
    try {
      debugger
      let res = await Functions.getSingleProduct(this.id);
      console.log(res);
      this.products = res.data.product;
      this.productImg = this.products.img[0];
      this.overlay = false;
    } catch (error) {
      this.overlay = false;

      this.errors = error;
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    date() {
      const date = new Date(new Date().getTime() + 10 * 86400000);
      return date.toDateString();
    },
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