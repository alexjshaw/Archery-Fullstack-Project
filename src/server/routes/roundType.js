import { Router } from 'express'
import { extractAuth0Id, extractMongoId } from '../auth.js'
import { createRoundType, getRoundTypeById, searchRoundType, updateRoundType, updateRoundDistance, deleteRoundType, deleteRoundDistance, returnRoundTypeNames } from '../controllers/roundType.js'

const router = Router()

router.post('/', extractMongoId, createRoundType)
router.get('/search', searchRoundType)
router.get('/', returnRoundTypeNames)
router.get('/:id', getRoundTypeById)
router.put('/:id', extractMongoId, updateRoundType)
router.put('/distance/:id', extractMongoId, updateRoundDistance)
router.delete('/:id', extractMongoId, deleteRoundType)
router.delete('/distance/:id', extractMongoId, deleteRoundDistance)

export default router
