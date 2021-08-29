<template>
  <div>
    <v-row dense>
      <v-col
        cols="12"
        class="pa-0 ma-0 pointer"
        sm="6"
        md="6"
        v-for="item in categoryList"
        :key="item._id"
        @click="navegatToCategory(item)"
      >
        <v-hover v-slot="{ hover }">
          <div>
            <v-img
              :src="item.img"
              cover
              max-height="360"
              aspect-ratio="1.4"
              
            >
              <v-expand-transition>
                <div
                  v-if="hover"
                  :elevation="hover ? 12 : 2"
                  :class="{ 'on-hover': hover }"
                  class="
                    hoverdiv
                    divopacity
                    on-hover
                    transition-fast-in-fast-out
                    v-card--reveal
                    display-3
                    white--text
                  "
                  style="height: 100%"
                >
                  <h3 class="fontName headers-title pt-16">{{ item.name }}</h3>
                  <p class="text-body-1 headers-title pa-2 mt-3">
                    {{ item.description }}
                  </p>
                </div>
              </v-expand-transition>
            </v-img>
          </div>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import categoryFunctions from "../../../server/Category-Api";

export default {
  data() {
    return {
      categoryList: null,
    };
  },
  methods: {
        navegatToCategory(item){
          this.$router.push(`/cat/${item.name}`)
        },
  },
  async mounted() {
    try {
      this.overlay = true;
      const categories = await categoryFunctions.getCategories();
      this.categoryList = categories.data.cat;
      this.overlay = false;
    } catch (error) {
      this.errors = error.response;
      this.overlay = false;
    }
  },
};
</script>

<style lang="scss" scoped>
</style>