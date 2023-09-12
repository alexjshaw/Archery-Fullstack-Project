import ScoreModel from '../models/scoreModel.js'
import ArcherProfileModel from '../models/archerProfileModel.js'
import EquipmentModel from '../models/equipmentModel.js'
import RoundTypeModel from '../models/roundTypeModel.js'
import mongoose from 'mongoose'

export default class Score {
  static async validateOwnership (userId, archerProfileId, equipmentId) {
    try {
      const archerProfile = await ArcherProfileModel.findById(archerProfileId).select('user')
      const equipment = await EquipmentModel.findById(equipmentId).select('user')

      if (!archerProfile || !equipment) {
        return false
      }

      return archerProfile.user.toString() === userId.toString() && equipment.user.toString() === userId.toString()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async createScore (userId, query = {}) {
    try {
      const roundType = await RoundTypeModel.findById(query.roundType)
      const equipment = await EquipmentModel.findById(query.equipment)
      const archerProfile = await ArcherProfileModel.findById(query.archerProfile)

      if (!roundType) {
        throw new Error('Invalid round selected')
      }

      const arrowsRemaining = roundType.totalDozens * 12

      query.arrowsRemaining = arrowsRemaining

      const newScore = new ScoreModel(query)
      await newScore.save()
      roundType.scores.push(newScore._id)
      equipment.scores.push(newScore._id)
      archerProfile.scoreData.scores.push(newScore._id)
      await roundType.save()
      await equipment.save()
      await archerProfile.save()
      return newScore
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async updateScore (userId, scoreId, update) {
    try {
      const updatedScore = await ScoreModel.findOneAndUpdate(
        { _id: scoreId },
        { $set: update },
        { new: true }
      )

      if (update.equipment) {
        const equipment = await EquipmentModel.findById(update.equipment).select('user')

        if (equipment.user.toString() !== userId.toString()) {
          throw new Error('Equipment does not belong to current user')
        }
      }

      if (!updatedScore) {
        throw new Error('No score found')
      }

      if (updatedScore.createdBy !== userId) {
        throw new Error('User may only update their own scores')
      }

      return updatedScore
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async deleteScore (userId, scoreId) {
    try {
      const result = await ScoreModel.findByIdAndUpdate({
        _id: scoreId,
        createdBy: userId
      },
      { $set: { visible: false } })
      return result
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async findMany (query = {}) {
    try {
      const scores = await ScoreModel.find(query)
      return scores
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
