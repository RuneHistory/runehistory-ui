<template>
    <main-layout>
        <p>Page not found</p>
    </main-layout>
</template>

<script>
    import MainLayout from '../layouts/Main.vue'
    export default {
        components: {
            MainLayout
        },
        created: function () {
            console.log('created 404');
        },
    }
</script>