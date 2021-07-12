<template>
  <div>
    <v-toolbar color="orange accent-1 ">
      <v-app-bar-nav-icon
        style="cursor: pointer;"
        class="pt-2"
        @click="openDrawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title
        style="height:67px"
        class="title mr-2 pt-5 pl-0 pr-5
      d-none  d-sm-inline"
      >
        <router-link to="/" tag="span" style="cursor:pointer">
          Shopping
        </router-link>
      </v-toolbar-title>
      <!-- THE SEARCHING BAR  -->
      <searching-component></searching-component>
      <!-- THE CATEGORY -->
      <template v-slot:extension>
        <category-component class="d-block "></category-component>
      </template>

      <v-toolbar-title
        class="title ml-1 d-none  d-sm-inline"
        style="height:67px"
      >
        <router-link to="/card" v-if="getUser" tag="span" class="pt-6 headline">
          <v-btn  icon text id="shop" class="mt-4">
            <v-badge
              color="green"
              overlap
              :content="cartSum"
              bordered
              offset-x="20"
              offset-y="10"
              value="1"
            >
              <v-icon large class="white--text"> mdi-cart</v-icon>
            </v-badge>
          </v-btn>
        </router-link>

        <router-link
          v-if="!getUser"
          to="/login" 
          tag="span"
          class="pt-6  mr-1 ml-1 headline"
        >
          <v-btn class="white--text mt-4" outlined>
            <v-icon> mdi-login</v-icon>
            login
          </v-btn>
        </router-link>

        <v-menu v-if="getUser" bottom min-width="200px" rounded offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon class="d-none d-sm-inline mt-1" v-on="on">
              <v-icon large class="white--text" v-if="!getUser.img">
                mdi-account-circle
              </v-icon>
              <v-avatar color="green" size="48" v-if="getUser.img">
                <v-img v-if="getUser.img" :src="getUser.img"></v-img>
                <span v-else class="white--text headline">p</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <router-link to="/profile">
                  <v-avatar color="green">
                    <v-img v-if="getUser.img" :src="getUser.img"></v-img>
                    <span v-else class="white--text headline">P</span>
                  </v-avatar>
                </router-link>
                <h3>{{ getUser.name }}</h3>
                <p class="caption mt-1">
                  {{ getUser.email }}
                </p>

                <v-divider class="my-3"></v-divider>
                <router-link
                  v-for="item in menuItems"
                  :key="item.id"
                  :to="item.link"
                  tag="span"
                  class="pt- headline d-md-none"
                >
                  <v-btn text>
                    <v-icon>{{ item.icon }}</v-icon
                    >{{ item.page }}
                  </v-btn>
                  <v-divider class="my-3"></v-divider>
                </router-link>
                <v-btn depressed rounded @click="logout" text>
                  <v-icon>mdi-logout</v-icon>logout
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
// import axios from 'axios'
import Functions from "../../../server/Authantication-Api";
import { mapGetters } from "vuex";
import Category from "../Category";
import searchingBar from "./searchingBar";
export default {
  name: "navbar",
  components: {
    "category-component": Category,
    "searching-component": searchingBar,
  },
  data() {
    return {
      isLoading: false,
      items: [],
      model: null,
      search: null,
      tab: null,
    };
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

    profileNavigate() {
      this.$router.push("/profile");
    },
    openDrawer() {
      this.drawer = !this.drawer;
    },
  },
  computed: {
    ...mapGetters([
      "getCategory",
      "getUser",
      "getTotalPrice",
      "isLoggedIn",
      "token",
      "notifications",
    ]),

    rightDrawer: {
      get() {
        return this.$store.getters.rightDrawer;
      },
      set(value) {
        this.$store.dispatch("toggleRightDrawer", value);
      },
    },
    cartPrice() {
      return this.$store.getters.getTotalPrice;
    },
    cart() {
      return this.$store.getters.getCart;
    },
    cartSum() {
      return this.$store.getters.getCartCount;
    },
    menuItems() {
      if (this.isLoggedIn) {
        let items = [
          {
            id: 51242,
            page: "cart",
            link: "/cart",
            icon: "mdi-cart",
          },
          {
            id: 51242,
            page: "cart",
            link: "/cart",
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

<style lang="scss" scoped></style>
