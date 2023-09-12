import User from './models/userModel.js'
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer'

export const jwtCheck = auth({
  audience: 'http://new-archery-api',
  issuerBaseURL: 'https://dev-wn87thdr6glngf33.uk.auth0.com/'
})

export const checkScopes = (scope) => requiredScopes(scope)

export const extractAuth0Id = (req, res, next) => {
  req.auth0Id = req.auth.payload.sub
  next()
}

export const extractMongoId = async (req, res, next) => {
  extractAuth0Id(req, res, async () => {
    try {
      const auth0Id = req.auth0Id
      const user = await User.findOne({ auth0Id })

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      req.mongo_id = user._id
      next()
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  })
}
