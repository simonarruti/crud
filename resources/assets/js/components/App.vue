<template>
    <div>
        <navbar></navbar>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import Navbar from './Navbar.vue'

    export default {
        components: { Navbar }
    }
</script>

<style>
    .fade-enter-active {
        transition: opacity .6s
    }
    .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
        opacity: 0
    }
</style>