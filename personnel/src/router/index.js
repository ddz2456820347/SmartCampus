import VueRouter from "vue-router";

import index from "../components/main/index"

import logon from "../components/logon/logon"

import home from "../components/main/home"

import commodity from "../components/main/commodity"

import consumer from "../components/main/consumer"

import RestOne from "../components/main/rest/RestOne"

import RestTwo from "../components/main/rest/RestTwo"




const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            redirect: "/logon"
        },
        {
            name: "logon",
            path: "/logon",
            component: logon
        },

        {
            name: "index",
            path: "/index",
            component: index,
            meta: { isauto: true },
            redirect: "/index/home",

            children: [
                {
                    name: "home",
                    path: "/index/home",
                    component: home,
                    meta: { isauto: true },


                },
                {
                    name: "commodity",
                    path: "/index/commodity",
                    component: commodity,
                    meta: { isauto: true },
                },
                {
                    name: "consumer",
                    path: "/index/consumer",
                    component: consumer,
                    meta: { isauto: true },
                },
                {
                    name: "RestOne",
                    path: "/index/rest/RestOne",
                    component: RestOne,
                    meta: { isauto: true },
                },
                {
                    name: "RestTwo",
                    path: "/index/rest/RestTwo",
                    component: RestTwo,
                    meta: { isauto: true },
                }
            ]
        },
    ]


})




router.beforeEach((to, from, next) => {

    if (to.meta.isauto) {
        let user = sessionStorage.getItem("hint")
        if (user == 1) {
            next()
        } else {
            next("/logon")
        }
    } else {
        next()
    }
})



export default router;