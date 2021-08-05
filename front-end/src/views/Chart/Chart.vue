<template>
  <div id="app">
    <h2 class="font">font family </h2>
      <v-row>
          <v-col cols=6>

    <PlanetChart/>
          </v-col>
      </v-row>
  </div>
</template>

<script>
import PlanetChart from './PlanetChart.vue'

export default {
  name: 'App',
  components: {
    PlanetChart
  }
}
</script>
<style scoped lang="scss">
.font{
font-family: 'Euphoria Script', cursive;
  color: red;
}
</style>