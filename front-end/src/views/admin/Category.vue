<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-dialog v-model="dialog" persistent max-width="900px">
            <template v-slot:activator> </template>
            <v-card>
              <v-card-title class="grey lighten-3">
                <span class="headline text-capitalize success--text">
                  add new category</span
                >
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form v-model="valid">
                    <v-row>
                      <template v-if="!showSubChild">

                      <v-col cols="12" sm="6" md="6" class="d-block">
                        <v-text-field
                          dense
                          outlined
                          hide-details
                          :rules="[allRules.required, allRules.minNameLen(4)]"
                          type="text"
                          label="name"
                          v-model="category.name"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="3"
                        class="ml-4"
                        md="3"
                        @click="ref"
                      >
                        <v-btn class="success white--text">upload image</v-btn>
                      </v-col>

                      <v-col cols="12">
                        <input
                          class="d-none"
                          ref="uploadImg"
                          type="file"
                          :rules="[allRules.required]"
                          @change="uploadFile"
                          single
                        />
                      </v-col>
                      <v-col cols="12" v-if="img" class="rounded-circle">
                        <v-img
                          class="rounded-circle"
                          max-height="50"
                          max-width="50"
                          :src="img"
                        ></v-img>
                      </v-col>
                      </template>

                      <v-divider></v-divider>
                      <v-col cols="12">
                        <v-row>
                          <v-col
                            cols="12"
                            v-if="id"
                            sm="2"
                            md="2"
                            @click="showSubChild = !showSubChild"
                          >
                            <v-btn class="success white--text"
                              >add sub child</v-btn
                            >
                          </v-col>

                          <v-col cols="12" v-if="showSubChild">
                            <v-row class="grey lighten-3">
                              <v-col cols="12" sm="4" md="4">
                                <v-text-field
                                  dense
                                  outlined
                                  hide-details
                                  :rules="[
                                    allRules.required,
                                    allRules.minNameLen(4),
                                  ]"
                                  type="text"
                                  label="name"
                                  v-model="subchild.name"
                                >
                                </v-text-field>
                              </v-col>

                              <v-col cols="12" sm="4" md="4">
                                <input
                                  type="file"
                                  :rules="[allRules.required]"
                                  @change="uploadSubFile"
                                  single
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                sm="1"
                                md="1"
                                v-if="!subchild._id"
                              >
                                <v-btn class="success" @click="addsubChild"
                                  >add</v-btn
                                >
                               
                              </v-col>
                              <v-col
                                cols="12"
                                sm="1"
                                md="1"
                                v-if="!subchild._id"
                              >
                               
                                <v-btn class="danger mr-1" @click="resetSubChild"
                                  >rest</v-btn
                                >
                              </v-col>
                              <v-col v-else cols="12" sm="1" md="1">
                                <v-btn class="info" @click="editsubChild"
                                  >edit</v-btn
                                >
                              </v-col>

                              <v-col cols="12" v-if="subchild.img">
                                <v-img
                                  class="rounded-lg"
                                  contain
                                  max-height="50"
                                  max-width="50"
                                  :src="subchild.img"
                                ></v-img>
                              </v-col>
                            </v-row>
                          </v-col>

                        </v-row>
                      </v-col>
                      <v-col cols="12" class="d-block">
                        <v-data-table
                          :headers="headers"
                          :items="category.subCategory"
                          :search="search"
                          :loading="loading"
                          loading-text="Loading... Please wait"
                          fixed-header
                          class="elevation-1"
                        >
                          <template v-slot:top>
                            <v-toolbar flat>
                              <v-toolbar-title>
                                sub category list</v-toolbar-title
                              >
                            </v-toolbar>
                          </template>
                          <template v-slot:[`item.img`]="{ item }">
                            <v-img
                              contain
                              class="rounded-circle"
                              max-height="50"
                              max-width="50"
                              :src="item.img"
                            ></v-img>
                          </template>
                          <template v-slot:[`item.actions`]="{ item }">
                            <v-btn icon @click="delSubChildCategory(item._id)"
                              ><v-icon color="error">mdi-delete</v-icon></v-btn
                            >
                            <v-btn icon @click="editsub(item)">
                              <v-icon color="success">mdi-pencil</v-icon>
                            </v-btn>
                          </template>
                        </v-data-table>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="cancelEdit">
                  Close
                </v-btn>
                <v-btn
                  v-if="!id"
                  color="green darken-1"
                  text
                  :disabled="!valid"
                  type="sumbit"
                  @click="addCategory"
                >
                  Save
                </v-btn>
                <v-btn
                  v-else
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
                  <v-toolbar-title> category list</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-btn color="success mr-1" small @click="add"
                    >add category
                    <i class="fa fa-plus mr-2"></i>
                  </v-btn>
                </v-toolbar>
              </template>
              <template v-slot:[`item.img`]="{ item }">
                <v-img
                  contain
                  class="rounded-circle"
                  max-height="50"
                  max-width="50"
                  :src="item.img"
                ></v-img>
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
import Functions from "../../../server/Category-Api";
export default {
  name: "addCategory",
  data() {
    return {
      files: [],
      id: null,
      newImg: null,
      child: null,
      mode: 2,
      category: {
        name: null,
      },
      img: null,
      search: "",
      editmode: false,
      loading: false,
      valid: false,
      dialog: false,
      entities: [],
      showSubChild: false,
      subchild: {
        name: "",
        img: null,
        categoryId: null,
      },
      headers: [
        {
          text: "name",
          value: "name",
          align: "center",
          class: ["orange--text", "text-capitalize"],
        },
        {
          text: "img",
          value: "img",
          align: "left",
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
    ref() {
      this.$refs.uploadImg.click();
    },
    async addsubChild() {
      try {
        this.loading = true;
        this.subchild.categoryId = this.id;
        const { data } = await Functions.addSubChildTOCategory(this.subchild);
        this.loading = false;
        this.dialogNotifySuccess(data.msg);
      } catch (error) {
        this.loading = false;
        this.errors = error;
      }
    },
    async getDate() {
      try {
        this.loading = true;
        const {data} = await Functions.getCategories();
        this.entities = data.cat;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.errors = error;
      }
    },
    resetSubChild(){
      this.subchild={
        name: "",
        img: null,
        categoryId: null,
      }
      this.id =null;
    },
    async confirmEdit() {
      try {
        this.newImg = this.img;
        const res = await Functions.editCategory({
          category: this.category,
          img: this.newImg,
        });

        this.newImg = null;

        var i = this.entities.indexOf(
          this.entities.filter((e) => e._id == this.category._id)[0]
        );
        this.$set(this.entities, i, res.data.category);
        this.cancelEdit();
        this.dialogNotifySuccess(res.data.msg);
      } catch (error) {
        this.dialogNotifyError(error.response.msg);
      }
    },
    add() {
      this.id = null;
      this.img = null;
      this.dialog = true;
      this.showSubChild =false
      this.category = {};
    },
    editsub(item) {
      (this.showSubChild = true), (this.subchild = item);
      this.subchild.categoryId = this.id;
    },
    async editsubChild() {
      try {
        const {data}=await Functions.editsubChild(this.subchild);
        this.dialogNotifySuccess(data.msg);
        
      } catch (error) {
        this.dialogNotifyError(error.response.msg);
        
      }
    },
    delSubChildCategory(id) {
      this.$dialog.info({
        text: "are you sure you want to delete?",
        title: "  delete category ",
        persistent: true,
        actions: {
          true: {
            text: "yes",
            color: "green",
            handle: () => {
              Functions.deleteSubChildCategory({
                categoryId: this.id,
                subId: id,
              })
                .then(() => {
                  this.dialogNotifySuccess("deleted");
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
      });
    },
    del(id) {
      this.$dialog.info({
        text: "are you sure you want to delete?",
        title: "  delete category ",
        persistent: true,
        actions: {
          true: {
            text: "yes",
            color: "green",
            handle: () => {
              Functions.deleteCategory(id)
                .then(() => {
                  const index = this.entities.indexOf(
                    this.entities.filter((e) => e._id == id)[0]
                  );
                  if (index > -1) {
                    this.entities.splice(index, 1);
                  }

                  this.dialogNotifySuccess("deleted");
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
      });
    },

    edit(id) {
      this.id = id;
      this.dialog = true;
      this.category = { ...this.entities.filter((e) => e._id == id)[0] };
      this.img = this.category.img;
    },
    cancelEdit() {
      this.id = null;
      this.img = null;
      this.dialog = false;
      this.product = {};
    },
    uploadFile(e) {
      const input = e.target.files;
      var reader = new FileReader();
      reader.readAsDataURL(input[0]);
      reader.onload = () => {
        this.img = reader.result;
      };
    },
    uploadSubFile(e) {
      const input = e.target.files;
      var reader = new FileReader();
      reader.readAsDataURL(input[0]);
      reader.onload = () => {
        this.subchild.img = reader.result;
      };
    },
    async addCategory() {
      try {
        const res = await Functions.createCategory({
          category: this.category,
          img: this.img,
        });
        this.$set(this.entities, this.entities.length, res.data.category);
        this.cancelEdit();
        this.dialogNotifySuccess(res.data.msg);
      } catch (error) {
        this.dialogNotifyError(error.response.data.msg);
        this.errors = error;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
