import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
        {
            path: "/",
            name: "Index",
            component: () =>
                import(/* webpackChunkName: "about" */ "../Pages/Index.vue"),
            // beforeEnter: async (to, from, next) => {}
        },

        {
            path: '/404',
            name: '404',
            // component:  () =>
            //     import("../AuthPages/NotFound.vue")
        },
        {
          path: '*',
          redirect: {name: '404'}
        }
    ]
});