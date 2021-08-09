<template>
  <div class="content">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!overlay" class="thecontainer">
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
                      ></div>
                    </transition>
                  </div>
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
            </div>
          </v-hover>
        </v-col>
      </v-row>

      <v-row v-if="products">
        <v-col v-if="products.length == 0">
          <h1 class="text-center font-weight-bold pink--text">
            there is no products
          </h1>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Functions from "../../../server/Products-Api";
export default {
  data() {
    return {
      overlay2: true,
      alldata: null,
      products: null,
    };
  },

  computed: {
    param() {
      return this.$route.params.name;
    },
    user() {
      return this.$store.getters.getUser;
    },
    // products() {
    //   return this.$store.getters.getProducts.posts.filter((p) => {
    //     return p.category == this.param;
    //   });
    // },
    getProducts() {
      return this.$store.getters.getProducts;
    },
  },
  mounted() {
    if (this.getProducts) {
      this.fetchData();
    }
  },
  watch: {
    getProducts: {
      handler: function () {
        this.fetchData();
      },
      deep: true,
    },
  },

  methods: {
    fetchData() {
      if (this.getProducts && this.getProducts.posts) {
        // debugger;

        this.products = this.getProducts.posts.filter((p) => {
          return p.category == this.param;
        });
      }
    },

    async deleteOne(productId) {
      try {
        this.overlay = true;
        await Functions.deleteProduct(productId);
        this.dialogNotifySuccess("deleteed successfully");
        let test = this.alldata.filter((p) => {
          return p._id.toString() !== productId.toString();
        });
        this.alldata = test;
        this.overlay = false;
      } catch (error) {
        this.dialogNotifyError("something error");
        this.errors = error.response;
        this.overlay = false;
      }
    },
    details(productId) {
      this.$router.push("/details/" + productId);
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
