import * as Disp from '../models/disponibilidad.model.js'

export const getDisponibilidades = async (req, res) => {
  const disp = await Disp.getAllDisponibilidades()
  res.json(disp)
}

export const createDisponibilidad = async (req, res) => {
  const nueva = await Disp.createDisponibilidad(req.body)
  res.status(201).json(nueva)
}