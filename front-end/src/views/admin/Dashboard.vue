<template>
  <div>
    <v-toolbar color="black" dense>
      <v-toolbar-items class="d-none d-md-inline">

        <v-btn
        v-for="(item,i) in links" :key="i"
          text
          :to="item.link"
          :title="item.title"
          active-class="red"
          class="text-none font-weight-bold"
        >
          <v-icon x-large color="white">{{item.icon}}</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-menu v-if="currentUser" bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon class="d-none d-sm-inline mt-1" v-on="on">
            <v-icon large class="white--text" v-if="!currentUser.img">
              mdi-account-circle
            </v-icon>
            <v-avatar color="green" size="35" v-if="currentUser.img">
              <v-img v-if="currentUser.img" :src="currentUser.img"></v-img>
              <span v-else class="white--text headline">p</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <router-link to="/profile">
                <v-avatar color="green">
                  <v-img v-if="currentUser.img" :src="currentUser.img"></v-img>
                  <span v-else class="white--text headline">P</span>
                </v-avatar>
              </router-link>
              <h3>{{ currentUser.name }}</h3>
              <p class="caption mt-1">
                {{ currentUser.email }}
              </p>

              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded @click="logout" text>
                <v-icon>mdi-logout</v-icon>logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-toolbar>
    <v-row>
      <v-col class="d-flex justify-center mt-10">
        <h2 class="text-capitalize">admin dashboard</h2>
        <div></div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <router-view></router-view>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Functions from "../../../server/Authantication-Api";
export default {
  data() {
    return {
      links:[{link:'/Dashboard',title: 'category',icon:'mdi-table'},
        {link:'/products',title: 'products',icon:'mdi-shopping-outline'},
        {link:'/coupon',title: 'coupon',icon:'mdi-shopping'},
        ]
    }
  },
  methods: {
    async logout() {
      try {
        await Functions.logOut();
        this.$store.dispatch("logoutUser").then(() => {
          this.$router.push("/login");
        });
      } catch (error) {
        this.errors = error;
      }
    },
  },
  computed: {
   
  },
};
</script>

<style lang="scss" scoped></style>
