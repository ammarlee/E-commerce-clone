<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-dialog v-model="dialog" persistent max-width="900px">
            <template v-slot:activator> </template>
            <v-card>
              <v-card-title>
                <span class="headline"> add new product</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        label="name"
                        hide-details
                        type="text"
                        required
                        dense
                        outlined
                        v-model="product.name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <!-- category  -->
                      <v-select
                        v-model="product.category"
                        :items="categorList"
                        item-text="name"
                        item-value="_id"
                        dense
                        outlined
                        menu-props="auto"
                        label="Select category"
                        hide-details
                        single-line
                      >
                      </v-select>
                    </v-col>
                     <v-col cols="12" sm="4" md="4">
                      <!-- category  -->
                      <v-select
                        v-model="product.subChildCategory"
                        :items="subChildCategory"
                          item-text="name"
                        item-value="_id"
                        dense
                        outlined
                        menu-props="auto"
                        label="Select sub child category"
                        hide-details
                        single-line
                      >
                      </v-select>
                    </v-col>
                     <v-col cols="12" sm="4" md="4">
                      <!-- color  -->
                      <v-select
                        v-model="product.color"
                        :items="Colors"
                        item-text="text"
                        dense
                        outlined
                        menu-props="auto"
                        label="Select color"
                        hide-details
                        single-line
                      >
                      </v-select>
                    </v-col>
                       <v-col cols="12" sm="4" md="4">
                      <!-- gender  -->
                      <v-select
                        v-model="product.gender"
                        :items="Genders"
                        item-text="text"
                        dense
                        outlined
                        menu-props="auto"
                        label="Select gender"
                        hide-details
                        single-line
                      >
                      </v-select>
                    </v-col>
                       <v-col cols="12" sm="4" md="4">
                      <!-- size  -->
                      <v-select
                        v-model="product.size"
                        :items="Sizes"
                        item-text="text"
                        dense
                        outlined
                        menu-props="auto"
                        label="Select size"
                        hide-details
                        single-line
                      >
                      </v-select>
                    </v-col>




                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="quantity"
                        type="number"
                        hide-details
                        dense
                        outlined
                        required
                        v-model.number="product.quantity"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="price"
                        type="number"
                        hide-details
                        dense
                        outlined
                        required
                        v-model.number="product.price"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <input type="file" @change="uploadFile" multiple />
                    </v-col>
                    <v-col v-if="editmode" cols="12">
                      <div class="d-flex justify-space-around flex-wrap">
                        <div v-for="(img, i) in product.img" :key="i">
                          <v-img
                            :src="img"
                            alt="post"
                            max-height="170"
                            max-width="150"
                          >
                          </v-img>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <vue-editor v-model="product.description"></vue-editor>
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
                  @click="handleSubmit"
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
                  <v-toolbar-title> products list</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click="add"
                    >add product
                    <i class="fa fa-plus mr-2"></i>
                  </v-btn>
                </v-toolbar>
              </template>

            <template v-slot:[`item.name`]="{ item }">
                <p style="cursor: pointer" @click="details(item._id)">
                  {{ item.name }}
                </p>
              </template>
               <template v-slot:[`item.size`]="{ item }" >
                <p  v-if="item.size">
                  {{ item.size |SizeFilter}}
                </p>
              </template>
               <template v-slot:[`item.color`]="{ item }" >
                <p v-if="item.color" >
                  {{ item.color |ColorFilter}}
                </p>
              </template>
               <template v-slot:[`item.gender`]="{ item }" >
                <p v-if="item.gender" >
                  {{ item.gender |GenderFilter}}
                </p>
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
  </div>
</template>

<script>
import Functions from "../../../server/Products-Api";
import CategoryFunctions from "../../../server/Category-Api";
import Enums from '../../plugins/Enums';
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      dialog: false,
      Sizes:Enums.Sizes,
      Genders:Enums.Genders,
      Colors:Enums.Colors,
      id: null,
      search: "",
      editmode: false,
      entities: [],
      loading: false,
      headers: [
        {
          text: "name",
          value: "name",
          align: "center",
          class: ["orange--text", "text-capitalize"],
        },
        {
          text: "price",
          value: "price",
          align: "center",
          class: ["orange--text", "text-capitalize"],
        },
        {
          text: "category",
          value: "category.name",
          align: "center",
          class: ["orange--text", "text-capitalize"],
        },
        {
          text: "quantity",
          value: "quantity",
          align: "center",
          class: ["orange--text", "text-capitalize"],
        },
         {
          text: "color",
          value: "color",
          align: "center",
          class: ["orange--text", "text-capitalize"],
        },
         {
          text: "size",
          value: "size",
          align: "center",
          class: ["orange--text", "text-capitalize"],
        }, {
          text: "gender",
          value: "gender",
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
      product: {
        name: "ammarlee",
        img: [],
        subChildCategory:null,
        price: null,
        description: "it will be amazing  ",
        quantity: null,
        checked: false,
        size:null,
        gender:null,
        color:null,
        files: null,
        category: "sports",
      },
      images: null,
      categorList: null,
      subChildCategory:[],

    };
  },
  async mounted() {
    try {
      this.loading = true;
      const res = await Functions.fetchProducts();
      console.log({res});
      const categorioes = await CategoryFunctions.getCategories();
      this.categorList = categorioes.data.cat;
      this.entities = res.data.posts;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
      this.errors = error;
    }
  },
  methods: {
    details(productId) {
      this.$router.push("/details/" + productId);
    },

    uploadFile(e) {
      this.images = e.target.files;
    },
    cancelEdit() {
      this.dialog = false;
      this.editmode = false;
      this.product = {};
    },
    add() {
      this.product = {};
      this.images = [];
      this.dialog = true;
    },
    edit(id) {
      this.editmode = true;
      this.id = id;
      this.product = { ...this.entities.filter((e) => e._id == id)[0] };
      this.dialog = true;
    },
    confirmEdit() {
      const formData = new FormData();
      if (!this.images) {
        for (const i of Object.keys(this.product.img)) {
          formData.append("files", this.product.img[i]);
        }
      } else {
        for (const i of Object.keys(this.images)) {
          formData.append("files", this.images[i]);
        }
      }
      formData.append("product", JSON.stringify(this.product));
      formData.append("id", JSON.stringify(this.id));
      formData.append("user", JSON.stringify(this.currentUser));
      Functions.editProduct(formData)
        .then((res) => {
          console.log({res});
          this.dialogNotifySuccess("edited successfully");
          var i = this.entities.indexOf(
            this.entities.filter((e) => e._id == res.data.post._id)[0]
          );
          this.$set(this.entities, i, res.data.post);
          this.dialog = false;
          this.editmode = false;
        })
        .catch((err) => {
          this.dialogNotifyError(err.response.data);
        });
    },
    del(id) {
      this.$dialog
        .info({
          text: "are you sure you want to delete?",
          title: "  delete product   ",
          persistent: true,
          actions: {
            true: {
              text: "yes",
              color: "green",
              handle: () => {
                Functions.deleteProduct(id)
                  .then((res) => {
                    this.entities = this.entities.filter((p) => {
                      return p._id !== id;
                    });
                    this.dialogNotifySuccess(res.data.msg);
                  })
                  .catch((error) => {
                    this.dialogNotifyError("not valid");
                    this.errors = error;
                  });
              },
            },
            false: {
              text: "cancel",
            },
          },
        })
      
    },
    handleSubmit() {
      const formData = new FormData();
      for (const i of Object.keys(this.images)) {
        formData.append("files", this.images[i]);
      }
      formData.append("data", JSON.stringify(this.product));
      formData.append("user", JSON.stringify(this.currentUser));
      Functions.addProduct(formData)
        .then((res) => {
          this.entities.push(res.data.products);
          this.dialog = false;
          this.product = {};
          this.images = [];
          this.dialogNotifySuccess("added new product");
        })
        .catch((err) => {
          this.dialogNotifyError(err);
          this.errors = err;
        });
    },
  },
  watch: {
    "product.category"(newValue, ) {
      if (newValue) {
        this.subChildCategory=this.categorList.filter(i=>{
          return i._id ==newValue
      })[0].subCategory
        }
    }
  },

};
</script>

<style lang="scss" scoped></style>
