import express from 'express'
import 'dotenv/config'
import { PORT } from './config.js'

import profesoresRoutes from './routes/profesores.routes.js'
//import cursosRoutes from './routes/cursos.routes.js';
//import salasRoutes from './routes/salas.routes.js';
//import disponibilidadesRoutes from './routes/disponibilidades.routes.js';
import horarioRoutes from './routes/horario.routes.js';
import authRoutes from './routes/auth.routes.js';
import { authenticateFirebase } from './middlewares/firebaseAuth.js';

const app = express()
app.use(express.json())

app.use(authRoutes); // Registro y login
app.use(profesoresRoutes); // Público o protegido según necesidad
app.use('/horarios', authenticateFirebase, horarioRoutes); // Solo usuarios autenticados pueden acceder a horarios

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`))
