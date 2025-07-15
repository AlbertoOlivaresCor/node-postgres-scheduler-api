import { db } from '../db.js'

export const getHorarios = async () => {
  const result = await db.query('SELECT * FROM horarios ORDER BY id ASC')
  return result.rows
}

export const getHorariosByProfesor = async (profesor_id) => {
  const result = await db.query('SELECT * FROM horarios WHERE profesor_id = $1', [profesor_id])
  return result.rows
}

export const createHorario = async ({ profesor_id, dia_semana, hora_inicio, hora_fin }) => {
  const result = await db.query(
    'INSERT INTO horarios (profesor_id, dia_semana, hora_inicio, hora_fin) VALUES ($1, $2, $3, $4) RETURNING *',
    [profesor_id, dia_semana, hora_inicio, hora_fin]
  )
  return result.rows[0]
}

export const deleteHorario = async (id) => {
  const result = await db.query('DELETE FROM horarios WHERE id = $1 RETURNING *', [id])
  return result.rows[0]
}
