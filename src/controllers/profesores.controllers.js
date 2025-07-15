import * as ProfesorModel from '../models/profesor.model.js'

export const getAllProfesores = async (req, res) => {
  try {
    const profesores = await ProfesorModel.getAllProfesores()
    res.json(profesores)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getProfesorById = async (req, res) => {
  try {
    const profesor = await ProfesorModel.getProfesorById(req.params.id)
    if (!profesor) return res.status(404).json({ message: 'Profesor no encontrado' })
    res.json(profesor)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const createProfesor = async (req, res) => {
  try {
    const profesor = await ProfesorModel.createProfesor(req.body)
    res.status(201).json(profesor)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateProfesor = async (req, res) => {
  try {
    const profesor = await ProfesorModel.updateProfesor({ id: req.params.id, ...req.body })
    if (!profesor) return res.status(404).json({ message: 'Profesor no encontrado' })
    res.json(profesor)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteProfesor = async (req, res) => {
  try {
    const profesor = await ProfesorModel.deleteProfesor(req.params.id)
    if (!profesor) return res.status(404).json({ message: 'Profesor no encontrado' })
    res.json({ message: 'Profesor eliminado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
