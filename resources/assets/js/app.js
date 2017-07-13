
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import VueRouter from 'vue-router'
import { routes } from './router/routes'

const router = new VueRouter({
    mode: "history",
    scrollBehavior: function(to, from, savedPosition) {
        if (to.hash) {
            return {selector: to.hash}
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes
})

Vue.component('app', require('./components/app.vue'));

Vue.use(VueRouter)

Vue.filter('date', (value) => {
    let date = new Date(value)
    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }
    return "le " + date.toLocaleString("fr-FR", options)
})

swal.setDefaults({
    allowOutsideClick: false,
    timer: 1500,
    buttonsStyling: false,
    confirmButtonClass: "btn btn-warning",
    cancelButtonClass: "btn btn-default",
    focusCancel: true
})

const app = new Vue({
    el: '#app',
    router
});
