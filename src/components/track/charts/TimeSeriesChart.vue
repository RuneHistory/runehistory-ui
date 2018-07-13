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
  import { numberWithCommas } from '../../../util'

  export default {
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: ['title', 'legend', 'label'],
    data() {
      return {
        options: {
          animation: false,
          legend: {
            display: this.legend,
          },
          elements: {
            line: {
              tension: 0,
            },
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
              distribution: 'linear',
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
              time: {
                minUnit: 'day',
                tooltipFormat: 'Do MMM YYYY - h:mma',
              },
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: this.label,
              },
              ticks: {
                callback(value) {
                  if (!(value % 1)) {
                    return numberWithCommas(Number(value).toFixed(0))
                  }
                  return null
                },
              },
            }],
          },
          tooltips: {
            callbacks: {
              label(tooltipItem, data) {
                const dataset = data.datasets[tooltipItem.datasetIndex]
                const item = dataset.data[tooltipItem.index]
                return `${dataset.label}: ${numberWithCommas(item.y)}`
              },
            },
          },
        },
      }
    },
    mounted() {
      this.renderChart(this.chartData, this.options)
    },
  }
</script>
