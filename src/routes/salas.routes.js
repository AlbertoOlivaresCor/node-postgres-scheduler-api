import { Router } from 'express'
import { getSalas, createSala } from '../controllers/salas.controller.js'

const router = Router()
router.get('/salas', getSalas)
router.post('/salas', createSala)
export default router