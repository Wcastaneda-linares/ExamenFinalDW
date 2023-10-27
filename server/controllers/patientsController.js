//server/controllers/patientController.js
import Patients from '../models/mongo/Patients.js'; // Asegúrate de actualizar la ruta al modelo de Patient.

const PatientController = {

    // Obtener todos los pacientes
    // Obtener todos los pacientes
    async getAll(req, res) {
        try {
            const patients = await Patients.find(); // elimina la parte del filtro de usuario
            return res.status(200).json(patients);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener los pacientes', error });
        }
    },


    // Crear un nuevo paciente
    async create(req, res) {
        try {
            const { nombre, fechaNacimiento, direccion, alergias } = req.body;
            const newPatient = new Patients({
                nombre,
                fechaNacimiento,
                direccion,
                alergias,
            });
            await newPatient.save();
            return res.status(201).json(newPatient);
        } catch (error) {
            return res.status(500).json({ message: 'Error al crear el paciente', error });
        }
    },

    // Eliminar un paciente
    async delete(req, res) {
        try {
            const deletedPatient = await Patients.findByIdAndDelete(req.params.id);
            if (!deletedPatient) {
                return res.status(404).json({ message: 'Paciente no encontrado' });
            }
            return res.status(200).json({ message: 'Paciente eliminado con éxito' });
        } catch (error) {
            return res.status(500).json({ message: 'Error al eliminar el paciente', error });
        }
    },

    // Actualizar un paciente
    async update(req, res) {
        try {
            const { nombre, fechaNacimiento, direccion, alergias } = req.body;
            const patientUpdated = await Patients.findOneAndUpdate(
                { _id: req.params.id },
                { nombre, fechaNacimiento, direccion, alergias },
                { new: true }
            );
            return res.status(200).json(patientUpdated);
        } catch (error) {
            return res.status(500).json({ message: 'Error al actualizar el paciente', error });
        }
    },

    // Obtener un paciente por ID
    async getById(req, res) {
        try {
            const patient = await Patients.findById(req.params.id);
            if (!patient) {
                return res.status(404).json({ message: 'Paciente no encontrado' });
            }
            return res.status(200).json(patient);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener el paciente', error });
        }
    }
};

export default PatientController;
