import { db } from '../db.js'

export const getAllSalas = async () => {
  const result = await db.query('SELECT * FROM salas ORDER BY id')
  return result.rows
}

export const createSala = async ({ nombre, capacidad }) => {
  const result = await db.query(
    'INSERT INTO salas (nombre, capacidad) VALUES ($1, $2) RETURNING *',
    [nombre, capacidad]
  )
  return result.rows[0]
}