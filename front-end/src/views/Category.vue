<template>
    <v-tabs
      dark
      next-icon="mdi-arrow-right-bold-box-outline"
      prev-icon="mdi-arrow-left-bold-box-outline"
      color="blue-grey"
      slider-color="blue-grey"
      show-arrows
    >
      <v-tabs-slider color="orange "></v-tabs-slider>
      <v-tab
      class="black--text text-capitalize"
        v-for="item in category" :key="item._id"
        :href="'#tab-' + item.name"
        @click="navegatToCategory(item)"
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
      navegatToCategory(item){
        console.log('navegate');
if (this.$route.name ==='cat') {
          this.$router.push('/').then(()=>{
          // this.$router.push(`/cat/${item.name}`)
          this.$router.push({ path: `/cat/${item.name}`, query: { page:1 }})
          })
        
      }else{
        // this.$router.push(`/cat/${item.name}`)
          this.$router.push({ path: `/cat/${item.name}`, query: { page:1 }})

      }
      }
    },
    
  }
</script>

<style lang="scss" scoped>


</style>