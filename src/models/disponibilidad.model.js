import { db } from '../db.js'

export const getAllDisponibilidades = async () => {
  const result = await db.query('SELECT * FROM disponibilidades ORDER BY id')
  return result.rows
}

export const createDisponibilidad = async ({ profesor_id, dia_semana, hora_inicio, hora_fin }) => {
  const result = await db.query(
    'INSERT INTO disponibilidades (profesor_id, dia_semana, hora_inicio, hora_fin) VALUES ($1, $2, $3, $4) RETURNING *',
    [profesor_id, dia_semana, hora_inicio, hora_fin]
  )
  return result.rows[0]
}