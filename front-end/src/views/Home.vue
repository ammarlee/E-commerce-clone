<template>
  <div class="home">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <div cols=" pt-0 pr-0 pl-0">
      <v-row>
        <v-col cols="12" class="pt-0">

      <app-carsoul ></app-carsoul>
        </v-col>
      </v-row>

      <div  class="mt-16 pt-5">
        <div class="mb-10">
          <v-row>
            <v-col cols="12">

        <h1 class="headers-title fontName ">our categories</h1>
        <p class="headers-title text-body-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique
          quibusdam debitis, molestias praesentium sapiente quasi ut nesciunt
          quos dolorum asperiores.
        </p>
            </v-col>
          </v-row>

        </div>
        <!-- first one  -->
      <app-categories></app-categories>
        <v-divider></v-divider>

        <!-- second one  -->
        <div class="mt-16 pt-4">

        <app-products></app-products>
        </div>
        
      </div>
    </div>
    
  </div>
</template>
<script>
import productFunctions from "../../server/Products-Api";
import Carsoul from "./shared/Carsoul";
import allProducts from "./user/AllProducts"
import Categories from "./Category/Categories"

export default {
  name: "Home",
  components: {
    "app-carsoul": Carsoul,
    "app-products": allProducts,
    "app-categories":Categories,
  },
  data() {
    return {
      data: null,
      products: null,
      errors: null,
      alldata: null,
      overlay: false,
      rout: this.$route.name,
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    rightDrawer: {
      get() {
        return this.$store.getters.rightDrawer;
      },
      set(value) {
        this.$store.dispatch("toggleRightDrawer", value);
      },
    },
  },

  async mounted() {
    try {
      this.overlay = true;
      // const res = await productFunctions.fetchProducts(
      //   this.$store.getters.token
      // );
      this.products =this.$store.getters.getProducts.posts;
      // this.alldata = res;
      this.overlay = false;
    } catch (error) {
      this.errors = error.response;
      this.overlay = false;
    }
  },

  methods: {
    goto(item) {
      this.$router.push(`/cat/${item}`);
    },
   
    async deleteOne(productId) {
      try {
        this.overlay = true;

        await productFunctions.deleteProduct(productId);
        this.dialogNotifySuccess("deleted successfully");

        let test = this.alldata.filter((p) => {
          return p._id.toString() !== productId.toString();
        });

        this.alldata = test;
        this.overlay = false;
      } catch (error) {
        this.errors = error.response;
        this.dialogNotifyError(error.response.data.errors);
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
.hoverdiv {
  transition: all .5s ease-in-out !important;
}
.divopacity{
  background-color: rgba(0,0,0,.8);

}

</style>

