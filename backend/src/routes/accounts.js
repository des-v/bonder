const express = require('express')

const passport = require('passport')

const User = require('../models/person')

const router = express.Router()

router.get('/session', (req, res) => {
    res.send(req.session)
})

// eslint-disable-next-line no-unused-vars
router.post('/', async (req, res) => {
    const { username, firstName, lastName, email, password } = req.body

    const user = new User({ username, firstName, lastName, email })
    await user.setPassword(password)
    await user.save()

    return user
})

router.post('/session',
    passport.authenticate('local', { failWithError: true }),
    async (req, res) => {
        res.send(req.user)
    }
)

router.delete('/session', (req, res) => {
    req.logout()
    res.send(true)
})

module.exports = router