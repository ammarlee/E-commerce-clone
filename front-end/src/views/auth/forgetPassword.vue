<template>
  <v-app>
    <template>
      <div class="mt-10">
        <router-link to="/login" tag="div" class="mx-auto text-center ">
          <v-icon style="cursor: pointer;font-size: 68px;">mdi-amazon</v-icon>
        </router-link>
        <v-card class="mx-auto mt-3" style="max-width: 500px;">
          <v-toolbar color="deep-purple accent-4" cards dark flat>
            <v-card-title
              class="title  text-h4  text-capitalize white--text font-weight-regular"
            >
              forget Email
            </v-card-title>
          </v-toolbar>
          <v-form
            ref="form"
            @submit.prevent="forgetPw"
            v-model="form"
            class="pa-4 pt-6"
          >
            <v-text-field
              v-model="email"
              :rules="[rules.email]"
              filled
              color="deep-purple"
              label="Email address"
              type="email"
            ></v-text-field>

            <v-divider class="mt-3"></v-divider>
            <v-card-actions class="mt-2">
              <v-btn
                :disabled="!form"
                :loading="loading"
                class="white--text"
                color="deep-purple accent-4"
                depressed
                type="submit"
                block
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </div>
    </template>
  </v-app>
</template>
<script>
import Functions from "../../../server/Authantication-Api";
import FormRules from "../../plugins/Form-rules"

export default {
  data() {
    return {
      email: null,
      msg: null,
      form: false,
      loading: false,
      loader: null,
      rules: FormRules
    };
  },
  methods: {
    async forgetPw() {
      this.errors = null;
      this.msg = null;
      try {
        this.loading = true;
        const res = await Functions.forgetPassword({ email: this.email });
        this.msg = res.data.msg;
        this.dialogNotifySuccess(this.msg);
        this.loading = false;
      } catch (error) {
        this.dialogNotifyError(error.response.data.error);
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
