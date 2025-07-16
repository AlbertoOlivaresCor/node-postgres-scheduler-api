import { db } from '../db.js'

export const generarHorario = async () => {
  const cursos = (await db.query('SELECT * FROM cursos')).rows
  const disponibilidades = (await db.query('SELECT * FROM disponibilidades')).rows
  const salas = (await db.query('SELECT * FROM salas')).rows

  for (const curso of cursos) {
    for (const disponibilidad of disponibilidades) {
      const { profesor_id, dia_semana, hora_inicio } = disponibilidad

      const duracion = curso.duracion
      const [h, m] = hora_inicio.split(':').map(Number)
      const horaInicioDate = new Date(1970, 0, 1, h, m)
      horaInicioDate.setHours(horaInicioDate.getHours() + duracion)
      const horaFinCursoStr = horaInicioDate.toTimeString().slice(0, 5)

      const haySolapamiento = await db.query(`
        SELECT 1 FROM horario
        WHERE profesor_id = $1
        AND dia_semana = $2
        AND (
          (CAST($3 AS TIME), CAST($4 AS TIME)) OVERLAPS (hora_inicio, hora_fin)
        )
      `, [
        profesor_id,
        dia_semana,
        hora_inicio,
        horaFinCursoStr
      ])

      if (haySolapamiento.rows.length > 0) continue

      const sala = salas[0] // puedes mejorar la lógica para múltiples salas

      await db.query(`
        INSERT INTO horario (curso_id, profesor_id, sala_id, dia_semana, hora_inicio, hora_fin)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        curso.id,
        profesor_id,
        sala.id,
        dia_semana,
        hora_inicio,
        horaFinCursoStr
      ])

      break // curso asignado
    }
  }

  return { message: 'Horario generado' }
}
