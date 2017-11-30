<template>
    <main-layout>
        <b-row>
            <b-col>
                <div class="panel panel-default">
                    <div class="panel-heading">Stats for: {{account}}</div>

                    <div class="panel-body">
                        <account-stats :account="account" :skills="skills"></account-stats>
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
            const skills = this.$route.query.skills;
            return {
                account: this.$route.query.account || 'baino',
                skills: skills ? skills.split(',') : undefined,
            }
        },
        created: function () {
            console.log('created account stats');
        },
    }
</script>