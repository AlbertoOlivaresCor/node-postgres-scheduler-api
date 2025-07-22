# Implementación de Firebase y Autenticación en el Proyecto

## Configuración de Firebase

1. **Instalación de dependencias**
   - Se instaló el SDK de Firebase Admin:
     ```bash
     npm install firebase-admin
     ```

2. **Variables de entorno**
   - Las credenciales del servicio de Firebase (service account) y otros datos sensibles se almacenan en el archivo `.env` para mayor seguridad.
   - Ejemplo de variables en `.env`:
     ```env
     FIREBASE_PROJECT_ID=tu_project_id
     FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
     FIREBASE_CLIENT_EMAIL=tu_email@project.iam.gserviceaccount.com
     ```

3. **Inicialización de Firebase**
   - En `src/firebase/firebaseconfig.js` se inicializa el SDK de Firebase Admin usando las variables de entorno:
     ```js
     import admin from 'firebase-admin';
     import dotenv from 'dotenv';
     dotenv.config();

     admin.initializeApp({
       credential: admin.credential.cert({
         projectId: process.env.FIREBASE_PROJECT_ID,
         privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
         clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
       }),
     });

     export default admin;
     ```

---

## Autenticación de Usuarios (Login y Register)

- Los endpoints de autenticación (`/register` y `/login`) permiten a los profesores registrarse y autenticarse usando Firebase Authentication.
- Al hacer login, el usuario recibe un **idToken** de Firebase, que debe usar en las siguientes peticiones protegidas.
- El flujo es:
  1. El usuario se registra o inicia sesión desde el frontend (o Postman) usando su correo y contraseña.
  2. Firebase valida las credenciales y retorna un idToken.
  3. El idToken se envía en el header `Authorization` en las siguientes peticiones.

---

## Protección de Endpoints con Middleware

- Se creó un middleware `authenticateFirebase` en `src/middlewares/firebaseAuth.js`:
  ```js
  import admin from '../firebase/firebaseconfig.js';

  export const authenticateFirebase = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }
    const idToken = authHeader.split(' ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido' });
    }
  };
  ```

- Este middleware se aplica a los endpoints sensibles en `src/index.js`:
  ```js
  app.use('/horarios', authenticateFirebase, horarioRoutes);
  app.use('/disponibilidades', authenticateFirebase, disponibilidadesRoutes);
  ```

- Así, solo los usuarios autenticados (profesores registrados y logueados) pueden acceder a los endpoints de **disponibilidades** y **horarios**.

---

## Resumen del flujo seguro

1. El usuario se registra o inicia sesión y obtiene un idToken de Firebase.
2. El usuario incluye el idToken en el header `Authorization` de sus peticiones:
   ```
   Authorization: Bearer <idToken>
   ```
3. El backend valida el token con Firebase antes de permitir el acceso a los endpoints protegidos.
4. Si el token es válido, el usuario puede acceder a los recursos; si no, recibe un error 401.

---

**Nota:**
- El archivo `.env` y las credenciales de Firebase nunca deben subirse al repositorio.
- El middleware puede adaptarse para roles o permisos adicionales si se requiere en el futuro.
