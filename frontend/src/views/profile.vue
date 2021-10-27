<script>
import UserCard from '@/components/user-card.vue'
import Counter from '@/components/counter.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Profile',
  components: { UserCard, Counter },
  data() {
    return {
      users: [],
      time: new Date(),
      message: '',
    }
  },
  async created() {
    this.users = await this.fetchUsers()
  },
  methods: {
    ...mapActions(['fetchUsers', 'goLive', 'sendMessageToLiveStream', 'joinStream']),
    sendMessage(event) {
        event.preventDefault()
        this.sendMessageToLiveStream(this.message)
        this.message = ''
    }
  },
  computed: {
    ...mapState(['currentLiveStream', 'liveStreams', 'user', 'liveStreamMessages'])
  }
}
</script>

<template lang="pug">
  .home
    h1 Bonder
    p The time is now: {{ time }}
    UserCard(:user="user" v-if="user")
    Counter
    div(v-if="liveStreams.length")
        h2 Live streams
        div(v-for="stream in liveStreams")
          p {{ stream }}
          button(@click="joinStream(stream)") Join stream
    button(@click="goLive") Go live!
    div(v-if="currentLiveStream")
        h3 Live stream
        .messages
            .message(v-for="message in liveStreamMessages")
                p
                    span {{ message.author }}:&nbsp;
                    span {{ message.body }}
        form(@submit="sendMessage")
            input(type="text" v-model="message")
            input(type="submit" value="Send message")
</template>

<style lang="scss" scoped>
  .home {
    background-color: rgb(180, 180, 180);
    padding: 1rem;
    p {
      font-size: 0.8rem;
      margin: 0.5rem;
    }
    a {
        font-weight: bold;
        color: #2c3e50;
        padding: 1rem;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
    button {
        margin: 1rem;
        padding: 0.8rem;
    }
    h2 {
        padding: 1rem;
    }
    .messages { 
        p {
            font-size: 1rem;
        }
    }
    form {
        margin: 0.5rem;
    }
  }
</style>