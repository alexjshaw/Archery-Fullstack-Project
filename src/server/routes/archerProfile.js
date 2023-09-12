import { Router } from 'express'
import { createArcherProfile, getCurrentArcherProfiles, searchArcherProfiles, deleteArcherProfile, updateArcherProfile } from '../controllers/archerProfile.js'
import { extractAuth0Id, extractMongoId } from '../auth.js'

const router = Router()

router.post('/', extractMongoId, createArcherProfile)
router.get('/', extractMongoId, getCurrentArcherProfiles)
router.get('/search', searchArcherProfiles)
router.delete('/:id', extractMongoId, deleteArcherProfile)
// router.put('/:id', extractMongoId, updateArcherProfile)

export default router
