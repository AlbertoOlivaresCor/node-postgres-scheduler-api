import { Router } from 'express'
import {
  getAllProfesores,
  getProfesorById,
  createProfesor,
  updateProfesor,
  deleteProfesor
} from '../controllers/profesores.controllers.js'

const router = Router()

router.get('/profesores', getAllProfesores)
router.get('/profesores/:id', getProfesorById)
router.post('/profesores', createProfesor)
router.put('/profesores/:id', updateProfesor)
router.delete('/profesores/:id', deleteProfesor)

export default router
