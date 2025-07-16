import express from 'express'
import 'dotenv/config'
import { PORT } from './config.js'

import profesoresRoutes from './routes/profesores.routes.js'
import cursosRoutes from './routes/cursos.routes.js'
import salasRoutes from './routes/salas.routes.js'
import disponibilidadesRoutes from './routes/disponibilidades.routes.js'
import horarioRoutes from './routes/horario.routes.js'

const app = express()
app.use(express.json())

app.use(profesoresRoutes)
app.use(cursosRoutes)
app.use(salasRoutes)
app.use(disponibilidadesRoutes)
app.use(horarioRoutes)

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`))
