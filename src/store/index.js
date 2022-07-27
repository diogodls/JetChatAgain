import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: '',
    },
    mutations: {
        changeUser(state, payload){
            state.user = payload
        },
    }
})