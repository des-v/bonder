const colors = require('colors')

class Person {
  constructor(firstName, lastName, birthDate, pronouns, email) {
    this.firstName = firstName
    this.lastName = lastName
    this.pronouns = pronouns
    this.birthDate = birthDate
    this.email = email
    this.bio = ''
    this.photos = []
    this.likes = []
    this.sports = []
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  get profile() {
    return `
        # ${this.fullName.brightRed.bold} 
        ## Pronouns: ${this.pronouns}
        ## Bio: ${this.bio.italic}

        ## ${'Photos:'.white.bold} (${this.photos.length})

        ${this.photos
          .map(
            photo => `### ${photo.filename.rainbow}
            💗  ${photo.likedBy.map(person => person.fullName.italic).join(', ')}`
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

module.exports = Person
