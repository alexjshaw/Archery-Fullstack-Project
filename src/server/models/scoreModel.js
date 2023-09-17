import mongoose from 'mongoose'

const arrowSchema = new mongoose.Schema({
  endNumber: { type: Number, required: true, min: 1 },
  arrowScore: { type: Number, required: true, min: 0, max: 10 },
  isX: { type: Boolean, required: true, default: false },
  arrowNumber: {}
})

const scoreSchema = new mongoose.Schema({
  createdBy: { type: String, required: true },
  totalScore: { type: Number, required: true, default: 0 },
  scored10s: { type: Number, required: true, default: 0 },
  scoredXs: { type: Number, required: true, default: 0 },
  handicap: { type: Number, required: true, default: 150 },
  location: { type: String },
  weather: { type: String },
  notes: { type: String },
  roundType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoundType'
  },
  bowType: {
    type: String,
    required: true,
    enum: ['Compound', 'Recurve', 'Barebow', 'Traditional'],
    message: 'Bow type must be either Compound, Recurve, Barebow, or Traditional'
  },
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment'
  },
  archerProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArcherProfile'
  },
  scoreType: {
    type: String,
    required: true,
    enum: ['Practice', 'League', 'Head to Head', 'Competition'],
    message: 'Round type must be either Practice, League, Head to Head or Competition'
  },
  completed: { type: Boolean, required: true, default: false },
  visible: { type: Boolean, required: true, default: true },
  arrowValues: [arrowSchema]
},
{ timestamps: true })

scoreSchema.pre('save', function (next) {
  // Calculate totalScore
  this.totalScore = this.arrowValues.reduce((acc, arrow) => acc + arrow.arrowScore, 0)

  // Calculate scored10s
  this.scored10s = this.arrowValues.filter(arrow => arrow.arrowScore === 10).length

  // Calculate scoredXs
  this.scoredXs = this.arrowValues.filter(arrow => arrow.isX).length

  next()
})

scoreSchema.pre('findOneAndUpdate', function (next) {
  const arrowValues = this.getUpdate().arrowValues

  if (arrowValues) {
    // Calculate totalScore
    this.getUpdate().totalScore = arrowValues.reduce((acc, arrow) => acc + arrow.arrowScore, 0)

    // Calculate scored10s
    this.getUpdate().scored10s = arrowValues.filter(arrow => arrow.arrowScore === 10).length

    // Calculate scoredXs
    this.getUpdate().scoredXs = arrowValues.filter(arrow => arrow.isX).length
  }

  next()
})

export default mongoose.model('Score', scoreSchema)
