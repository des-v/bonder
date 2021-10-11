import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.defaults.withCredentials = true

Vue.use(Vuex)

const mutations = {
  INCREMENT_COUNT: 'increment count',
  SET_USER: 'set user',
}

const store = new Vuex.Store({
  state: {
    count: 0,
    user: null,
  },
  mutations: {
    [mutations.INCREMENT_COUNT](state) {
      state.count++
    },
    [mutations.SET_USER](state, user) {
      state.user = user
    },
  },
  actions: {
    incrementCount({ commit }) {
      commit(mutations.INCREMENT_COUNT)
    },
    async fetchUser(store, id) {
      const userResponse = await axios.get(`/api/users/${id}`)
      return userResponse.data
    },
    async fetchUsers() {
      const userResponse = await axios.get(`/api/users`)
      return userResponse.data
    },
    async fetchSession({ commit }) {
      const userResponse = await axios.get(`/api/account/session`)
      commit(mutations.SET_USER, userResponse.data || null)
    },
    async login({ commit }, credentials) {
      const userResponse = await axios.post('/api/account/session', credentials)
      commit(mutations.SET_USER, userResponse.data || null)
    },
    async register(store, user) {
      return axios.post('/api/account', user)
    },
    async logout({ commit }) {
      await axios.delete('/api/account/session')
      commit(mutations.SET_USER, null)
    },
  },
  modules: {},
})

export default async function init() {
  await store.dispatch('fetchSession')
  return store
}