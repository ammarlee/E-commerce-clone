// const DATA_COUNT = 5;
// var delayed;
// const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};
export const planetChartData = {
  type: "line",
  data: {
    // labels: ["Mercury", "Venus", "Earth", "Mars",],
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      // {
      //   label: "Number of Moons",
      //   data: [0, 0, 1, 2, 79, 82, 27, 14],
      //   backgroundColor: "rgba(54,73,93,.5)",
      //   borderColor: "#36495d",
      //   borderWidth: 3
      // },
      
      {
        label: "Planetary Mass (relative to the Sun x 10^-6)",
        data: [525,100,626,640,200],
        backgroundColor: "grey",
        borderColor: "blue",
        borderWidth: 3
      },
      {
        label: "Planetary Mass (relative to the Sun x 10^-6)",
        data: [535,10,166,640,10],
        backgroundColor: "orange  ",
        borderColor: "pink",
        borderWidth: 4
      }
    ]
  },
  options: {
    responsive: true,
    lineTension: 5,
    
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            padding: 25
          }
        }
      ]
    }
  }
};

export default planetChartData;