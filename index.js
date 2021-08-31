class Person {
	constructor(firstName, lastName, email) {
		this.firstName = firstName
		this.lastName = lastName
		this.age = age // birth date or year better
		this.pronouns = pronouns
		this.email = email
		this.photos = []
		this.likes = []
		this.sports = []
	}

	fullName(person) {
		console.log(`${this.firstName} ${this.lastName}`)
		return `${this.firstName} ${this.lastName}`
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

class Sport {
	constructor() {
		this.category = category
		this.type = type
		this.practiceBy = []
	}
}

class Game {
	constructor() {
		this.score = score
		this.duration = duration
		this.level = level
		this.counter = counter
		this.playedBy = []
	}

	setCounter(number) {
		this.counter = number
	}

	updateCounter(number) {
		this.counter = ++number
	}
}

// Leave parasports for later
// class Impairment {
// 	constructor() {}
// }

const jane = new Person('Jane', 'Doe', 'janedoe@example.com')
const john = new Person('John', 'Smith', 'johnsmith@example.com')

jane.fullName()
