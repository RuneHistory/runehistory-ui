<template>
    <main-layout>
        <b-row>
            <b-col cols="9">
                <div class="card">
                    <h4 class="card-header">Stats for: {{account}}</h4>
                    <div class="card-body">
                        <account-stats :account="account" :skills="skills"></account-stats>
                    </div>
                </div>
            </b-col>
            <b-col>
                <div class="card">
                    <h4 class="card-header">Query</h4>
                    <div class="card-body">
                        <input v-model="accountFromForm" >
                        <ul>
                            <template v-for="skill in skillSelection">
                                <li>
                                    <input type="checkbox" :id="'skill-' + skill.name" :value="true" v-model="skill.selected">
                                    <label :for="'skill-'+skill.name" :style="'background-color: ' + skill.color">{{ skill.name }}</label>
                                </li>
                            </template>
                        </ul>
                        <button v-on:click="updateFromForm">Update</button>
                    </div>
                </div>
            </b-col>
        </b-row>
    </main-layout>
</template>

<script>
    import MainLayout from '../../layouts/Main.vue'
    import SKILLS from '../../skills'

    export default {
        components: {
            MainLayout
        },
        data: function () {
            let skillSelection = [];
            let skills = this.$route.query.skills;
            skills = skills ? skills.split(',') : Object.keys(SKILLS);
            Object.keys(SKILLS).forEach(skill => {
                skillSelection.push({
                    id: skill,
                    name: SKILLS[skill].name,
                    color: SKILLS[skill].color,
                    selected: skills.indexOf(skill) > -1
                });
            });
            return {
                accountFromForm: this.$route.query.account || 'baino',
                account: this.$route.query.account || 'baino',
                skillSelection,
                skills
            }
        },
        methods: {
            updateFromForm: function () {
                this.account = this.accountFromForm;
                this.skills = this.skillSelection.filter(skill => {
                    return skill.selected;
                }).map(skill => {
                    return skill.id;
                });
            }
        },
        created: function () {
            console.log('created account stats');
        },
    }
</script>