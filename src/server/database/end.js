import EndModel from '../models/endModel.js'
import ScoreModel from '../models/scoreModel.js'
import ArcherProfileModel from '../models/archerProfileModel.js'
import mongoose from 'mongoose'
import Handicap from '../database/handicap.js'

export default class End {
  static async createEnd (scoreId, query) {
    try {
      const score = await ScoreModel.findById(scoreId)
      const archerProfile = await ArcherProfileModel.findById(score.archerProfile)

      if (!score) {
        throw new Error('No score found')
      }

      if (score.createdBy !== query.createdBy.toString()) {
        throw new Error('Score does not belong to current user')
      }

      if (score.arrowsRemaining === 0 || score.completed === true) {
        throw new Error('Score has already been completed')
      }

      const arrowValues = query.arrowValues
      const endNumber = score.ends.length + 1
      const endTotal = arrowValues.reduce((acc, curr) => acc + curr.arrowValue, 0)
      const end10s = arrowValues.filter(arrow => arrow.arrowValue === 10).length
      const endXs = arrowValues.filter(arrow => arrow.isX === true).length

      query = {
        ...query,
        endNumber,
        endTotal,
        end10s,
        endXs
      }

      const newEnd = new EndModel(query)
      await newEnd.save()

      score.ends.push(newEnd._id)
      score.finalScore += endTotal
      score.runningTotal += endTotal
      score.scored10s += end10s
      score.scoredXs += endXs
      score.arrowsRemaining -= arrowValues.length

      if (score.arrowsRemaining === 0) {
        score.completed = true
      }
      await score.save()

      if (score.completed === true) {
        await Handicap.handicapCalc(score, archerProfile)
      }

      return newEnd
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async updateEnd (scoreId, endId, userId, update) {
    try {
      const score = await ScoreModel.findById(scoreId)

      if (!score) {
        throw new Error('No score found')
      }

      if (score.createdBy !== userId.toString()) {
        throw new Error('Score does not belong to current user')
      }

      if (score.arrowsRemaining === 0 || score.completed === true) {
        throw new Error('Score has already been completed')
      }

      const currentEnd = await EndModel.findById(endId)

      if (!currentEnd) {
        throw new Error('End not found')
      }

      update.forEach(update => {
        const arrowToUpdate = currentEnd.arrowValues.find(
          arrow => arrow.arrowNumber === update.arrowNumber
        )

        if (arrowToUpdate) {
          arrowToUpdate.arrowValue = update.arrowValue
          arrowToUpdate.isX = update.isX
          score.finalScore = score.finalScore - arrowToUpdate.arrowValue + update.arrowValue
          score.runningTotal = score.runningTotal - arrowToUpdate.arrowValue + update.arrowValue
          if (arrowToUpdate.isX === false && update.isX === true) {
            score.scoredXs++
          } else if (arrowToUpdate.isX === true && update.isX === false) {
            score.scoredXs--
          }
          if (arrowToUpdate.arrowValue === 10 && update.arrowValue !== 10) {
            score.scored10s--
          } else if (arrowToUpdate.arrowValue !== 10 && update.arrowValue === 10) {
            score.scored10s++
          }
        }
      })
      await score.save()

      currentEnd.endTotal = currentEnd.arrowValues.reduce((acc, curr) => acc + curr.arrowValue, 0)
      currentEnd.end10s = currentEnd.arrowValues.filter(arrow => arrow.arrowValue === 10).length
      currentEnd.endXs = currentEnd.arrowValues.filter(arrow => arrow.isX === true).length

      await currentEnd.save()
      return currentEnd
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

// query contains arrowValues array and userId
