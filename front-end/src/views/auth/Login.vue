<template>
  <div class="text-center pt-15 pb-15">
    <template>
      <div>
        
        <v-card class="mx-auto" style="max-width: 500px">
          <v-toolbar class="teal lighten-1 the-toolbar" cards dark flat>
            <v-card-title
              class="
                title
                text-h4 text-capitalize
                white--text
                font-weight-regular
              "
            >
              <router-link to="/" tag="span" class="d-block">
                <v-icon class="the-icon" style="cursor: pointer" x-large
                  >mdi-amazon</v-icon
                >
              </router-link>
              <h5 class="the-header">log in</h5>
            </v-card-title>
          </v-toolbar>
          <v-form
            ref="form"
            @submit.prevent="login"
            v-model="form"
            class="pa-4 pt-6"
          >
            <v-alert
              v-if="errors"
              dense
              outlined
              type="error"
              class="text-capitalize mx-auto"
              style="max-width: 500px"
            >
              {{ errors }}
            </v-alert>
            <v-text-field
              v-model="user.email"
              :rules="[rules.email]"
              filled
              color="deep-purple"
              label="Email address"
              type="email"
            ></v-text-field>

            <v-text-field
              v-model="user.password"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              @click:append="show2 = !show2"
              :rules="[rules.required, rules.length(6)]"
              filled
              color="deep-purple"
              counter="6"
              label="Password"
              style="min-height: 96px"
            >
            </v-text-field>
            <v-divider class="mt-3"></v-divider>
            <v-card-actions class="mt-2">
              <v-btn
                :disabled="!form"
                :loading="loading"
                class="white--text teal lighten-1"
                depressed
                type="submit"
                block
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-form>
          <div class="pt-2 pb-5 text-capitalize">
            <p>
              <router-link to="/signup"
                >haven`t account yet ?
                <router-link to="/forgetPassword"
                  >forget password ?</router-link
                ></router-link
              >
            </p>
          </div>
        </v-card>
      </div>
    </template>
  </div>
</template>
<script>
import Functions from "../../../server/Authantication-Api";
import FormRules from "../../plugins/Form-rules"
export default {
  name: "login",
  data() {
    return {
      user: {
        email: "a@a.com",
        password: "123123Aa!",
      },
      show2: false,
      form: false,
      loading: false,
      loader: null,
      rules:FormRules
    };
  },

  methods: {
    async login() {
       
      try {
        this.loading = true;
        const res = await Functions.login(this.user);
        let msg = `hello ${res.data.user.name}`;
        this.dialogNotifySuccess(msg);
        this.loading = false;
        this.$store.dispatch("setallUserData", res);
        if (res.data.user.email === "ammarlee16@gmail.com") {
          this.$router.push("/Dashboard");
        } else {
          this.$router.push("/");
        }
      } catch (error) {
        const er = error.response.data.errors;
        this.alertError(er);
        this.loading = false;
      }
  },
  }
};
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 200px) {
  .the-toolbar {
    .the-icon {
      font-size: 16px !important;
    }
    .the-header {
      font-size: 13px !important;
    }
  }
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
