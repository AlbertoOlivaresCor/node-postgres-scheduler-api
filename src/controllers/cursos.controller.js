import * as Curso from '../models/curso.model.js'

export const getCursos = async (req, res) => {
  const cursos = await Curso.getAllCursos()
  res.json(cursos)
}

export const createCurso = async (req, res) => {
  const curso = await Curso.createCurso(req.body)
  res.status(201).json(curso)
}