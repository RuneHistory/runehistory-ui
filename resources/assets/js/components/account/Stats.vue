<template>
    <div>
        <p>I should be showing stats for {{account}}</p>
        <pre>{{this.highscores}}</pre>
    </div>
</template>

<script>
    import { getAccountHighscores } from '../../api'

    export default {
        created: function () {
            console.log('created account stats component');
        },
        props: ['account'],
        data: function () {
            const data = {
                highscores: []
            };
            getAccountHighscores(this.account).then(highscores => {
                data.highscores = highscores;
                console.log(data.highscores);
            });
            return data;
        }
    }
</script>
