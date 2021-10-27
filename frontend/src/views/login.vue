<script>
import { mapActions } from 'vuex'

export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: '',
            backendError: null
        }
    },
    methods: {
        ...mapActions(['login']),
        async submitLogin(event) {
            event.preventDefault()

            try {
                await this.login({
                    email: this.email,
                    password: this.password
                })

                this.$router.push('/profile')
            } catch (error) {
                this.backendError = error.response.data.message
            }
        }
    }
}
</script>

<template lang="pug">
.login
    form(@submit="submitLogin")
        h1 Log in to your account
        label(for="email") Email:&nbsp;
            input(v-model="email" id="email" type="email" placeholder="Your email" autocomplete='email' required)
        label(for="current-password") Password:&nbsp;
            input(v-model="password" id="current-password" type="password" placeholder="Your password" autocomplete="current-password" required)
        input(type="submit" value="Log in")
    div(v-if="backendError") {{ backendError }}
    div Don't have an account yet? <router-link to="/register">Register</router-link>
</template>

<style lang="scss" scoped>
    .login {
        padding: 3rem;
        background-color: aquamarine;
        border: 1px;
    }
    h1 {
        color: rgb(19, 69, 110);
    }
    label {
        display: block;
        margin: 1rem 0;
    }
</style>