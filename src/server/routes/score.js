import { Router } from 'express'
import { extractAuth0Id, extractMongoId } from '../auth.js'
import { createScore, updateScore, deleteScore, searchScores, currentUserScores } from '../controllers/score.js'

const router = Router()

router.get('/', extractMongoId, searchScores)
router.get('/currentuser', extractMongoId, currentUserScores)
router.post('/', extractMongoId, createScore)
router.put('/:id', extractMongoId, updateScore)
router.delete('/:id', extractMongoId, deleteScore)

export default router
