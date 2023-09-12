import mongoose from 'mongoose'
import User from '../database/user.js'
import { sendDataResponse, sendErrorResponse } from '../utils/responses.js'
import 'dotenv/config'
import { ManagementClient } from 'auth0'
import https from 'https'
import querystring from 'querystring'
import { updateAuth0UserMetadata } from '../managementAPI.js'
import ArcherProfile from '../database/archerProfile.js'

const auth0 = new ManagementClient({
  domain: process.env.AUTH0_ISSUER_BASE_URL.replace('https://', ''),
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'read:users update:users'
})

export const createUser = async (req, res) => {
  try {
    const query = {
      auth0Id: req.auth0Id,
      email: req.body.email
    }
    const result = await User.createUser(query)

    const accessToken = req.managementApiToken
    const updatePayload = JSON.stringify({
      user_metadata: {
        mongo_id: result._id
      }
    })

    const updateOptions = {
      hostname: 'dev-wn87thdr6glngf33.uk.auth0.com',
      path: `/api/v2/users/${req.auth0Id}`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Content-Length': Buffer.byteLength(updatePayload)
      }
    }

    const updateReq = https.request(updateOptions, (updateRes) => {
      let updateData = ''
      updateRes.on('data', (chunk) => {
        updateData += chunk
      })
      updateRes.on('end', () => {
        console.log('User metadata updated:', JSON.parse(updateData))
      })
    })

    updateReq.on('error', (error) => {
      console.error('Update Error:', error)
    })

    updateReq.write(updatePayload)
    updateReq.end()

    return sendDataResponse(res, 200, result)
  } catch (error) {
    return sendErrorResponse(res, 400, error.message)
  }
}

export const updateProfile = async (req, res) => {
  try {
    const userId = req.mongo_id
    const { firstName, lastName, bio, club } = req.body
    const update = { 'profile.firstName': firstName, 'profile.lastName': lastName, 'profile.bio': bio, 'profile.club': club }
    const result = await User.findAndUpdateProfile(userId, update)
    return sendDataResponse(res, 200, result)
  } catch (error) {
    return sendErrorResponse(res, 400, error.message)
  }
}

export const getCurrentUser = async (req, res) => {
  try {
    const query = { _id: req.mongo_id }
    const currentUser = await User.findOne(query)
    return sendDataResponse(res, 200, currentUser)
  } catch (error) {
    return sendErrorResponse(res, 400, error.message)
  }
}

export const getUsers = async (req, res) => {
  try {
    const { email, firstName, lastName } = req.query
    const query = {}

    const fields = {
      // eslint-disable-next-line object-shorthand
      email: email,
      'profile.firstName': firstName,
      'profile.lastName': lastName
    }

    for (const [key, value] of Object.entries(fields)) {
      if (value) {
        query[key] = new RegExp(value, 'i')
      }
    }

    const users = await User.findMany(query)
    return sendDataResponse(res, 200, users)
  } catch (error) {
    return sendErrorResponse(res, 400, error.message)
  }
}

export const getUserById = async (req, res) => {
  const id = req.params.id

  try {
    const query = { _id: new mongoose.Types.ObjectId(id) }
    const user = await User.findOne(query)
    return sendDataResponse(res, 200, user)
  } catch (error) {
    return sendErrorResponse(res, 400, error.message)
  }
}
