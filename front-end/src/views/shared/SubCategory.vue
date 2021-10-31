<template>
  <div>
    <v-container class="fontName">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="12" md="12">
          <h2 class="headers-title ">filters</h2>

          <v-list>
            <v-list-group :value="true" prepend-icon="mdi-plus">
              <template v-slot:activator>
                <v-list-item-title class="pa-0 ma-0">
                  <h4 class=" text-left pa-0 ma-0 font-weight-bold">shop by product</h4>
                </v-list-item-title>
              </template>
              <v-list-item>
                <!-- <v-list-item-title v-text="title"></v-list-item-title> -->

                <v-list class="text-capitalize font-weight-bold" nav dense>
                  <v-list-item-group color="primary">
                    <v-list-item
                      v-for="(item, i) in items"
                      :key="i"
                      @click="getFilterdProducts(item)"
                    >
                      <v-list-item-icon>
                        <v-img
                          :src="item.img"
                          max-width="30"
                          class="rounded-circle"
                          max-height="40"
                        ></v-img>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title class="font-weight-bold" style="font-size:20px"
                          v-text="item.name"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-list-item>
            </v-list-group>
          </v-list>
<!-- colors -->
          <v-list >
            <v-list-group :value="true" prepend-icon="mdi-plus">
              <template v-slot:activator>
                <v-list-item-title class="pa-0 ma-0">
                  <h4 class=" text-left pa-0 ma-0">colors</h4>
                </v-list-item-title>
              </template>
              <v-list-item>
                <v-list class="text-capitalize font-weight-bold" nav dense>
                  <v-list-item-group color="primary">
                        <v-checkbox
                    v-for="item in colors"
                    :key="item.value"
                    v-model="selected"
                    :label="item.text"
                    hide-details
                    class="pt-0 "
                    color="orange"
                    :value="item.value"
                    dense
                  ></v-checkbox>
                  
                  </v-list-item-group>
                </v-list>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Functions from "../../../server/Category-Api";
import enums from "../../plugins/Enums"

export default {
  data() {
    return {
       selected: [],
      items: [],
      colors:enums.Colors
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
    getFilterdProductsByColor(val){
      this.$emit("getFilterdProductsByColor", val);

    }
  },
  watch: {
     selected(newValue) {
      if (newValue.length > 0) {
        this.getFilterdProductsByColor(newValue)
      }
     }
  },
};
</script>

<style lang="scss" scoped>
</style>