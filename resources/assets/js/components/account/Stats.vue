<template>
    <p>I should be showing stats for {{account}}</p>
</template>

<script>
    import { getAccountHighscores } from '../../api'

    export default {
        created: function () {
            console.log('created account stats component');
        },
        props: ['account'],
        data: function () {
            return {
                highscores: getAccountHighscores(this.account)
            }
        }
    }
</script>
