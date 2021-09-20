const express = require('express')

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Bonder' })
})

// router.get('/test', (req, res) => {
//   console.log('we have a request')
//   res.send('hello')
// })

// router.post('/users', async function (req, res) => {
//   const { fisrtName, lastName, email } = req.body

//   const user = await User.create({
//     fisrtName,
//     lastName,
//     email,
//   })
//   res.send(user)
// })

// router.get('/users', async function (req, res) {
//   const users = await User.findById({})

//   res.send(users)
// })

// router.get('/users/:id', async function (req, res) {
//   const user = await User.findById(res.params.id)

//   if (!user) {return res.sendStatus(404)}

//   res.send(user)
// })

module.exports = router
