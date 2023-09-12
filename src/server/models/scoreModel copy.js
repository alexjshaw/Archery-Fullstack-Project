import mongoose from 'mongoose'

const scoreSchema = new mongoose.Schema({
  createdBy: { type: String, required: true },
  finalScore: { type: Number, required: true, default: 0 },
  runningTotal: { type: Number, required: true, default: 0 },
  scored10s: { type: Number, required: true, default: 0 },
  scoredXs: { type: Number, required: true, default: 0 },
  handicap: { type: Number, required: true, default: 150 },
  location: { type: String },
  weather: { type: String },
  notes: { type: String },
  bowType: {
    type: String,
    required: true,
    enum: ['Compound', 'Recurve', 'Barebow', 'Traditional'],
    message: 'Bow type must be either Compound, Recurve, Barebow, or Traditional'
  },
  arrowsRemaining: { type: Number, required: true },
  completed: { type: Boolean, required: true, default: false },
  visible: { type: Boolean, required: true, default: true },
  archerProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArcherProfile'
  },
  scoreType: {
    type: String,
    required: true,
    enum: ['Practice', 'League', 'Head-to-Head', 'Competition'],
    message: 'Round type must be either Practice, League or Head-to-Head'
  },
  ends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'End' }],
  roundType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoundType'
  },
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment'
  }
},
{ timestamps: true })

export default mongoose.model('Score', scoreSchema)
