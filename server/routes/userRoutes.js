//server/routes/userRoutes.js
import express from 'express';
import { register, login, logout, profile, getAllUsers, verifyToken} from '../controllers/userController.js';
import { validateSchema } from '../middlewares/authMiddleware.js';
import {authRequire} from '../middlewares/authMiddleware.js';
import {registerSchema, loginSchema} from '../schemas/userSchema.js';
const router = express.Router();

// Rutas para usuario
router.post('/login', validateSchema(loginSchema), login);
router.get('/user', getAllUsers); 
router.post('/logout', logout); 
router.get('/profile', authRequire, profile);
router.post('/register', validateSchema(registerSchema), register);
router.get("/verify", verifyToken);


export default router;
