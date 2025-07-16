import { Router } from 'express'
import {
  getProfesores,
  createProfesor
} from '../controllers/profesores.controller.js'

const router = Router()

router.get('/profesores', getProfesores)
router.post('/profesores', createProfesor)

export default router

