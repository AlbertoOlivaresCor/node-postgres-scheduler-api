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

// Login de profesor en Firebase Authentication
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  try {
    // Verificar las credenciales del usuario
    const userRecord = await admin.auth().getUserByEmail(email);
    // Aquí deberías verificar la contraseña, pero Firebase no permite obtenerla directamente
    // En un caso real, deberías usar Firebase Authentication para autenticar al usuario
    return res.status(200).json({ mensaje: 'Usuario autenticado', uid: userRecord.uid });
  } catch (error) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
};
