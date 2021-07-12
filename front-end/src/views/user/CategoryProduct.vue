<template>
<div class="content">

       <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
      </v-overlay>
    <v-container  v-if="!overlay" class="thecontainer" >
      <v-row v-if="!overlay" >
        <v-col cols="12"   sm='6'  md='4' v-for="pro in getProducts" :key="pro._id">
            <v-hover v-slot="{ hover }">
              <v-card
                class="mx-auto"
                color="grey lighten-4"
                max-width="600"
              >
                <v-img
                  :src="pro.img[0]"
                  contain
                  max-height="260"
                   aspect-ratio="1.4"
                   @click.prevent="details(pro._id)"
                >
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                      style="height: 100%;"
                    >
                      ${{pro.price}}
                    </div>
                  </v-expand-transition>
                </v-img>
                <v-card-text
                  class="pt-6"
                  style="position: relative;"
                >
                  <v-btn
                    absolute
                    color="orange"
                    class="white--text"
                    @click.prevent="addToCart(pro)"
                    fab
                    large
                    right
                    top
                  >
                    <v-icon>mdi-cart</v-icon>
                  </v-btn>
                  <div class="font-weight-light thepragraphgh grey--text title mb-2">
                    For the perfect shopping
                  </div>
                  <h6 class="display-1 theproductName font-weight-light orange--text mb-2">
                  {{pro.name}}
                  </h6>
                  
                </v-card-text>
              </v-card>
            </v-hover>
        </v-col>
      </v-row>
      <v-row v-if="getProducts"  >
        <v-col v-if="getProducts.length ==0">
          <h1 class="text-center font-weight-bold pink--text">there is no products </h1>
        </v-col>
      </v-row>

  

    </v-container>
</div>

</template>

<script>
import Functions from "../../../server/Products-Api"
    export default {
        data() {
            return {
                alldata:null,
            }
        },
 computed: {
    param(){
      return this.$route.params.name
    },
    user(){
      return this.$store.getters.getUser
    },
    getProducts(){
      return this.$store.getters.getProducts.posts.filter(p=>{
            return p.category ==this.param
      })
    },

  },
  
  beforeMount() {
  // this.overlay = true
  
  },

  methods: {
    async deleteOne(productId){
     try {
      this.overlay = true

        await Functions.deleteProduct(productId)
        this.dialogNotifySuccess("deleteed successfully")
      let test =  this.alldata.filter(p=>{
         return p._id.toString() !== productId.toString()
       })
       console.log(test);
       this.alldata = test
      this.overlay = false


       
       
     } catch (error) {
          this.dialogNotifyError("something error")

       this.errors = error.response
      this.overlay = false
       
     }

    },
    details(productId){
      this.$router.push('/details/'+productId)
    },
    
  },
    }
</script>

<style lang="scss" scoped>
  .v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .8;
  position: absolute;
  width: 100%;
}
.v-image__image--cover{
  background-size: contain !important;
}
@media only screen and (max-width: 200px) {

.thecontainer {
  .thepragraphgh{
  font-size: 12px !important;
    line-height: 1.2;


  }
  .theproductName{
  font-size: 14px !important;
    line-height: 1.2;
}
  
}
}
@media only screen and (min-width: 200px) and (max-width: 767px)  {
.thecontainer {
  .thepragraphgh{
  font-size: 14px !important;
    line-height: 1.2;

  }
  .theproductName{
  font-size: 18px !important;
    line-height: 1.2;
}
  
}
    }

</style>