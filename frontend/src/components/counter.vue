<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Counter',
  mounted() {
    this.incrementCount()
  },
  methods: {
    ...mapActions(['incrementCount']),
  },
  computed: {
    ...mapState(['count']),
  },
}
</script>

<template lang="pug">
    div 
        p Pages I've visited: {{ count }}
</template>

<style lang="scss" scoped>
  p {
    font-size: 0.8em;
    color: rgb(80, 80, 80);
    padding-top: 1rem;
  }
</style>
