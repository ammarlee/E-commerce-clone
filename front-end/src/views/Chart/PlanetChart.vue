<template>
  <div>
    <canvas id="planet-chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
import planetChartData from './Chart.js'

export default {
  name: 'PlanetChart',
  mounted() {
    const ctx = document.getElementById('planet-chart');
    new Chart(ctx, this.planetChartData);
  },
    data() {
    return {
      planetChartData: planetChartData
    }
  }
}
</script>