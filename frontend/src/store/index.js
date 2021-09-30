import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const mutations = {
  INCREMENT_COUNT: 'increment count',
  // SET_COUNT: 'set count',
}

export default new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    [mutations.INCREMENT_COUNT](state) {
      state.count++
    },
    // [mutations.SET_COUNT](state) {
    //   state.count = count
    // },
  },
  actions: {
    incrementCount({ commit }) {
      commit(mutations.INCREMENT_COUNT)
    },
    // async incrementCount({ commit }) {
    //   const req = await axios.post(`/api/views`)
    //   commit(mutations.SET_COUNT, req.data)
    // },
    async fetchUser(store, id) {
      const userRequest = await axios.get(`/api/users/${id}`)
      return userRequest.data
    },
    async fetchUsers() {
      const userRequest = await axios.get(`/api/users`)
      return userRequest.data
    },
  },
  modules: {},
})
