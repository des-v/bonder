<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions(['logout']),
    async doLogout() {
      await this.logout()
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapState(["user"])
  }
}
</script>

<template lang="pug">
  #app
    #nav
      router-link(to="/*") Home
      router-link(to="/profile" v-if="user") Profile
      router-link(to="/login" v-if="!user") Login
      router-link(to="/register" v-if="!user") Register
      a(@click="doLogout" href="#" v-if="user") Logout
    router-view
</template>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;
      padding: 30px;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
