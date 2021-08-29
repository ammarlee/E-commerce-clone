<template>
  <div class="home">
    <div cols=" pt-0 pr-0 pl-0">
      <v-row>
        <v-col cols="12" class="pt-0">
          <app-carsoul></app-carsoul>
        </v-col>
      </v-row>

      <div class="mt-16 pt-5">
        <div class="mb-10">
          <v-row>
            <v-col cols="12">
              <h1 class="headers-title fontName">our categories</h1>
              <p class="headers-title text-body-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Similique quibusdam debitis, molestias praesentium sapiente
                quasi ut nesciunt quos dolorum asperiores.
              </p>
            </v-col>
          </v-row>
        </div>
        <!-- first one  -->
        <app-categories></app-categories>
      </div>
    </div>
  </div>
</template>
<script>
import Carsoul from "./shared/Carsoul";
import Categories from "./Category/Categories";

export default {
  name: "Home",
  components: {
    "app-carsoul": Carsoul,
    "app-categories": Categories,
  },
  data() {
    return {
      data: null,
      products: null,
      errors: null,
      alldata: null,
      rout: this.$route.name,
    };
  },

  async mounted() {
    try {
      this.products = this.$store.getters.getProducts.posts;
    } catch (error) {
      this.errors = error.response;
    }
  },
};
</script>
<style lang="scss" scoped>
</style>

