import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = Router();

// Registro de profesor
router.post('/auth/register', register);
// Login de profesor
router.post('/auth/login', login);

export default router;
