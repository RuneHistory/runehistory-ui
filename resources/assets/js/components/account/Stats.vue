<template>
    <div>
        <p>I should be showing stats for {{account}}</p>
        <line-chart chart-id="account-stats" :data="chartData" :options="options"></line-chart>
    </div>
</template>

<script>
    import {getAccountHighscores} from '../../api'

    export default {
        props: ['account'],
        data: function () {
            const data = {
                options: {
                    spanGaps: true,
                    elements: {
                        line: {
                            tension: 0, // disables bezier curves
                            fill: false
                        }
                    },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            distribution: 'linear'
                        }]
                    }
                },
                chartData: {
                    datasets: []
                },
            };
            getAccountHighscores(this.account).map(highscore => {
                return {
                    x: highscore.created_at,
                    y: highscore.skills.overall.experience
                };
            }).then(highscores => {
                data.chartData = {
                    datasets: [
                        {
                            label: 'Overall',
                            data: highscores
                        }
                    ]
                };
            });
            return data;
        }
    }
</script>
