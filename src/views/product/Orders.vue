<template>
  <div class="mt-15">
    <v-container>
      <h1 class="text-center font-weight-bold green--text text-capitalize">your orders</h1>
      <v-row>
        <v-col cols='12'>
          <v-simple-table class="mt-15 font-weight-bold" height="300px">
          <template v-slot:default>
            <thead>
              <tr >
                <th class="text-left text-h6 text-capitalize">
                  count
                </th>
                <th class="text-left text-h6 text-capitalize">
                  price
                </th>
                <th class="text-left text-h6 text-capitalize">
                  details
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in orders"
                :key="item.name"
              >
                <td>{{ item.products.length }} </td>
                <td>{{ item.total }}</td>
                <td>
                  <v-btn small 
                  class="info ma-2"
                  :loading="loading"
                  :disabled="loading"
                  @click=" download(item)">
                    <v-icon>mdi-download</v-icon>
                  download</v-btn></td>
              </tr>
            </tbody>
          </template>
          </v-simple-table>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Functions from '../../../server/api'
  export default {
    data() {
      return {
         desserts: [
          
      ],
      loader: null,
      loading: false,
      errors:null,
      orders:null,
      done:null
      }
    },
    methods: {
     async download(order){
       this.loading = true
       try {
         const res = await Functions.downloadOrder(order)
         this.loading = false
          this.alertDisplay('success','you have downloaded it successfully',3000)
         this.done = res.data

       } catch (error) {
         this.loading = false
         console.log(error.response);
         this.errors = error.response
       }
      }
    },
    async mounted() {
      try {
        const res = await Functions.getOrders(this.$store.getters.getUser._id)
        this.orders = res.data.orders.orders
        
      } catch (error) {
        this.errors = error.response.err.msg
      }
    },
  }
</script>