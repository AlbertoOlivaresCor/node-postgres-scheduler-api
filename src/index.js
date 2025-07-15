import express from 'express'
import 'dotenv/config'
import { PORT } from './config.js'
import profesoresRoutes from './routes/profesores.routes.js'
import horariosRoutes from './routes/horarios.routes.js'

const app = express()
app.use(express.json())

app.use(profesoresRoutes)
app.use(horariosRoutes)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`)
})
