<template>
    <b-container fluid>
        <ul>
            <li>
                <router-link :to="{ name: 'home' }">Home</router-link>
                <router-link :to="{ name: 'account' }">Account</router-link>
                <router-link :to="{ name: 'about' }">About</router-link>
            </li>
        </ul>

        <slot></slot>
    </b-container>
</template>
