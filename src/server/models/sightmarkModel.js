import mongoose from 'mongoose'

const sightmarkSchema = new mongoose.Schema({
  createdBy: { type: String, required: true },
  distance: { type: Number, required: true },
  distanceType: {
    type: String,
    required: true,
    enum: ['Yards', 'Metres'],
    message: 'Distance must be in yards or metres'
  },
  sightPosition: { type: Number, required: true },
  notes: { type: String },
  equipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true }
},
{ timestamps: true })

export default mongoose.model('Sightmark', sightmarkSchema)
