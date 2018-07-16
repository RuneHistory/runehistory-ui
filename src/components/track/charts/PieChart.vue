<script>
  // sampleData = {
  //   labels: ["match1", "match2", "match3", "match4", "match5"],
  //   datasets: [
  //     {
  //       label: "TeamA Score",
  //       data: [10, 50, 25, 70, 40],
  //       backgroundColor: [
  //         "#DEB887",
  //         "#A9A9A9",
  //         "#DC143C",
  //         "#F4A460",
  //         "#2E8B57"
  //       ],
  //       borderColor: [
  //         "#CDA776",
  //         "#989898",
  //         "#CB252B",
  //         "#E39371",
  //         "#1D7A46"
  //       ],
  //       borderWidth: [1, 1, 1, 1, 1]
  //     }
  //   ]
  // }
  import { Pie, mixins } from 'vue-chartjs'
  import { numberWithCommas } from '../../../util'

  export default {
    extends: Pie,
    mixins: [mixins.reactiveProp],
    props: ['title', 'legend', 'label'],
    data() {
      return {
        options: {
          animation: false,
          legend: {
            display: this.legend,
          },
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: typeof this.title !== 'undefined',
            text: this.title || null,
          },
          tooltips: {
            callbacks: {
              label(tooltipItem, data) {
                const dataset = data.datasets[tooltipItem.datasetIndex]
                const item = dataset.data[tooltipItem.index]
                const label = data.labels[tooltipItem.index]
                return `${label}: ${numberWithCommas(item)}`
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
