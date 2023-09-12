import { Router } from 'express'
import { createUser, updateProfile, getUsers, getCurrentUser, getUserById } from '../controllers/user.js'
import { extractAuth0Id, extractMongoId } from '../auth.js'
import { updateAuth0UserMetadata } from '../managementAPI.js'

const router = Router()

router.post('/', extractAuth0Id, updateAuth0UserMetadata, createUser)
router.put('/profile', extractMongoId, updateProfile)
router.get('/search', getUsers)
router.get('/', extractMongoId, getCurrentUser)
router.get('/:id', getUserById)

export default router
