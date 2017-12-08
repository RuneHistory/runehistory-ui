<template>
    <div>
        <line-chart v-show="!loading" chart-id="account-stats" :data="chartData" :options="options"></line-chart>
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
                default: undefined
            }
        },
        data: function () {
            let data = {
                loading: false,
                options: {
                    spanGaps: true,
                    elements: {
                        line: {
                            tension: 0,
                            fill: false
                        }
                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            distribution: 'linear',
                            time: {
                                unit: 'day',
                                displayFormats: {
                                    day: "YYYY-MM-DD",
                                },
                            }
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
            return data;
        },
        watch: {
            account: function () {
                this.populateChartData();
            },
            skills: function () {
                this.populateChartData();
            }
        },
        methods: {
            populateChartData: function () {
                this.loading = true;
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
                    this.chartData = {
                        datasets
                    };
                    this.loading = false;
                });
            }
        },
        mounted: function() {
            this.populateChartData();
        }
    }
</script>
