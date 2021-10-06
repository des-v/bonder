const express = require('express')

const passport = require('passport')

const User = require('../models/person')

const router = express.Router()

router.get('/session', (req, res) => {
    res.send(req.user)
})

// eslint-disable-next-line no-unused-vars
router.post('/', async (req, res, next) => {
    const { username, firstName, lastName, email, password } = req.body

    try {
        const user = await User.register({ username, firstName, lastName, email }, password)
        res.send(user)
    } catch (error) {
        next(error)
    }
})

router.post('/session',
    passport.authenticate('local', { failWithError: true }),
    async (req, res) => {
        res.send(req.user)
    }
)

router.delete('/session', async (req, res, next) => {
    await req.logout()

    req.session.regenerate(error => {
        if (error) return next(error)

        return res.sendStatus(200)
    })
})


module.exports = router