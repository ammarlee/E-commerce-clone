<template>
  <v-app  >
    <!-- left drawer -->
     <v-navigation-drawer
      temporary
      v-model="drawer"
      style="position: absolute"
      class="white black--text"
    >
    
    <div style="cursor: pointer ;background:#232F3E"  @click="profileNavigate" >
        <v-list-item-avatar 
        style="height: 64px;
                min-width: 40px;
                width: 64px;
                margin: 0 auto;
                display: inline-block;"
               
                v-if="getUser" >
          <img  :src="getUser.img" alt="name" v-if="getUser.img" >
          <v-icon large class="white--text" v-else >
              mdi-account-circle
            </v-icon>
        </v-list-item-avatar>
      <v-list-item  class="text-capitalize d-inline-block text-center white--text">
        <v-list-item-content  >
          <v-list-item-title  v-if="getUser" class="font-weight-medium white--text ">
          Hello ,  {{ getUser.name }}
            <br>
          </v-list-item-title>
           <v-list-item-title @click="login" v-else class="font-weight-medium text-capitalize white--text  text-center">
           welcome , login
            <br>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
  

    <v-divider></v-divider>
      <v-list dense>

        <v-list-item block class="pr-1 pl-1"  v-for="item in menuItems"  :key="item.title">
            <v-btn  text :to="item.link"  class="d-flex justify-start font-weight-bold text-capitalize" style="width:100%; font-family: sans-serif;" >
              <v-icon left>{{ item.icon }}</v-icon>
              <span class="ml-3">
                {{ item.page }}
                </span>
            </v-btn>
            <hr>
        </v-list-item>
         <v-list-item block v-if="getUser" @click="logout"   >
            <v-btn  text  style="width:100% "   class="pl-0 font-weight-bold d-flex justify-start" >
              <v-icon left class="mr-4">mdi-logout</v-icon>
              logout
            </v-btn>
        </v-list-item>

      </v-list> 
    </v-navigation-drawer>
<!-- finsihed the left drwaer  -->
<!-- start the right drawer -->
<v-navigation-drawer
      temporary
      right
      width="100"
      v-model="rightDrawer"
      style="position: absolute"
      class="white black--text"
    >
    <h4 class="px-4">shopping</h4>
    <v-divider class="mb-5"></v-divider>
    <div class="text-center" v-if="getCart">

      <div class="mb-3" v-for="item in getCart.products" :key="item._id">

      <v-badge bordered  overlap color="green" bottom :content="item.quantity" >
        <v-avatar size="40">
          <v-img :src="item.img"></v-img>
        </v-avatar>
      </v-badge>
      
      </div>
      <router-link to="/card" tag="button">
      <v-btn text class="pink--text ">
          <v-icon small>
            mdi-cart
          </v-icon>
          cart
      </v-btn>
      </router-link>
      
      
      
    </div>
    

      <v-list dense>
       
        

      </v-list> 
    </v-navigation-drawer>
<!-- finsih the right drawer -->
   
      <router-view name="header"> </router-view>
    <v-main >
      <transition name="slide" mode="out-in">
         <router-view></router-view>
      </transition>
    </v-main>
    <!-- footer -->
      <router-view name="footer"></router-view>
  </v-app>
</template>

<script>
import Functions from "../server/Authantication-Api"
import {mapGetters} from 'vuex'

export default {
 
  data: () => ({
        errors:null,
        data:null,
        loading: false,
        items: [],
        search:null,
      
  }),
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

    login(){
           this.$router.push('/login')

    }
  ,
    profileNavigate(){
      this.$router.push('/profile')
    },
    details(id){
     
      this.$router.push('/details/'+id)

    }
  },
  computed: {
      ...mapGetters(['getCategory','getUser','getTotalPrice','isLoggedIn','token','getCart','getCartCount','getTotalPrice']),
 
     drawer: {
      get() {
        return this.$store.getters.drawer;
      },
      set(value) {
        this.$store.dispatch("toggleDrawer", value);
      }
      
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
  }

</script>
<style scoped lang="scss">
#thenavbar{
  background: #0F1111;
  padding: 10px 10px 2px 3px;
.col{
  background: #0F1111;
}

}
.beforename {
  flex-grow: 0.5 !important;
}
.slide-enter {
  opacity: 0;
}
.slide-enter-active {
  animation: slide-in 0.5s ease-out forwards;
  transition: opacity 0.5s;
}
.slide-leave {
}
.slide-leave-active {
  animation: slide-out 0.5s ease-in reverse;
  transition: opacity 0.5s;
  opacity: 0;
}
@keyframes slide-in {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes slide-out {
  to {
    transform: translateY(0);
  }
  from {
    transform: translateY(20px);
  }
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  #thenavbar{
    padding: 20px;
  }
  #shop{
display: none;
  }
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined){
  height: 37px;
    width: 60px;
}
}

  
</style>
