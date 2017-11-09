<template>
    <main-layout>
        <p>About stuff...</p>
    </main-layout>
</template>

<script>
    import MainLayout from '../layouts/Main.vue'

    export default {
        components: {
            MainLayout
        },
        created: function () {
            console.log('created about');
        },
    }
</script>