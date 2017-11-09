<template>
    <main-layout>
        <p>Welcome home</p>
    </main-layout>
</template>

<script>
    import MainLayout from '../layouts/Main.vue'

    export default {
        components: {
            MainLayout
        },
        created: function () {
            console.log('created home');
        },
    }
</script>