const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  playedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
    },
  ],
})

module.exports = mongoose.Schema('Game', gameSchema)
// class Game {
//   constructor(sport, score, duration, level, counter) {
//     this.sport = sport
//     this.score = score
//     this.duration = duration
//     this.level = level
//     this.counter = counter
//     this.playedBy = []
//   }

//   setCounter(number) {
//     this.counter = number
//   }

//   updateCounter(number) {
//     this.counter = number + 1
//   }
// }

// module.exports = Game
