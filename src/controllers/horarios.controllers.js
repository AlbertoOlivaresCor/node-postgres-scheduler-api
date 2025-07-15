import * as HorarioModel from '../models/horario.model.js'

export const getHorarios = async (req, res) => {
  try {
    const horarios = await HorarioModel.getHorarios()
    res.json(horarios)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getHorariosByProfesor = async (req, res) => {
  try {
    const horarios = await HorarioModel.getHorariosByProfesor(req.params.id)
    res.json(horarios)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const createHorario = async (req, res) => {
  try {
    const horario = await HorarioModel.createHorario(req.body)
    res.status(201).json(horario)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteHorario = async (req, res) => {
  try {
    const horario = await HorarioModel.deleteHorario(req.params.id)
    if (!horario) return res.status(404).json({ message: 'Horario no encontrado' })
    res.json({ message: 'Horario eliminado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
