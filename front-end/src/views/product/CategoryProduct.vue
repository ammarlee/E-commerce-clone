<template>
  <div class="content">
        <app-sub-category @getFilterdProducts="getFilterdProducts($event)"></app-sub-category>

    <v-container v-if="!showOverlay" class="thecontainer">
      <v-row v-if="products && products.length > 0">
        <v-col
          cols="12"
          sm="6"
          md="4"
          class="pointer mb-2"
          v-for="item in products"
          :key="item._id"
        >
          <v-hover v-slot="{ hover }">
            <div>
              <div>
                <v-img
                  :src="item.img[0]"
                  contain
                  max-height="360"
                  aspect-ratio="1.4"
                  @click.prevent="navigateToProduct(item._id)"
                >
                  <div
                    v-if="hover"
                    class="d-flex justify-center align-center hoverdiv"
                    style="height: 100%"
                  >
                    <transition
                      appear
                      enter-active-class="animate__animated animate__fadeIn"
                      leave-active-class="animate__animated animate__fadeOutDown"
                      mode="out-in"
                    >
                      <div
                        class="
                          overlaydiv
                          d-flex
                          justify-center
                          align-center
                          divopacity
                        "
                        min-height="100"
                        min-width="100"
                      >
                        <v-btn
                          class="black white--text text-uppercase"
                          @click.stop="openDialog(item._id)"
                        >
                          quick view
                        </v-btn>
                      </div>
                    </transition>
                  </div>
                </v-img>
                <div class="pt-6 text-center">
                  <h4 class="mb-2 text-truncate detailsFont">
                    {{ item.name }}
                  </h4>
                  <p class="detailsFont">${{ item.price }}</p>
                  <div class="d-flex justify-center aligen-center">
                    <v-btn
                      color="black"
                      class="white--text"
                      @click.prevent="addToCart(item)"
                    >
                      <v-icon>mdi-cart</v-icon>
                      add to card
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </v-hover>
        </v-col>
      </v-row>
      <div class="text-center mt-10">
        <v-pagination
          v-model="page"
          :length="hasNextPage ? page + 1 : page"
        ></v-pagination>
      </div>

      <v-row v-if="products">
        <v-col v-if="products.length == 0">
          <h1 class="text-center font-weight-bold pink--text">
            there is no products
          </h1>
        </v-col>
      </v-row>
    </v-container>
    <v-row>
      <v-col cols="12">
        <v-dialog v-model="dialog" persistent max-width="1000px">
          <template v-slot:activator> </template>
          <v-card>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1 font-weight-bold"
                text
                @click="closeDialog"
              >
                X
              </v-btn>
            </v-card-actions>
            <v-card-text>
              <app-Product
                :productId="productId"
                :showReview="showReview"
                v-on:closeDia="closeDialog"
              ></app-Product>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import productsApi from "../../../server/Products-Api";
import Product from "./Product.vue";
import { CardMixins } from "../../plugins/CardMixins";
import subCategory from "../shared/SubCategory";

export default {
  components: {
    "app-Product": Product,
    "app-sub-category": subCategory,

  },
  mixins: [CardMixins],

  data() {
    return {
      products: null,
      subCategory:null,
      page: 1,
      hasNextPage: null,
      dialog: false,
      productId: null,
      showReview: false,
    };
  },

  computed: {
    param() {
      return this.$route.params.name;
    },
    routerPage() {
      return this.$route.query.page;
    },
  },
  mounted() {
    console.log("mounted");
    console.log(this.$route.query.page);
    this.fetchData();
  },
  watch: {
    page() {
      try {
        this.$router.replace({ path: `/cat/${this.param}`, query: { page: this.page } });
        this.fetchData();
        
      } catch (error) {
console.log(error,33333333);        
      }

    },
    $route() {
      this.fetchData();
    },
    routerPage(news, old) {
      console.log(news, old);
    },
  },
  beforeRouteUpdate(_to, _from, next) {
    next();
  },
  methods: {
    getFilterdProducts(item) {
      console.log({item});
      this.subCategory =item._id
    this.fetchData();

    },
    closeDialog() {
      this.dialog = false;
      this.productId = null;
    },

    openDialog(id) {
      this.dialog = true;
      this.productId = id;
    },
    async fetchData() {
      try {
       this.showOverlay = true;
        const res = await productsApi.filterProduct({
          categories: this.param,
          subCategory:this.subCategory,
          page: this.page,
        });
        this.products = res.data.products;
        this.hasNextPage = res.data.hasNextPage;
       this.showOverlay = false;
      } catch (error) {
       this.showOverlay = false;
        console.log(error);
      }
    },
    navigateToProduct(productId) {
        this.$router.push("/Product/" + productId);
    },
  },
};
</script>

<style lang="scss" scoped>
.overlaydiv {
  min-width: 100%;
  min-height: 100%;
  transition: all 5s ease-in-out;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
.v-image__image--cover {
  background-size: contain !important;
}
@media only screen and (max-width: 200px) {
  .thecontainer {
    .thepragraphgh {
      font-size: 12px !important;
      line-height: 1.2;
    }
    .theproductName {
      font-size: 14px !important;
      line-height: 1.2;
    }
  }
}
@media only screen and (min-width: 200px) and (max-width: 767px) {
  .thecontainer {
    .thepragraphgh {
      font-size: 14px !important;
      line-height: 1.2;
    }
    .theproductName {
      font-size: 18px !important;
      line-height: 1.2;
    }
  }
}
</style>
