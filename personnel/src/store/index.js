import Vue from "vue"

import Vuex from "vuex"

import axios from "axios"

// 使用vuex插件
Vue.use(Vuex)
//准备actions用于响应组件中的动作  dispatch
const actions = {
    post(context) {
        axios.post("http://localhost:8080/code").then(
            res => {
                // console.log("请求成功了", res.data)
                context.state.datalist = []
                context.state.datalist.push(...res.data)
            },
            err => {
                console.log("请求失败", err.message)
            }
        )
    },

}
//准备mutations用于操作数据  commit
const mutations = {
    color(state, value) {
        state.colors = value
    },

}
//准备state用于存储数据
const state = {
    datalist: [],
    demo: [],
    hint: 0,
    colors: "",
}



export default new Vuex.Store({
    actions,
    mutations,
    state
})