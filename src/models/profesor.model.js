import { db } from '../db.js'

export const getAll = async () => {
  const result = await db.query('SELECT * FROM profesores ORDER BY id')
  return result.rows
}

export const create = async ({ nombre, email, carga_horaria }) => {
  const result = await db.query(
    'INSERT INTO profesores (nombre, email, carga_horaria) VALUES ($1, $2, $3) RETURNING *',
    [nombre, email, carga_horaria]
  )
  return result.rows[0]
}

