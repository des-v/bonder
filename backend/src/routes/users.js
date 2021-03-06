const express = require('express')

const router = express.Router()

const User = require('../models/person')
const Photo = require('../models/photo')

/* GET users listing. */
router.get('/', async (req, res) => {
  const query = {}

  if (req.query.firstName) {
    query.firstName = req.query.firstName
  }

  if (req.query.lastName) {
    query.lastName = req.query.lastName
  }

  res.send(await User.find(query))
})

/* POST create a user */
router.post('/', async (req, res) => {
  const userToCreate = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  }
  const createdUser = await User.create(userToCreate)
  res.send(createdUser)
})

router.get('/initialize', async (req, res) => {
  const jane = new User({
    username: `IamSoUnique${Math.random()}`,
    firstName: 'Jane',
    lastName: 'Doe',
    email: `janedoe${Math.random()}@example.com`,
  })
  await jane.setPassword('test')
  await jane.save()

  const john = new User({
    username: `IamAlsoUnique${Math.random()}`,
    firstName: 'John',
    lastName: 'Smith',
    email: `johnsmith${Math.random()}@example.com`,
  })

    await john.setPassword('test')
    await john.save()

  const berlinPhoto = await Photo.create({ filename: 'berlin.jpg' })
  const munichPhoto = await Photo.create({ filename: 'munich.jpg' })

  await john.addPhoto(berlinPhoto)
  await john.addPhoto(munichPhoto)
  john.bio = 'Photographer, landscape specialist'

  await jane.likePhoto(berlinPhoto)

  await berlinPhoto.save()
  await munichPhoto.save()
  ;[jane, john].forEach(user => user.save())

  console.log(jane.fullName)
  console.log(jane.profile)

  console.log(john.fullName)
  console.log(john.profile)
  res.sendStatus(200)
})

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)

  if (user) res.send(user)
  else res.sendStatus(404)
})

module.exports = router
