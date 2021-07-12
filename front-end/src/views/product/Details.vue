<template>
  <div class="about text-center white pt-15  pl-5 ">
     <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
      </v-overlay>
    <div class="details text-center" v-if="products">
        <small  class="info--text">{{products.category}}</small>
          <h2 class="text-capitalize font-weight-bold">{{products.name}}</h2>
         
      <v-row>
       
        <v-col cols="12" sm="6" md="6">
        <v-carousel>
          <v-carousel-item
            v-for="(item,i) in products.img"
            :key="i"
            v-img:group 
            aspect-ratio="1.4"
            :src="item"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
          <div  class="d-inline-block">
          <star-rating class="ml-15"  disabled v-model="rating" />
          <v-btn class="yellow darken-2  white--text mt-2  left"  left  @click="reviewpage(products._id)">add your review </v-btn>
 
            </div>

        </v-col>

        <v-col cols="12" sm="4" md="4"  offset-md='1' offset-sm='1'>
          <div class="pt-5 grey lighten-4 rounded-lg pl-2 pr-2 pb-3" >
          <p class="d-block info--text">model id :{{products._id}}</p>
          
          <p>
             <v-icon class="red--text pr-2" >mdi-calendar-clock</v-icon>arrives:
             <span class="info--text">
             {{date }}
             </span>
          </p>
          <p class="teaxt-subtitle-1" v-html="products.description"></p>

          <strong class="pink--text d-block">$ {{products.price}}</strong>
           <v-btn color="green white--text  mb-2"   @click="addToCart(products)" ><v-icon>mdi-cart</v-icon>add to Card</v-btn>
            

        </div>

        </v-col>
      </v-row>
      <v-divider class="mb-3"></v-divider>
      <div class="text-capitalize">
        <h1>reviews</h1>

      </div>

    <!-- review section   will be below here -->
   
   </div>
  </div>
</template>
<script>
import Functions from "../../../server/Products-Api"
import StarRating from 'vue-star-rating'
export default {
  components: {
  StarRating
},
// mixins:{},
  data() {
    return {
      products:null,
      id:this.$route.params.id,
      errors:null,
      rout:this.$route.name,
       length: 3,
      window: 3,
      rating:5,
      overlay:false,
      
    }
  },
  async mounted() {
    this.overlay=true
      try {
        let res = await Functions.getSingleProduct(this.id)
       this.products = res.data.product
    this.overlay=false

        
      } catch (error) {
    this.overlay=false

        this.errors = error
        
      }
  },
  computed: {
    user(){
      return this.$store.getters.getUser
    },
    date(){
     const date= new Date((new Date()).getTime() + (10 * 86400000))
    return date.toDateString()
    }
  },
  methods: {
    reviewpage(productId){
      this.$router.push('/addReview/'+productId)
    },
   
  },
}
</script>

<style lang="scss" >
  
</style>