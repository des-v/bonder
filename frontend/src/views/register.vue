<script>
import { mapActions } from 'vuex'

export default {
    name: 'register',
    data() {
        return {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',

            backendError: null
        }
    },
    methods: {
        ...mapActions(['register']),
        async submitLogin(event) {
            event.preventDefault()

            try {
                await this.register({
                    username: this.username,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password
                })

                this.$router.push('/login')
            } catch (error) {
                this.backendError = error.response.data.message
            }
        }
    }
}
</script>

<template lang="pug">
    .register
        form( @submit="submitLogin")
            h1 Create a new account
            label(for="username") Username:&nbsp;
                input(v-model="username" id="username" type="text" placeholder="Your username" autocomplete='username' required)
            label(for="first-name") First Name:&nbsp;
                input(v-model="firstName" id="first-name" type="text" placeholder="Your first name" required)
            label(for="last-name") Last Name:&nbsp;
                input(v-model="lastName" id="last-name" type="text" placeholder="Your last name" required)
            label(for="email") Email:&nbsp;
                input(v-model="email" id="email" type="email" placeholder="Your email" required)
            label(for="new-password") Password:&nbsp;
                input(v-model="password" id="new-password" type="password" placeholder="Your password" autocomplete="new-password" required)
            input(type="submit" value="Register")
        div(v-if="backendError") {{ backendError }}
        div Already have an account? <router-link to="/login">Log in</router-link>
</template>

<style lang="scss" scoped>
    .register {
        padding: 3rem;
        background-color: rgb(87, 166, 197);
    }
    label {
        display: block;
        margin: 1rem 0;
    }
</style>