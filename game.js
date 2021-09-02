class Game {
  constructor(score, duration, level, counter) {
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
    this.counter = number + 1
  }
}

module.exports = Game
