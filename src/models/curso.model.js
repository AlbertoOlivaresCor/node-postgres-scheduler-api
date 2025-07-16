import { db } from '../db.js'

export const getAllCursos = async () => {
  const result = await db.query('SELECT * FROM cursos ORDER BY id')
  return result.rows
}

export const createCurso = async ({ nombre, duracion }) => {
  const result = await db.query(
    'INSERT INTO cursos (nombre, duracion) VALUES ($1, $2) RETURNING *',
    [nombre, duracion]
  )
  return result.rows[0]
}