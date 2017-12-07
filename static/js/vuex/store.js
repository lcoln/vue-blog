/**
 * []
 * @authors Lincoln (875482941@qq.com)
 * @date    2017-04-07 21:39:45
 *
 */

"use strict"

import vuex from 'vuex'
import vue from 'vue'

vue.use(vuex)

const store = new vuex.Store({
    state: {
        user: {},
        reg: {
            email: /^[\w\.\-]+@\w+([\.\-]\w+)*\.\w+$/,
            passwd: /^[a-zA-Z0-9]{6,18}$/
        }
    },
    mutations: {

    },
    getters: {

    },
    actions: {

    }
})

export default store