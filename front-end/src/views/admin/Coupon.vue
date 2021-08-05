<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-dialog v-model="dialog" persistent max-width="400px">
            <template v-slot:activator> </template>
            <v-card>
              <v-card-title>
                <span class="headline text-capitalize"> add new coupon</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row dense>
                    <v-col cols="12" sm="6" md="10" class="d-block">
                      <v-text-field
                        dense
                        outlined
                        hide-details
                        type="text"
                        label="name"
                        v-model="coupon.percentage"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="cancelEdit">
                  Close
                </v-btn>
                <v-btn
                  v-if="!editmode"
                  color="green darken-1"
                  text
                  type="sumbit"
                  @click="addCoupon"
                >
                  Save
                </v-btn>
                <v-btn
                  v-if="editmode"
                  color="green darken-1"
                  text
                  type="sumbit"
                  @click="confirmEdit()"
                >
                  edit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>

      <v-row class="my-0 text-center" dense>
        <v-col cols="12" class="d-flex justify-center">
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>

            <v-data-table
              :headers="headers"
              :items="entities"
              :search="search"
              :loading="loading"
              loading-text="Loading... Please wait"
              fixed-header
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title> coupon list</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click="add"
                    >add coupon
                    <i class="fa fa-plus mr-2"></i>
                  </v-btn>
                </v-toolbar>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn icon @click="del(item._id)"
                  ><v-icon color="error">mdi-delete</v-icon></v-btn
                >
                <v-btn icon @click="edit(item._id)">
                  <v-icon color="success">mdi-pencil</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- ----------------------- -->
  </div>
</template>

<script>
import Functions from "../../../server/Coupon-Api";
export default {
  name: "createCoupon",
  data() {
    return {
      files: [],
      coupon: {
        percentage: null,
      },
      search: "",
      editmode: false,
      loading: false,
      dialog: false,
      entities: [],
      headers: [
        {
          text: "couponNumber",
          value: "couponNumber",
          align: "center",
          class: ["orange--text", "text-capitalize"],
        },
        {
          text: "percentage",
          value: "percentage",
          align: "center",
          class: ["orange--text", "text-capitalize"],
        },
        {
          text: "edit/delete",
          value: "actions",
          align: "center",
          class: ["orange--text", "text-capitalize"],
        },
      ],
    };
  },
  mounted() {
    this.getDate();
  },
  methods: {
    async getDate() {
      try {
        this.loading = true;
        const res = await Functions.getCoupons();
        this.entities = res.data.coupons;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.errors = error;
      }
    },
    async confirmEdit() {
      try {
        const res = await Functions.editCoupon(this.coupon);
        var i = this.entities.indexOf(
          this.entities.filter((e) => e._id == this.coupon._id)[0]
        );
        this.$set(this.entities, i, res.data.coupon);
        this.dialog = false;
        this.dialogNotifySuccess(res.data.msg);
      } catch (error) {
        this.dialogNotifyError(error.response.msg);
      }
    },

    add() {
      this.dialog = true;
      this.coupon = {};
    },
    del(id) {
      this.$dialog
        .info({
          text: "are you sure you want to delete?",
          title: "  delete coupon ",
          persistent: true,
          actions: {
            true: {
              text: "yes",
              color: "green",
              handle: () => {
                Functions.deleteCoupon(id)
                  .then(() => {
                    this.dialogNotifySuccess("deleted");
                      const index = this.entities.indexOf(this.entities.filter(e=>e._id==id)[0]);
                      if (index > -1) {
                        this.entities.splice(index, 1);
                      }
                  })
                  .catch((error) => {
                    this.dialogNotifyError(error.response);
                  });
              },
            },
            false: {
              text: "cancel",
            },
          },
        })
    },

    edit(id) {
      this.editmode = true;
      this.id = id;
      this.coupon = { ...this.entities.filter((e) => e._id == id)[0] };
      this.dialog = true;
    },
    cancelEdit() {
      this.editmode = false;
      this.dialog = false;
      this.product = {};
    },

    async addCoupon() {
      try {
        const res = await Functions.createCoupon({
          percentage: this.coupon.percentage,
        });
        this.dialog = true;
        this.$set(this.entities, this.entities.length, res.data.newCoupon);
        this.dialogNotifySuccess(res.data.msg);
      } catch (error) {
        this.dialogNotifyError(error.response.msg);
        this.errors = error;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
