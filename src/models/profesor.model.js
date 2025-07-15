import { db } from '../db.js'

export const getAllProfesores = async () => {
  const result = await db.query('SELECT * FROM profesores ORDER BY id ASC')
  return result.rows
}

export const getProfesorById = async (id) => {
  const result = await db.query('SELECT * FROM profesores WHERE id = $1', [id])
  return result.rows[0]
}

export const createProfesor = async ({ nombre, email, carga_horaria }) => {
  const result = await db.query(
    'INSERT INTO profesores (nombre, email, carga_horaria) VALUES ($1, $2, $3) RETURNING *',
    [nombre, email, carga_horaria]
  )
  return result.rows[0]
}

export const updateProfesor = async ({ id, nombre, email, carga_horaria }) => {
  const result = await db.query(
    'UPDATE profesores SET nombre=$1, email=$2, carga_horaria=$3 WHERE id=$4 RETURNING *',
    [nombre, email, carga_horaria, id]
  )
  return result.rows[0]
}

export const deleteProfesor = async (id) => {
  const result = await db.query('DELETE FROM profesores WHERE id=$1 RETURNING *', [id])
  return result.rows[0]
}
