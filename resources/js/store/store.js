import Vuex from 'vuex'
import module from "./module";

export default new Vuex.Store({
    modules: {
      module
    },
    namespaced: true
})
