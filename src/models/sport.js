const mongoose = require('mongoose')

const sportSchema = new mongoose.Schema({
  category: String,
  type: String,
  practicedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
    },
  ],
})

module.exports = mongoose.Schema('Sport', sportSchema)

// class Sport {
//   constructor(category, type) {
//     this.category = category
//     this.type = type
//     this.practicedBy = []
//   }
// }

// module.exports = Sport
