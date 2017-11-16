<template>
    <div>
        <p>I should be showing stats for {{account}}</p>
        <!--<pre>{{chartData}}</pre>-->
        <line-chart :chart-data="chartData" :options="options"></line-chart>
    </div>
</template>

<script>
    import {getAccountHighscores} from '../../api'

    export default {
        props: ['account'],
        data: function () {
            const data = {
                options: {responsive: true, maintainAspectRatio: false},
                chartData: {
                    labels: [],
                    datasets: []
                },
                testData: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [
                        {
                            label: 'GitHub Commits',
                            backgroundColor: '#f87979',
                            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                        }
                    ]
                }
            };
            let labels = [];
            const label = 'Overall XP';
            getAccountHighscores(this.account).map(highscore => {
                labels.push(highscore.created_at);
                return highscore.skills.overall.experience;
            }).then(experience => {
                data.chartData = {
                    labels: labels,
                    datasets: [{
                        label: label,
                        backgroundColor: '#f87979',
                        data: experience
                    }]
                };
            });
            return data;
        }
    }
</script>
