import mongoose from 'mongoose'

const handicapSchema = new mongoose.Schema({
  Handicap: {
    type: Number,
    required: true
  },
  roundTypes: {
    type: Map,
    of: Number,
    required: true
  }
})

export default mongoose.model('Handicap', handicapSchema)
