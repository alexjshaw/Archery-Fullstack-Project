import { Router } from 'express'
import { extractAuth0Id, extractMongoId } from '../auth.js'
import { createEnd, updateEnd } from '../controllers/end.js'

const router = Router()

router.post('/:id', extractMongoId, createEnd)
router.put('/:scoreId/:endId', extractMongoId, updateEnd)

export default router
