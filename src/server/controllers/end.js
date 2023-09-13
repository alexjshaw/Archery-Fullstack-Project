import mongoose from 'mongoose'
import End from '../database/end.js'
import { sendDataResponse, sendErrorResponse } from '../utils/responses.js'
import { filterAllowedUpdates } from '../utils/filterAllowedupdates.js'

export const createEnd = async (req, res) => {
  try {
    const allowedUpdates = ['arrowValues']
    const query = filterAllowedUpdates(req.body, allowedUpdates)
    const userId = req.mongo_id
    const scoreId = req.params.id
    query.createdBy = userId

    const result = await End.createEnd(scoreId, query)
    return sendDataResponse(res, 200, result)
  } catch (error) {
    return sendErrorResponse(res, 400, error.message)
  }
}

export const updateEnd = async (req, res) => {
  try {
    const allowedUpdates = ['arrowValues']
    const arrowValues = filterAllowedUpdates(req.body, allowedUpdates)
    const update = arrowValues.arrowValues
    const scoreId = req.params.scoreId
    const endId = req.params.endId
    const userId = req.mongo_id

    const result = await End.updateEnd(scoreId, endId, userId, update)
    return sendDataResponse(res, 200, result)
  } catch (error) {
    return sendErrorResponse(res, 400, error.message)
  }
}
