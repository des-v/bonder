require('colors')

const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const personSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  pronouns: String,
  birthDate: String,
  email: String,
  bio: String,
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
      autopopulate: true,
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
    },
  ],
  sports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sport',
    },
  ],
})

class Person {
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  get profile() {
    return `
        # ${this.fullName.brightRed.bold} 
        ## Pronouns: ${this.pronouns}
        ## Bio: ${this.bio}

        ## ${'Photos:'.white.bold} (${this.photos.length})

        ${this.photos
          .map(
            photo => `### ${photo.filename.rainbow}
            💗  ${photo.likedBy.map(person => person.fullName).join(', ')}`
          )
          .join('\n\t')}

        `
  }

  set profile(newValue) {
    throw new Error(`profile is only a getter. You can't override it.`)
  }

  greet(person) {
    console.log(`Hello ${person.firstName}, this is ${this.firstName}`)
  }

  addPhoto(photo) {
    this.photos.push(photo)
  }

  likePhoto(photo) {
    this.likes.push(photo)
    photo.likedBy.push(this)
  }

  addSport(sport) {
    this.sports.push(sport)
    sport.practiceBy.push(this)
  }

  playGame(sport) {
    sport.playedBy.push(this)
  }
}

personSchema.loadClass(Person)
personSchema.plugin(autopopulate)

personSchema.index({ username: 1 }, { name: 'unique_index_username', unique: true })

module.exports = mongoose.model('Person', personSchema)
