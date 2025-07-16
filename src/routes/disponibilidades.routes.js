import { Router } from 'express'
import { getDisponibilidades, createDisponibilidad } from '../controllers/disponibilidades.controller.js'

const router = Router()
router.get('/disponibilidades', getDisponibilidades)
router.post('/disponibilidades', createDisponibilidad)
export default router