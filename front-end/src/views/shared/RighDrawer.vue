<template>
    <div>
        <v-navigation-drawer
      temporary
      right
      width="100"
      v-model="rightDrawer"
      style="position: fixed"
      class="white black--text"
    >
    <h4 class="px-4">shopping</h4>
    <v-divider class="mb-5"></v-divider>
    <div class="text-center" v-if="cart">

      <div class="mb-3" v-for="item in cart.products" :key="item._id">

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

    </v-navigation-drawer>

    </div>
</template>

<script>
    export default {
        computed: {
            cart() {
                return this.$store.getters.getCart 
            }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>