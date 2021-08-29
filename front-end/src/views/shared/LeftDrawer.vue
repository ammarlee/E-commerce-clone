<template>
  <div>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      style="position: absolute"
      class="white black--text"
    >
      <div
        style="cursor: pointer; background: #232f3e"
        @click="navigateToProfile"
      >
        <v-list-item-avatar
          style="
            height: 64px;
            min-width: 40px;
            width: 64px;
            margin: 0 auto;
            display: inline-block;
          "
          v-if="currentUser"
        >
          <img :src="currentUser.img" alt="profileImg" v-if="currentUser.img" />
          <v-icon large class="white--text" v-else> mdi-account-circle </v-icon>
        </v-list-item-avatar>
        <v-list-item
          class="text-capitalize d-inline-block text-center white--text"
        >
          <v-list-item-content>
            <v-list-item-title
              v-if="currentUser"
              class="font-weight-medium white--text"
            >
              Hello , {{ currentUser.name }}
              <br />
            </v-list-item-title>
            <v-list-item-title
              @click="navigateTologin"
              v-else
              class="font-weight-medium text-capitalize white--text text-center"
            >
              welcome , login
              <br />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-item
          block
          class="pr-1 pl-1"
          v-for="item in menuItems"
          :key="item.title"
        >
          <v-btn
            text
            :to="item.link"
            class="d-flex justify-start font-weight-bold text-capitalize"
            style="width: 100%; font-family: sans-serif"
          >
            <v-icon left>{{ item.icon }}</v-icon>
            <span class="ml-3">
              {{ item.page }}
            </span>
          </v-btn>
          <hr />
        </v-list-item>
        <v-list-item block v-if="currentUser" @click="logout">
          <v-btn
            text
            style="width: 100%"
            class="pl-0 font-weight-bold d-flex justify-start"
          >
            <v-icon left class="mr-4">mdi-logout</v-icon>
            logout
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Functions from "../../../server/Authantication-Api"
export default {
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

    navigateTologin() {
      this.$router.push("/login");
    },
    navigateToProfile() {
      this.$router.push("/profile");
    },
  },
  computed: {

    isLoggedIn(){
        return this.$store.getters.isLoggedIn
    },
    menuItems() {
      if (this.isLoggedIn) {
        let items = [
          {
            id: 51242,
            page: "cart",
            link: "/card",
            icon: "mdi-cart",
          },

          {
            id: 5,
            page: "orders",
            link: "/orders",
            icon: "mdi-playlist-check",
          },
        ];
        return items;
      } else {
        let items = [
          {
            id: 4241512,
            page: "home",
            link: "/",
            icon: "mdi-home",
          },

          { id: 314, page: "signup", link: "/signUp", icon: "mdi-door" },
          { id: 613, page: "login", link: "/login", icon: "mdi-login" },
        ];
        return items;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>