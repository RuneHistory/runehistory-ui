<script>
  // sampleData = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
  //     'September', 'October', 'November', 'December'],
  //   datasets: [
  //     {
  //       label: 'Data One',
  //       backgroundColor: '#f87979',
  //       // Data for the x-axis of the chart
  //       data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  //     },
  //   ],
  // }
  import { Line, mixins } from 'vue-chartjs'

  export default {
    extends: Line,
    mixins: [mixins.reactiveProp],
    data() {
      return {
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            }],
            xAxes: [{
              gridLines: {
                display: false,
              },
            }],
          },
          legend: {
            display: true,
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      }
    },
    mounted() {
      this.renderChart(this.chartData, this.options)
    },
  }
</script>
