<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator> </template>
            <v-card>
              <v-card-title>
                <span class="headline text-capitalize"> add new category</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form v-model="valid">
                    <v-row v-if="mode == 1">
                      <v-col cols="12" sm="6" md="10" class="d-block">
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

                      <v-col cols="12">
                        <input
                          type="file"
                          :rules="[allRules.required]"
                          @change="uploadFile"
                          single
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="10" class="d-block">
                        <v-textarea
                          dense
                          outlined
                          hide-details
                          :rules="[allRules.required, allRules.minNameLen(4)]"
                          label="description"
                          v-model="category.description"
                        >
                        </v-textarea>
                      </v-col>
                    </v-row>
                    <v-row v-else>
                      <v-col cols="12" sm="6">
                        <v-autocomplete
                          v-model="child"
                          :items="entities"
                          item-text="name"
                          item-value="_id"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" sm="6">
                        
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
                  v-if="!editmode"
                  color="green darken-1"
                  text
                  :disabled="!valid"
                  type="sumbit"
                  @click="addCategory"
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
                  <v-toolbar-title> category list</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-btn color="success mr-1" small @click="add"
                    >add category
                    <i class="fa fa-plus mr-2"></i>
                  </v-btn>
                  <v-btn color="info " small @click="add"
                    >add child
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
import Functions from "../../../server/Category-Api";
export default {
  name: "addCategory",
  data() {
    return {
      files: [],
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
      headers: [
        {
          text: "name",
          value: "name",
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
        const categorioes = await Functions.getCat();
        this.entities = categorioes.data.cat;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.errors = error;
      }
    },
    async confirmEdit() {
      try {
        const formData = new FormData();
        formData.append("files", this.img);
        formData.append("category", JSON.stringify(this.category));

        const res = await Functions.editCategory(formData);
        var i = this.entities.indexOf(
          this.entities.filter((e) => e._id == this.category._id)[0]
        );
        this.$set(this.entities, i, res.data.category);
        this.dialog = false;
        this.dialogNotifySuccess(res.data.msg);
      } catch (error) {
        this.dialogNotifyError(error.response.msg);
      }
    },
    uploadFile(e) {
      this.img = e.target.files[0];
    },

    add() {
      this.dialog = true;
      this.category = {};
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
      this.editmode = true;
      this.id = id;
      this.category = { ...this.entities.filter((e) => e._id == id)[0] };
      console.log(this.category);
      this.dialog = true;
    },
    cancelEdit() {
      this.editmode = false;
      this.dialog = false;
      this.product = {};
    },
    // uploadFile(e) {
    //   const input = e.target.files;
    //   var reader = new FileReader();
    //   reader.readAsDataURL(input[0]);
    //   reader.onload = () => {
    //     this.files.push(reader.result);
    //   };
    // },
    async addCategory() {
      try {
        const formData = new FormData();
        formData.append("files", this.img);
        formData.append("category", JSON.stringify(this.category));
        const res = await Functions.createCategory(formData);
        this.$set(this.entities, this.entities.length, res.data.category);

        this.dialog = true;
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
