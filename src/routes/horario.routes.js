import { Router } from 'express'
import { generar, getHorario } from '../controllers/horario.controller.js'

const router = Router()

router.post('/generar-horario', generar)
router.get('/horario', getHorario)

export default router
