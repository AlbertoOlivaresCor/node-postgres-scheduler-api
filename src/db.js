// Importa las variables de entorno desde el archivo .env automáticamente.
// Así puedes acceder a process.env.DATABASE_URL, entre otros.
import 'dotenv/config'

// Importa el módulo 'pg' para poder usar PostgreSQL en Node.js
import pg from 'pg'

// Extrae (hace destructuring) de la clase 'Pool' del módulo pg.
// Pool permite manejar múltiples conexiones a la base de datos de forma eficiente.
const { Pool } = pg

// Obtiene la URL de conexión a la base de datos desde las variables de entorno (.env)
const connectionString = process.env.DATABASE_URL

// Crea una nueva instancia del pool de conexiones y la exporta como 'db'.
// - 'allowExitOnIdle: true' permite que la app se cierre automáticamente si no hay consultas pendientes.
// - 'connectionString' contiene todos los datos necesarios para conectarse a la base de datos.
export const db = new Pool({
    allowExitOnIdle: true,
    connectionString
})

// Intenta hacer una consulta simple ('SELECT NOW()') para comprobar si la base de datos está conectada.
// Si tiene éxito, imprime un mensaje en consola.
// Si falla, captura y muestra el error.
try {
    await db.query('SELECT NOW()')
    console.log('DATABASE connected')
} catch (error) {
    console.log('Error connecting to DB:',error)
}