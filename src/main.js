// dependencies
import Vue from 'vue';
import App from './components/app.vue';
import VueRouter from 'vue-router';
import IScrollView from 'vue-iscroll-view';
import IScroll from 'iscroll/build/iscroll-probe.js';
import SocialSharing from 'vue-social-sharing';
import vSelect from 'vue-select';
import VueTouch from 'vue-touch';

// views
import main from './views/main.vue';
import products from './views/products.vue';
import owners from './views/owners.vue';
import prices from './views/price.vue';
import principes from './views/principes.vue';
import looking from './views/looking-for.vue';
import events from './views/events.vue';
import shops from './views/shops.vue';
import about from './views/about.vue';
import product_section from './views/product_section.vue';
import product from './views/product.vue';
import event from './views/event.vue';
import fermers from './views/fermers.vue';
import fermer_inside from './views/fermer_inside.vue';


Vue.use(VueRouter)
Vue.use(IScrollView, IScroll)
Vue.use(SocialSharing)
Vue.use(VueTouch)
Vue.component('v-select', vSelect)

const router = new VueRouter({
    routes: [{
            path: '/',
            component: main
        },
        {
            path: '/products',
            component: products
        },
        {
            path: '/products/:id',
            component: product_section
        },
        {
            path: '/products/:id/:el',
            component: product
        },
        {
            path: '/owners',
            component: owners
        },
        {
            path: '/owners/fermers',
            component: fermers
        },
        {
            path: '/owners/fermers/:id',
            component: fermer_inside
        },
        {
            path: '/prices',
            component: prices
        },
        {
            path: '/principes',
            component: principes
        },
        {
            path: '/events',
            component: events
        },
        {
            path: '/events/:el',
            component: event
        },
        {
            path: '/shops',
            component: shops
        },
        {
            path: '/about',
            component: about
        }
    ]
});

const app = new Vue({
    el: '#app',
    router,
    components: {
        App
    }
})