<template>
  <div>
    <v-container>
      <v-row justify="center" align="center">
       
        <v-col
          cols="12"
          sm="3"
          md="3"
          style="cursor: pointer"
          class="
            grey
            lighten-3
            ma-1
            pa-3
            rounded-lg
            text-center text-capitalize
          "
          v-for="item in items"
          :key="item._id"
          @click="getFilterdProducts(item)"
        >
          <div>
            <div>
              <v-img :src="item.img" max-height="150"></v-img>
            </div>
            <h3>{{ item.name }}</h3>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Functions from "../../../server/Category-Api";

export default {
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.getDate();
  },
  computed: {
    param() {
      return this.$route.params.name;
    },
  },
  methods: {
    async getDate() {
      try {
        this.loading = true;
        const categorioes = await Functions.getCategories();
        this.items = categorioes.data.cat.filter((i) => {
          return i._id == this.param;
        })[0].subCategory;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.errors = error;
      }
    },
    getFilterdProducts(item) {
      this.$emit("getFilterdProducts", item);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>