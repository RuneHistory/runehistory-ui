<template>
    <main-layout>
        <b-row>
            <b-col>
                <div class="panel panel-default">
                    <div class="panel-heading">Stats for: {{account}}</div>

                    <div class="panel-body">
                        <account-stats :account="account"></account-stats>
                    </div>
                </div>
            </b-col>
        </b-row>
    </main-layout>
</template>

<script>
    import MainLayout from '../../layouts/Main.vue'

    export default {
        components: {
            MainLayout
        },
        data: function () {
            return {
                account: 'baino'
            }
        },
        created: function () {
            console.log('created account stats');
        },
    }
</script>