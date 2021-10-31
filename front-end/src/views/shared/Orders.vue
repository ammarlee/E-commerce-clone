 <template>
  <div class="mt-15">
    <v-container>
      <v-row>
        <v-col class="d-flex justify-center">
          <div class="px-10 py-5 rounded-lg grey lighteen-3">
            <h2 class="text-capitalize white--text">all order {{ userId }}</h2>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-simple-table class="mt-15 font-weight-bold" height="300px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center text-h6 text-capitalize">count</th>
                  <th class="text-center text-h6 text-capitalize">name</th>
                  <th class="text-center text-h6 text-capitalize">state</th>
                  <th
                    v-if="!userId"
                    class="text-center text-h6 text-capitalize"
                  >
                    change state
                  </th>

                  <th class="text-center text-h6 text-capitalize">price</th>
                  <th class="text-center text-h6 text-capitalize">date</th>
                  <th class="text-center text-h6 text-capitalize">view</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in orders" :key="item._id" class="text-center">
                  <td>{{ item.items.products.length }}</td>
                  <td>{{ item.userId.name }}</td>
                  <td>
                    <v-chip
                      class="ma-2 white-text"
                      :color="chooseColor(item.shipping)"
                    >
                      {{ item.shipping | stateFilter }}
                    </v-chip>
                  </td>
                  <td v-if="!userId">
                    <v-menu>
                      <template v-slot:activator="{ on: menu, attrs }">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on: tooltip }">
                            <v-btn
                              color="primary"
                              fab
                              icon
                              dark
                              @click="selected = item"
                              v-bind="attrs"
                              v-on="{ ...tooltip, ...menu }"
                            >
                              <v-icon color="pink">mdi-lock</v-icon>
                            </v-btn>
                          </template>
                          <span>state</span>
                        </v-tooltip>
                      </template>

                      <v-card class="text-center" width="400">
                        <v-list>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title class="text-h5"
                                >state (<span
                                  class="
                                    text-capitalize
                                    red--text
                                    font-weight-bold
                                    text-body-1
                                  "
                                >
                                  {{ item.shipping | stateFilter }} </span
                                >)</v-list-item-title
                              >
                              <v-divider></v-divider>
                            </v-list-item-content>
                          </v-list-item>

                          <v-list-item-action class="mt-0">
                            <v-list-item-title>
                              <v-btn
                                v-for="(btn, i) in buttons"
                                :key="i"
                                class="ma-1 white--text"
                                @click="changeState(item, i + 1)"
                                :color="btn.color"
                                >{{ btn.name }}</v-btn
                              >
                            </v-list-item-title>
                          </v-list-item-action>
                        </v-list>
                      </v-card>
                    </v-menu>
                  </td>
                  <td>{{ item.items.total }}</td>
                  <td>{{ item.items.date | formateDate }}</td>
                  <td>
                    <v-btn
                      small
                      class="ma-2"
                      :loading="loading"
                      :disabled="loading"
                      title="view order"
                      icon
                      text
                      @click="viewOrder(item)"
                    >
                      <v-icon color="orange">mdi-eye</v-icon>
                    </v-btn>
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
  props: ["userId"],
  data() {
    return {
      buttons: [
        { color: "error", name: "first" },
        { color: "orange", name: "two" },
        { color: "pink", name: "three" },
        { color: "success", name: "forth" },
      ],
      loading: false,
      errors: null,
      orders: null,
    };
  },
  methods: {
    chooseColor(num) {
      let text;
      switch (num) {
        case 1:
          text = "primary";
          break;
        case 2:
          text = "pink";
          break;
        case 3:
          text = "red";
          break;
        case 4:
          text = "green";
          break;

        default:
          text = "orange";
          break;
      }
      return text;
    },
    async changeState(item, newState) {
      try {
        const { data } = await Functions.changeOrderState({
          _id: item._id,
          newState,
        });
        let index = this.orders.indexOf(item);
        this.$set(this.orders, index, data.order);
      } catch (error) {
        console.log(error);
        this.errors = error.response.err;
      }
    },
    async viewOrder(item) {
      this.orders.find((i) => {
        return i._id.toString() == item._id.toString();
      });
      this.$router.push("/showOrder/" + item._id);
    },
  },
  async mounted() {
    try {
      this.showOverlay = true;
      const res = await Functions.getOrders(this.userId);
      this.orders = res.data.orders;
      this.showOverlay = false;
    } catch (error) {
      this.showOverlay = false;
      this.errors = error.response.err.msg;
    }
  },
};
</script>

