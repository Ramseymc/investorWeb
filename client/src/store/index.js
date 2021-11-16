import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {},
  actions: {},
  modules: {},
  url: "",
  state: {
    development: {
      id: null,
      developmentName: null,
    },
    // gridWidth: true
  },
});

// export default new Vuex.Store({

//   state: {
//     url: null,
//     development: {
//       id: null,
//       developmentName: null
//     }
//     // gridWidth: true
//   }
// })
