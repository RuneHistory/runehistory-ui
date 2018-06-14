<script>
  // sampleData = {
  //   datasets: [{
  //     label: 'Date object',
  //     backgroundColor: '#889df8',
  //     borderColor: '#889df8',
  //     fill: false,
  //     data: [{
  //       x: this.newDate(0),
  //       y: 0,
  //     }, {
  //       x: this.newDate(2),
  //       y: 10,
  //     }, {
  //       x: this.newDate(4),
  //       y: 40,
  //     }, {
  //       x: this.newDate(5),
  //       y: 100,
  //     }],
  //   }],
  // }
  import { Line, mixins } from 'vue-chartjs'

  export default {
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: ['title', 'legend'],
    data() {
      return {
        options: {
          legend: {
            display: this.legend,
          },
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: typeof this.title !== 'undefined',
            text: this.title || null,
          },
          scales: {
            xAxes: [{
              type: 'time',
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Date',
              },
              ticks: {
                major: {
                  fontStyle: 'bold',
                  fontColor: '#FF0000',
                },
              },
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'XP',
              },
              ticks: {
                beginAtZero: true,
              },
            }],
          },
        },
      }
    },
    mounted() {
      this.renderChart(this.chartData, this.options)
    },
  }
</script>
