import admin from '../firebase/firebaseconfig.js';

// Registro de profesor en Firebase Authentication
export const register = async (req, res) => {
  const { email, password, nombre } = req.body;
  if (!email || !password || !nombre) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  try {
    // Crear usuario en Firebase
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: nombre,
    });
    return res.status(201).json({ mensaje: 'Usuario registrado', uid: userRecord.uid });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Login: Firebase recomienda hacerlo desde el frontend, pero aquí se muestra cómo verificar el usuario
export const login = async (req, res) => {
  // El login real se hace en el frontend con Firebase SDK, aquí solo se valida el token recibido
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ error: 'Token no proporcionado' });
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    return res.json({ mensaje: 'Login exitoso', usuario: decoded });
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
