import { generarHorario } from '../services/generadorHorario.service.js'
import { db } from '../db.js'

export const generar = async (req, res) => {
  const resultado = await generarHorario()
  res.json(resultado)
}

export const getHorario = async (req, res) => {
  const result = await db.query(`
    SELECT h.*, c.nombre AS curso, p.nombre AS profesor, s.nombre AS sala
    FROM horario h
    JOIN cursos c ON h.curso_id = c.id
    JOIN profesores p ON h.profesor_id = p.id
    JOIN salas s ON h.sala_id = s.id
    ORDER BY dia_semana, hora_inicio
  `)
  res.json(result.rows)
}

