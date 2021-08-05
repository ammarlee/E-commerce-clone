<template>
<div>

  <v-carousel cycle height="600" hide-delimiter-background  :show-arrows="false">
    <v-carousel-item v-for="(slide, i) in imgs" :key="i">
      <v-sheet height="100%">
        <v-row class="fill-height fill-width" align="center" justify="center">
          <v-img :src="slide.link" alt="welcome"></v-img>
          <v-fade-transition>
            <v-overlay absolute color="rgb(33 33 33)">
              <div>
                <h1 class="text-capitalize font-weight-bold fontName text-center">welcome to shopping</h1>
                <p
                  class="text-body-2"
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Et numquam tempore reiciendis, sit accusantium quisquam .</p>
                <div class="text-center">
               
                </div>
              </div>
            </v-overlay>
          </v-fade-transition>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>

</div>
  
</template>

<script>
export default {
  data() {
    return{
      dialog:false,
        imgs: [
        {
          title: "your bright future is our mission ",
          link:'https://res.cloudinary.com/ammarleejot/image/upload/v1628010217/revolt-164_6wVEHfI-unsplash_useagp.jpg',
        },
        {
          title: "the new way to learn properly with us  ",
          link:'https://res.cloudinary.com/ammarleejot/image/upload/v1628010242/keagan-henman-xPJYL0l5Ii8-unsplash_gzwfxe.jpg',
        },
        {
          title: "online learning platform ",
          link:require('@/assets/adele.jpg'),
        },
      ],
    }
  }
};
</script>

<style lang="scss" scoped>
</style>