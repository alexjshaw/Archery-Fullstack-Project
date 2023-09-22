import { Router } from 'express'
import { extractAuth0Id, extractMongoId } from '../auth.js'
import { createSightmark, updateSightmark, getSightmarks, deleteSightmark, getEquipmentSightmarks } from '../controllers/sightmark.js'

const router = Router()

router.post('/', extractMongoId, createSightmark)
router.put('/:id', extractMongoId, updateSightmark)
router.get('/', getSightmarks)
router.get('/:id', getEquipmentSightmarks)
router.delete('/:id', extractMongoId, deleteSightmark)

export default router
