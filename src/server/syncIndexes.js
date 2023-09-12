// RUN WITH NODE ./src/server/syncIndexes.js

import mongoose from 'mongoose'
import UserModel from './models/userModel.js' // Replace with the actual path to your User model
import ArcherProfileModel from './models/archerProfileModel.js' // Replace with the actual path to your ArcherProfile model
import EquipmentModel from './models/equipmentModel.js' // Replace with the actual path to your Equipment model

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ArcheryScorecard', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

// Sync indexes
const syncAllIndexes = async () => {
  try {
    await UserModel.syncIndexes()
    console.log('User indexes have been synchronized')

    await ArcherProfileModel.syncIndexes()
    console.log('ArcherProfile indexes have been synchronized')

    await EquipmentModel.syncIndexes()
    console.log('Equipment indexes have been synchronized')
  } catch (error) {
    console.error('Error synchronizing indexes:', error)
  } finally {
    mongoose.connection.close()
  }
}

syncAllIndexes()
