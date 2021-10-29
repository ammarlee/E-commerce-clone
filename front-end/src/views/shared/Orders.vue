 <template>
  <div class="mt-15">
    <v-container>
      <v-row>
      <v-col class="d-flex justify-center">
        <div class="px-10 py-5 rounded-lg grey lighteen-3">
        <h2 class="text-capitalize white--text ">all order</h2>
        </div>
      </v-col>
     </v-row>
      <v-row>
        <v-col cols="12">
          <v-simple-table class="mt-15 font-weight-bold" height="300px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center text-h6 text-capitalize">
                    count
                  </th>
                   <th class="text-center text-h6 text-capitalize">
                    name
                  </th>
                   <th class="text-center text-h6 text-capitalize">
                    state
                  </th>
                  
                  <th class="text-center text-h6 text-capitalize">
                    price
                  </th>
                   <th class="text-center text-h6 text-capitalize">
                    date
                  </th>
                  <th class="text-center text-h6 text-capitalize">
                    view
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in orders" :key="item._id" class="text-center">
                  <td>{{ item.items.products.length }}</td>
                  <td>{{ item.userId.name }}</td>
                  <td>{{ item.shipping |stateFilter }}</td>
                  <td>{{ item.items.total }}</td>
                  <td>{{  item.items.date |formateDate}}</td>
                  <td>
                    <v-btn
                      small
                      class=" ma-2"
                      :loading="loading"
                      :disabled="loading"
                      title="view order"
                      icon
                      text
                      @click="viewOrder(item)"
                    >
                      <v-icon color="orange">mdi-eye</v-icon>
                      </v-btn
                    >
                  </td>
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
import Functions from "../../../server/Order_Api";
export default {
    props:['userId'],
  data() {
    return {
      loading: false,
      errors: null,
      orders: null,
    };
  },
  methods: {
    async viewOrder(item) {
     this.orders.find((i) => {
        return i._id.toString() == item._id.toString();
      });
      this.$router.push('/showOrder/'+item._id);
      

    },
    
  },
  async mounted() {
    try {
     this.showOverlay = true
      const res = await Functions.getOrders(this.userId);
      console.log(res);
      this.orders = res.data.orders;
     this.showOverlay = false;
    } catch (error) {
     this.showOverlay = false;
      this.errors = error.response.err.msg;
    }
  },
};
</script>

