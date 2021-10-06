<script>
import Counter from '@/components/counter.vue'
import { mapActions } from 'vuex'

export default {
  name: 'UserList',
  components: { Counter },
  data() {
    return {
      users: [],
      time: new Date(),
    }
  },
  async created() {
    this.users = await this.fetchUsers()
  },
  methods: {
    ...mapActions(['fetchUsers']),
  },
}
</script>

<template lang="pug">
  .home
    h1 Bonder
    p The time is now: {{ time }}
    h2 Users
    div(v-for="user in users")
      router-link(:to="`/users/${user._id}`") {{ user.firstName }}
    Counter
</template>

<style lang="scss" scoped>
  .home {
    background-color: rgb(180, 180, 180);
    padding: 1rem;
    p {
      font-size: 0.8rem;
    }
  }
  a {
      font-weight: bold;
      color: #2c3e50;
      padding: 1rem;

      &.router-link-exact-active {
        color: #42b983;
    }
  }
</style>