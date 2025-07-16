# InductionApp PostgreSQL

Aplicación Node.js para la gestión de profesores y horarios usando PostgreSQL como base de datos. Permite realizar operaciones CRUD (crear, leer, actualizar, eliminar) sobre los recursos principales y gestionar la asignación de horarios a profesores.

## Requisitos

- Node.js (v18 o superior recomendado)
- PostgreSQL

## Instalación

1. Clona el repositorio o copia la carpeta `inductionapp_postgre` en tu máquina.
2. Abre una terminal en la carpeta del proyecto.
3. Instala las dependencias ejecutando:
   ```powershell
   npm install express pg dotenv 
   npm install -D nodemon
   npm install -g firebase-tools # (opcional, para autenticación futura)
   npm install jsonwebtoken bcryptjs # (opcional, para autenticación y encriptación futura)
   ```

Las dependencias principales usadas en el proyecto son:

- **express**: Framework para crear el servidor y definir rutas.
- **pg**: Cliente para conectarse a PostgreSQL.
- **dotenv**: Manejo de variables de entorno.
- **jsonwebtoken** y **bcryptjs**: (para autenticación, si se implementa en el futuro).
- **nodemon** : Reinicia automáticamente el servidor al detectar cambios.

## Configuración de la base de datos

Crea las tablas necesarias en PostgreSQL ejecutando el siguiente script SQL:

```sql
DROP TABLE IF EXISTS profesores;
DROP TABLE IF EXISTS horarios;

CREATE TABLE profesores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    carga_horaria INTEGER NOT NULL
);

CREATE TABLE horarios (
    id SERIAL PRIMARY KEY,
    profesor_id INTEGER REFERENCES profesores(id) ON DELETE CASCADE,
    dia_semana VARCHAR(15) NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL
);

-- Consultar datos:
select * from profesores;
select * from horarios;
```

Configura tu archivo `.env` con los datos de conexión a la base de datos:

```
DATABASE_URL="postgresql://user:password@localhost:puerto_bd/mi_base_de_datos"

```

## Ejecución

1. Inicia el servidor con:
   ```powershell
   npm run dev
   # o
   npm start
   ```
2. El servidor estará disponible en `http://localhost:4000` (puedes cambiar el puerto en `.env`).

## Endpoints principales

### Profesores
- `GET /profesores` — Lista todos los profesores
- `POST /profesores` — Crea un nuevo profesor
- `PUT /profesores/:id` — Actualiza un profesor existente
- `DELETE /profesores/:id` — Elimina un profesor

### Horarios
- `GET /horarios` — Lista todos los horarios
- `POST /horarios` — Crea un nuevo horario para un profesor
- `PUT /horarios/:id` — Actualiza un horario existente
- `DELETE /horarios/:id` — Elimina un horario

## Ejemplo de uso en Thunder Client

Crear un profesor:

POST http://localhost:4000/profesores
```json
{
  "nombre": "Catalina Ortiz",
  "email": "caortiz@gmail.com",
  "carga_horaria": 44
}
```

Listar profesores:

GET http://localhost:4000/profesores

Actualizar un profesor:

PUT http://localhost:4000/profesores/2
```json
{
  "nombre": "Catalina Ortiz",
  "email": "caortiz@gmail.com",
  "carga_horaria": 44
}
```

Eliminar un profesor:

DELETE http://localhost:4000/profesores/2

## Explicación del código y proceso de creación

El proyecto está organizado siguiendo buenas prácticas de Node.js y Express, separando la lógica en carpetas específicas:

- **models/**: Aquí se encuentran los modelos que gestionan la lógica de acceso y manipulación de los datos (por ejemplo, `profesor.model.js`). Cada modelo contiene funciones para crear, leer, actualizar y eliminar registros en la base de datos PostgreSQL.
- **controllers/**: Los controladores reciben las peticiones HTTP, validan los datos y llaman a los métodos de los modelos para realizar las operaciones necesarias.
- **routes/**: Define las rutas de la API, conectando las URLs con los controladores correspondientes.
- **config/**: Contiene la configuración y funciones para conectar a la base de datos PostgreSQL y manejar variables de entorno.
- **middlewares/**: Aquí puedes agregar funciones intermedias para validación, autenticación, etc.

### Proceso de creación paso a paso

1. Se creó la estructura de carpetas para separar la lógica de modelos, controladores y rutas.
2. Se implementaron los modelos para cada entidad (`profesor`, `horario`), permitiendo operaciones CRUD sobre los datos almacenados en PostgreSQL.
3. Se desarrollaron los controladores para manejar las peticiones y respuestas HTTP.
4. Se definieron las rutas en archivos separados para cada recurso, facilitando la escalabilidad y el mantenimiento.
5. Se configuró el servidor principal en `index.js` para levantar la API y conectar todas las partes.

Cada archivo está comentado para facilitar la comprensión del flujo de datos y la funcionalidad de cada método. Si tienes dudas sobre cómo funciona alguna parte, revisa los comentarios en los archivos dentro de `models`, `controllers` y `routes`.
