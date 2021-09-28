import Vue from 'vue'
import Router from 'vue-router'
// import NotFound from '../pages'


const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

Vue.use(Router)

export default new Router({
    mode: 'history',
    // eslint-disable-next-line no-unused-vars
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    // routes: [
    //     {
    //         path: '/portfolios/activation/:uid/:token',
    //         name:'portfolios-activation',
    //         component: () => import('./views/Portfolios.vue'),
    //     },
    //     {
    //         path: '/portfolios/reset_password/:uid/:token',
    //         name:'portfolios-reset-password',
    //         component: () => import('./views/Portfolios.vue'),
    //     },
    //     {
    //         path: '/portfolios/settings/coin/:id',
    //         name:'portfolios-position-settings',
    //         component: () => import('./views/Settings.vue'),
    //     },
    //     {
    //         path: '/portfolios/settings/group/:id',
    //         name:'portfolios-group-settings',
    //         component: () => import('./views/Settings.vue'),
    //     },
    //     {
    //         path: '/portfolios',
    //         name:'portfolios',
    //         component: () => import('./views/Portfolios.vue'),
    //     },
    //     {
    //         path: '/notifications',
    //         name:'notifications',
    //         component: () => import('./views/Notifications.vue'),
    //     },
        // {
        //     path: '*',
        //     redirect: '/portfolios'
        // }
    // ],
})
