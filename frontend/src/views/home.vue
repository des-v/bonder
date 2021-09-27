<script>
import axios from 'axios'
import UserCard from '@/components/user-card.vue'

export default {
  name: 'Home',
  components: {
    UserCard,
  },
  data() {
    return {
      users: [],
      time: new Date(),
    }
  },
  async created() {
    const usersRequest = await axios.get('/api/users')

    this.users = usersRequest.data
  },
}
</script>

<template lang="pug">
  .home
    h1 Bonder
    p The time is now: {{ time }}
    user-card(v-for="user in users" :user="user" v-bind:key="user.username")
</template>
