<template>
  <div>
  
    <v-row>
      <v-col class="d-flex justify-center">
        <v-data-table
    :headers="headers"
    :items="order"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>My order
       <v-chip
  close-icon="mdi-close-outline"
  color="orange"
>{{total}}</v-chip>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title class="text-caption"> {{date}} </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
       
      
      </v-toolbar>
    </template>
      <template v-slot:[`item.img`]="{ item }">
        <v-img v-if="item.img" aspect-ratio="2"  contain :src="item.img"></v-img>
    </template>
   
    
  </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Functions from "../../../server/Order_Api";
export default {
  data() {
    return {
      order: [],
      date:null,
        headers: [
        { text: 'name', value: 'name' ,align: 'center',class:['pink--text','text-capitalize']},
        { text: 'category', value: 'category' ,align: 'center',class:['pink--text','text-capitalize']},
        { text: 'quantity', value: 'quantity' ,align: 'center',class:['pink--text','text-capitalize']},
        { text: 'price', value: 'price',align: 'center',class:['pink--text','text-capitalize'] },
        { text: 'img', value: 'img',align: 'center', class:['pink--text','text-capitalize']},
      ],
    }
  },
  async mounted() {
    try {
      const res = await Functions.getSingleOrders(this.$route.params.id);
      this.order=res.data.order.items.products
      this.total=res.data.order.items.total
      this.date = this.formateDateWithMoment(res.data.order.items.date,"LLL")
    } catch (error) {
      this.errors = error.response;
    }
  },
};
</script>

<style lang="scss" scoped></style>
