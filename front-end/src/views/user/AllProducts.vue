<template>
  <div>
    <div>
      <h1 class="headers-title fontName">all Products</h1>
      <v-row>
        <v-col cols="12" sm="3" md="3">
          <h2 class="headers-title fontName">filters</h2>

          <v-list>
            <v-list-group :value="true" prepend-icon="mdi-plus">
              <template v-slot:activator>
                <v-list-item-title>
                  <h2 class="fontName text-left">shop by product</h2>
                </v-list-item-title>
              </template>
              <v-list-item>
                <!-- <v-list-item-title v-text="title"></v-list-item-title> -->

                <v-container class="headers-title">
                  <v-checkbox
                    v-for="item in categories"
                    :key="item._id"
                    v-model="selected"
                    :label="item.name"
                    hide-details
                    class="pt-0"
                    color="orange"
                    :value="item.name"
                    dense
                  ></v-checkbox>
                </v-container>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-col>
        <!-- productsts -->
        <v-col cols="12" sm="8" md="8">
          <v-row v-if="products">
            <v-col
              cols="12"
              class="mb-5"
              sm="6"
              md="6"
              v-for="item in products"
              :key="item._id"
            >
              <div>
                <v-hover v-slot="{ hover }">
                  <div>
                    <v-img
                      :src="item.img[0]"
                      contain
                      max-height="360"
                      aspect-ratio="1.4"
                      @click.prevent="details(item._id)"
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
                        class="overlaydiv divopacity"
                        min-height="100"
                        min-width="100"
                      > <v-btn
                                  class="black white--text text-uppercase"
                                  @click="openDialog(item._id)">
                                  quick view
                              </v-btn ></div>
                    </transition>
                  </div>
                      <!-- <v-expand-transition>
                        <div
                          v-if="hover"
                          class="
                            hoverdiv
                            d-flex
                            transition-fast-in-fast-out
                            justify-center
                            align-center
                          "
                          style="height: 100%"
                        >
                          <div>
                             <v-btn
                                  class="black white--text text-uppercase"
                                  @click="openDialog(item._id)">
                                  quick view
                              </v-btn >
                          </div>
                        </div>
                      </v-expand-transition> -->
                    </v-img>
                    <div class="pt-6 text-center">
                      <h4 class="mb-2 text-truncate detailsFont">
                        {{ item.name }}
                      </h4>
                      <p class="detailsFont">${{item.price}}</p>
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
                </v-hover>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-dialog v-model="dialog" persistent max-width="1000px">
            <template v-slot:activator> </template>
            <v-card>
               <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1 font-weight-bold" text @click="closeDialog">
                  X
                </v-btn>
              </v-card-actions>
              <v-card-text>
                <app-details :productId="productId" :showReview="showReview" v-on:closeDia="closeDialog" ></app-details>
                
              </v-card-text>
             
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Details from "../product/Details.vue";

export default {
 components: {
   'app-details':Details,
 },
  data() {
    return {
      selected: [],
      dialog: false,
      products: null,
      productId:null,
      showReview:false
    };
  },
  mounted () {
    this.setProducts(this.allProducts);
  },

  computed: {
    categories() {
      return this.$store.getters.getCategory;
    },
    allProducts() {
      return this.$store.getters.getProducts;
    },
  },
  methods: {
    openDialog(id){
      this.dialog = true
      this.productId = id;
    },
  
   
    closeDialog(){
      this.dialog = false
      this.productId = null;
    },
   
    setProducts(newdata) {
      this.products = newdata?.posts;
    },
  },
  watch: {
    allProducts(newdata) {
      this.setProducts(newdata);
    },

    selected(newValue) {
      if (newValue.length == 0) {
        this.setProducts(this.$store.getters.getProducts);
      } else {
        let filtered = [];
        this.$store.getters.getProducts.posts.forEach((i) => {
          newValue.forEach((category) => {
            if (i.category == category.toString()) {
              filtered.push(i);
            }
          });
        });
        this.products = filtered;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>