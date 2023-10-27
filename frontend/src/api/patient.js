import axios from "axios";

// Crear un nuevo paciente
export const createPatientRequest = async (patientData) => axios.post(`api/patients/patient`, patientData);

// Obtener todos los pacientes
export const getAllPatientsRequest = async () => axios.get(`api/patients/patient`);

// Obtener un paciente específico por su ID
export const getPatientByIdRequest = async (id) => axios.get(`api/patients/patient/${id}`);

// Actualizar un paciente por su ID
export const updatePatientRequest = async (id, updatedPatientData) => axios.put(`api/patients/patient/${id}`, updatedPatientData);

// Eliminar un paciente por su ID
export const deletePatientRequest = async (id) => axios.delete(`api/patients/patient/${id}`);
