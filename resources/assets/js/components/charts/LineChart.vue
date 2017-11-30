<template>
    <canvas :id="chartId"></canvas>
</template>

<script>
    import Chart from 'chart.js'

    export default {
        props: ['data', 'options', 'chartId'],
        watch: {
            data: function () {
                if (this.chart) {
                    this.chart.destroy();
                }
                this.renderChart(this.data, this.options);
            },
        },
        data: function() {
            return {
                chart: null
            }
        },
        methods: {
            renderChart: function (data, options) {
                console.log('rendering chart', data);
                const ctx = document.getElementById(this.chartId);
                this.chart = new Chart(ctx, {
                    type: 'line',
                    data: data,
                    options: options
                });
            }
        }
    }
</script>