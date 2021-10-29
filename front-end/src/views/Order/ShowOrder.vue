<template>
  <div>
    <v-row>
      <v-col class="d-flex justify-center" cols="12" sm="8" offset-sm="2">
        <v-data-table
          :headers="headers"
          :items="order"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title
                >My order
                <v-chip
                  v-if="total"
                  close-icon="mdi-close-outline"
                  color="orange"
                  >{{ total }}</v-chip
                >
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-title class="text-caption">
                {{ date | formateDate }}
              </v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
            </v-toolbar>
          </template>
          <template v-slot:[`item.name`]="{ item }">
            <p style="cursor: pointer" @click="navigatToProduct(item)">
              {{ item.name }}
            </p>
          </template>
          <template v-slot:[`item.img`]="{ item }">
            <v-img
              v-if="item.img"
              aspect-ratio="2"
              contain
              :src="item.img"
            ></v-img>
          </template>
        </v-data-table>
      </v-col>
      <app-overlay></app-overlay>
    </v-row>
  </div>
</template>

<script>
import Functions from "../../../server/Order_Api";
export default {
  name: "signleOrder",
  data() {
    return {
      order: [],
      curr: 1,
      total: null,
      date: null,
      headers: [
        {
          text: "name",
          value: "name",
          align: "center",
          class: ["pink--text", "text-capitalize"],
        },
        {
          text: "category",
          value: "category",
          align: "center",
          class: ["pink--text", "text-capitalize"],
        },
        {
          text: "quantity",
          value: "quantity",
          align: "center",
          class: ["pink--text", "text-capitalize"],
        },
        {
          text: "price",
          value: "price",
          align: "center",
          class: ["pink--text", "text-capitalize"],
        },
        {
          text: "img",
          value: "img",
          align: "center",
          class: ["pink--text", "text-capitalize"],
        },
        {
          text: "state",
          value: "state",
          align: "center",
          class: ["pink--text", "text-capitalize"],
        },
      ],
    };
  },
  async mounted() {
    try {
     this.showOverlay = true
      const res = await Functions.getSingleOrders(this.$route.params.id);
      this.order = res.data.order.items.products;
      this.total = res.data.order.items.total;
     this.showOverlay = false;

    } catch (error) {
     this.showOverlay = false;
      this.errors = error.response;
    }
  },
  methods: {
    navigatToProduct(item) {
      this.$router.push("/Product/" + item.productId);
    },
  },
};
</script>

<style lang="scss" scoped></style>
