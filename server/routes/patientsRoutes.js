//server/routes/profileRoutes.js
import express from 'express';
import PatientController from '../controllers/patientsController.js';

const router = express.Router();

// Rutas para los perfiles de usuario
router.post('/patient', PatientController.create);
router.get('/patient', PatientController.getAll);
router.get('/patient/:id', PatientController.getById);
router.put('/patient/:id', PatientController.update);
router.delete('/patient/:id', PatientController.delete);


export default router;
