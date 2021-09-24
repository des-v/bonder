const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const photoSchema = new mongoose.Schema({
  filename: String,
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
      autopopulate: true,
    },
  ],
})

photoSchema.plugin(autopopulate)

module.exports = mongoose.model('Photo', photoSchema)
// class Photo {
//   constructor(filename) {
//     this.filename = filename
//     this.likedBy = []
//   }
// }

// module.exports = Photo
