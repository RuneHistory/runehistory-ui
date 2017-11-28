<template>
    <div>
        <p>I should be showing stats for {{account}}</p>
        <line-chart chart-id="account-stats" :data="chartData" :options="options"></line-chart>
    </div>
</template>

<script>
    import {getAccountHighscores} from '../../api'
    import skills from '../../skills'
    import moment from 'moment'

    export default {
        props: {
            account: String,
            skills: {
                type: Array,
                default: null
            }
        },
        data: function () {
            const data = {
                options: {
                    spanGaps: true,
                    elements: {
                        line: {
                            tension: 0,
                            fill: false
                        }
                    },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            distribution: 'linear'
                        }]
                    },
                    time: {
                        parser: (dateString) => {
                            return moment(dateString, 'YYYY-MM-DD HH:mm:ss');
                        }
                    }
                },
                chartData: {
                    datasets: []
                },
            };
            getAccountHighscores(this.account, this.skills).reduce((reduced, item) => {
                const skillsInItem = Object.keys(item.skills);
                skillsInItem.forEach(skill => {
                    if (!reduced.hasOwnProperty(skill)) {
                        reduced[skill] = [];
                    }
                    reduced[skill].push({
                        t: item.created_at,
                        y: item.skills[skill].experience
                    })
                });
                return reduced;
            }, {}).then(highscores => {
                let datasets = [];
                Object.keys(highscores).forEach(skill => {
                    const name = skills[skill].name;
                    const color = skills[skill].color;
                    datasets.push({
                        label: name,
                        data: highscores[skill],
                        borderColor: color,
                        backgroundColor: color,
                    })
                });
                return datasets;
            }).then(datasets => {
                data.chartData = {
                    datasets
                };
            });
            return data;
        }
    }
</script>
