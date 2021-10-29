<template>
  <div>
    <!-- new -->
        <div>
      <v-navigation-drawer
        app
        disable-resize-watcher
        style="transition: all 0.5s ease-in-out"
        touchless
        dark
        v-model="adminDrawer"
      >
        <div id="overlay"></div>
        <router-link
          active-class="activelink"
          exact
          v-for="(item,i) in links "
          :key="i"
          :to="item.link"
          tag="div"
          style="cursor: pointer"
        >
          <v-list nav dense  class="text-capitalize rounded-lg font-weight-bold pt-0 pb-0 ">
            <template>
              <v-list-item link>
                <v-list-item-avatar>
                  <v-icon medium>{{item.icon}}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    class="text-body-1"
                    style="font-family: 'Material Design Icons' !important;"
                  >{{item.title}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </router-link>
       
      </v-navigation-drawer>
    </div>
    <!-- toolbar -->
    <v-toolbar dark dense flat>
      <v-btn text @click="adminDrawer=!adminDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
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
                  <v-img v-if="currentUser.img"  :src="currentUser.img"></v-img>
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

    <!-- new  -->

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
      adminDrawer:false,
      links:[
        {link:'/Dashboard',title: 'Dashboard',icon:'mdi-home'},
        {link:'/category',title: 'category',icon:'mdi-table'},
        {link:'/products',title: 'products',icon:'mdi-shopping-outline'},
        {link:'/allOrders',title: 'orders',icon:'mdi-shopping-outline'},
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
};
</script>

<style lang="scss" scoped>
.activelink{
  background-color: orange;
}
</style>
