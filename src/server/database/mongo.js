import mongoose from 'mongoose'
import userModel from '../models/userModel.js'
import archerProfileModel from '../models/archerProfileModel.js'
import equipmentModel from '../models/equipmentModel.js'
import endModel from '../models/endModel.js'
import handicapModel from '../models/handicapModel.js'
import roundTypeModel from '../models/roundTypeModel.js'
import scoreModel from '../models/scoreModel.js'
import sightmarkModel from '../models/sightmarkModel.js'


const mongoDBURL = 'mongodb://127.0.0.1:27017/ArcheryScorecard'

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to local MongoDB instance')

    await userModel.init()
    await archerProfileModel.init()
    await equipmentModel.init()
    await endModel.init()
    await handicapModel.init()
    await roundTypeModel.init()
    await scoreModel.init()
    await sightmarkModel.init()

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('Mongoose disconnected on app termination')
        process.exit(0)
      })
    })
  } catch (err) {
    console.log('Connection Failed')
    console.error(err)
    process.exit(1) // Exit with failure code
  }
}

connectDB()

export {}
