<template>
    <v-tabs
      dark
      next-icon="mdi-arrow-right-bold-box-outline"
      prev-icon="mdi-arrow-left-bold-box-outline"
      color="blue-grey"
      slider-color="blue-grey"
      show-arrows
    >
      <v-tabs-slider color="white "></v-tabs-slider>
      <v-tab
      class="black--text text-capitalize"
        v-for="item in category" :key="item._id"
        :href="'#tab-' + item.name"
        @click="navegat(item)"
      >
         {{ item.name }}
      </v-tab>
    </v-tabs>
</template>
<script>
  export default {
    name:'category',
    computed:{
      category(){
        return this.$store.getters.getCategory
      }

    },
    methods: {
      navegat(item){
        if (this.$route.name ==='cat') {
          this.$router.push('/').then(()=>{
          this.$router.push(`/cat/${item.name}`)
          })
        
      }else{
        this.$router.push(`/cat/${item.name}`)
      }
      }
    },
    
  }
</script>

<style lang="scss" scoped>


</style>