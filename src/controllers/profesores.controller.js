import * as Profesor from '../models/profesor.model.js'

export const getProfesores = async (req, res) => {
  const profesores = await Profesor.getAll()
  res.json(profesores)
}

export const createProfesor = async (req, res) => {
  const profesor = await Profesor.create(req.body)
  res.status(201).json(profesor)
}

