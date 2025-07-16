import { Router } from 'express'
import { getCursos, createCurso } from '../controllers/cursos.controller.js'

const router = Router()
router.get('/cursos', getCursos)
router.post('/cursos', createCurso)
export default router