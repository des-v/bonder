const Person = require('./models/person')
// const Sport = require('./sport')
// const Game = require('./game')
const Photo = require('./models/photo')

const jane = new Person('Jane', 'Doe', 'janedoe@example.com')
const john = new Person('John', 'Smith', 'johnsmith@example.com')

const berlinPhoto = new Photo('berlin.jpg')
const munichPhoto = new Photo('munich.jpg')

john.addPhoto(berlinPhoto)
john.addPhoto(munichPhoto)
john.bio = 'Photographer, landscape specialist'

jane.likePhoto(berlinPhoto)

console.log(jane.fullName)
console.log(jane.profile)

console.log(john.fullName)
console.log(john.profile)
