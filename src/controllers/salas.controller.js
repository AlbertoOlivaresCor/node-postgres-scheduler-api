import * as Sala from '../models/sala.model.js'

export const getSalas = async (req, res) => {
  const salas = await Sala.getAllSalas()
  res.json(salas)
}

export const createSala = async (req, res) => {
  const sala = await Sala.createSala(req.body)
  res.status(201).json(sala)
}