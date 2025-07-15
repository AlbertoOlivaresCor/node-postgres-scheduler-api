import { Router } from 'express'
import {
  getHorarios,
  getHorariosByProfesor,
  createHorario,
  deleteHorario
} from '../controllers/horarios.controllers.js'

const router = Router()

router.get('/horarios', getHorarios)
router.get('/horarios/profesor/:id', getHorariosByProfesor)
router.post('/horarios', createHorario)
router.delete('/horarios/:id', deleteHorario)

export default router
