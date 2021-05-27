<template>
  <div class="home">
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

<!-- style=" background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;"
  :style="{'background-image': 'url(' + require('../../assets/login.jpg') + ')'}" -->
          <div cols=" pt-0 pr-0 pl-0">
            <v-img contain src="../assets/shopping.jpg" alt="home" ></v-img>
          </div>
    <v-container class="adminmeet mt-3">
      
      
      <!--  -->
      <v-row>
        <v-col cols="12"   sm='6'  md='4' v-for="cat in ourcat" :key="cat._id">
          <v-card
                class="mx-auto mt-5 mb-1 pb-3 text-capitalize font-weight-bold"
                max-width="374"
                @click="goto(cat.name)"
              >
                <v-card-title >{{cat.name}}</v-card-title>
                <v-img
                  class="mr-2 ml-2"
                  height="250"
                  :src="cat.img"
                ></v-img>

                <h5 class="pl-4 pt-3">show more</h5>
          </v-card>

        </v-col>
      </v-row>

    </v-container>
  </div>
</template>
<script>
import Functions from "../../server/api"

export default {
  name: "Home",
  components: {
  },
  data() {
    return {
      data : null,
      products:null,
      errors:null,
      alldata:null,
      overlay:false,
      rout:this.$route.name,
      ourcat:null
    }
  },
  computed: {
    user(){
      return this.$store.getters.getUser
    },
     rightDrawer: {
      get() {
        return this.$store.getters.rightDrawer;
      },
      set(value) {
        this.$store.dispatch("toggleRightDrawer", value);
      }
    },
  },

 async mounted() {
    try {
      this.overlay = true
      const res=await Functions.fetchProducts(this.$store.getters.token)
      const categories=await Functions.getCat()
      this.ourcat=categories.data.cat
      this.alldata = res
      this.overlay = false
      
    } catch (error) {
      this.errors = error.response
      this.overlay = false

    }
    
  },
  
  methods: {
    goto(item){
        this.$router.push(`/cat/${item}`)

    },
   async deleteOne(productId){
     try {
      this.overlay = true

        await Functions.deleteProduct(productId)
       
      let test =  this.alldata.filter(p=>{
         return p._id.toString() !== productId.toString()
       })
      
       this.alldata = test
      this.overlay = false

       
       
     } catch (error) {
       this.errors = error.response
      this.overlay = false
       
     }

    },
    
    details(productId){
      this.$router.push('/details/'+productId)
    },
     async addToCart(pro){
      try {
       await Functions.addTocart({...pro,user:this.user})
        this.alertDisplay('success','added to cart',2000)
        this.$store.commit('cartCount')
        this.rightDrawer = true
        this.$store.dispatch('findCart',this.user._id)



      } catch (error) {
        this.errors = error
       
        this.alertDisplay('error',error.response.data.msg,2500)

      }
    }
  },
};
</script>

