import { Router } from 'express'
import { extractAuth0Id, extractMongoId } from '../auth.js'
import { createEquipment, updateEquipment, getUsersEquipment, getEquipmentById, searchEquipment, deleteEquipment } from '../controllers/equipment.js'

const router = Router()

router.post('/', extractAuth0Id, extractMongoId, createEquipment)
router.put('/:id', extractMongoId, updateEquipment)
router.get('/', extractMongoId, getUsersEquipment)
router.get('/search', searchEquipment)
router.get('/:id', getEquipmentById)
router.delete('/:id', extractMongoId, deleteEquipment)

export default router
