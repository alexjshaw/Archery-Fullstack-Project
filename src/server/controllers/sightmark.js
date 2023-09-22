import mongoose from 'mongoose'
import Sightmark from '../database/sightmark.js'
import { sendDataResponse, sendErrorResponse } from '../utils/responses.js'

export const createSightmark = async (req, res) => {
  try {
    const { distance, distanceType, sightPosition, notes, equipmentId } = req.body
    const query = {
      createdBy: req.mongo_id,
      distance,
      distanceType,
      sightPosition,
      notes,
      equipment: new mongoose.Types.ObjectId(req.body.equipmentId)
    }
    const result = await Sightmark.createSightmark(equipmentId, query)
    return sendDataResponse(res, 200, result)
  } catch (error) {
    return sendErrorResponse(res, 400, error.message)
  }
}

export const updateSightmark = async (req, res) => {
  try {
    const userId = req.mongo_id
    const sightmarkId = req.params.id
    const update = {
      distance: req.body.distance,
      distanceType: req.body.distanceType,
      sightPosition: req.body.sightPosition,
      notes: req.body.notes
    }
    const result = await Sightmark.updateSightmark(sightmarkId, userId, update)
    return sendDataResponse(res, 200, result)
  } catch (error) {
    return sendErrorResponse(res, 400, error.message)
  }
}

export const getSightmarks = async (req, res) => {
  try {
    const query = {}
    if (req.body.equipment) query.equipment = req.body.equipment
    if (req.body.distance) query.distance = req.body.distance
    if (req.body.distanceType) query.distanceType = req.body.distanceType
    const result = await Sightmark.getSightmarks(query)
    return sendDataResponse(res, 200, result)
  } catch (error) {
    return sendErrorResponse(res, 400, error.message)
  }
}

export const getEquipmentSightmarks = async (req, res) => {
  try {
    const query = { equipment: req.params.id }
    const result = await Sightmark.getSightmarks(query)
    return sendDataResponse(res, 200, result)
  } catch (error) {
    return sendErrorResponse(res, 400, error.message)
  }
}

export const deleteSightmark = async (req, res) => {
  try {
    const sightmarkId = req.params.id
    const userId = req.mongo_id
    const result = await Sightmark.deleteSightmark(sightmarkId, userId)
    return sendDataResponse(res, 200, result)
  } catch (error) {
    return sendErrorResponse(res, 400, error.message)
  }
}

// export const getSightmarks = async (req, res) => {
//   try {
//     const equipmentId = req.params.id
//     const userId = req.mongo_id
//     const { distance, distanceType } = req.body

//     const sightmarks = await Equipment.findSightmarks(userId, equipmentId, distance, distanceType)
//     return sendDataResponse(res, 200, sightmarks)
//   } catch (error) {
//     return sendErrorResponse(res, 400, error.message)
//   }
// }

// export const updateSightmark = async (req, res) => {
//   const equipmentId = req.params.id
//   const userId = req.mongo_id
//   const {sightmarkId, distance, distanceType, sightPosition, notes} = req.body
//   const update = { 'sightmark.distance': distance, 'sightmark.distanceType': distanceType, 'sightmark.sightPosition': sightPosition, 'sightmark.notes': notes}
//   try {
//     const updatedSightmark = await Equipment.updateSightmark(equipmentId, userId, sightmarkId, update)
//     return sendDataResponse(res, 200, updatedSightmark)
//   } catch (error) {
//     return sendErrorResponse(res, 400, error.message)
//   }
// }

// export const updateSightmark = async (req, res) => {
//   const {sightmarkId, distance, distanceType, sightPosition, notes} = req.body
//   const update = {distance, distanceType, sightPosition, notes}
//   const filter = {
//     userId: req.mongo_id,
//     _id: req.params.id,
//     'equipment.sightmarks._id': sightmarkId
//   }
//   const options = { new: true }
//   try {
//     const updatedSightmark = await Equipment.updateSightmark(filter, update, options)
//     return sendDataResponse(res, 200, updatedSightmark)
//   } catch (error) {
//     return sendErrorResponse(res, 400, error.message)
//   }
// }
