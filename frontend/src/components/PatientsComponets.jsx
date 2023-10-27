import { createContext, useContext, useState } from "react";
import {
  createPatientRequest,
  getAllPatientsRequest,
  getPatientByIdRequest,
  updatePatientRequest,
  deletePatientRequest
} from "../api/patient.js";

const PatientContext = createContext();

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (!context) throw new Error("usePatient must be used within a PatientProvider");
  return context;
};

export function PatientProvider({ children }) {
  const [patients, setPatients] = useState([]);
  

  const getPatients = async () => {
    try {
      const res = await getAllPatientsRequest();
      setPatients(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePatient = async (id) => {
    try {
      const res = await deletePatientRequest(id);
      if (res.status === 204) setPatients(patients.filter((patient) => patient._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const createPatient = async (patient) => {
    try {
      const res = await createPatientRequest(patient);
      setPatients(prevPatients => [...prevPatients, res.data]);
    } catch (error) {
      console.error("Error Data:", error.response?.data);
      console.error("Error Status:", error.response?.status);
      console.error("General Error:", error.message);
    }
  };

  const getPatient = async (id) => {
    try {
      const res = await getPatientByIdRequest(id);
      if (res && res.data) {
        return res.data;
      } else {
        console.warn("No se encontró datos en la respuesta del paciente.");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el paciente:", error);
      return null;
    }
  };

  const updatePatient = async (id, patient) => {
    try {
      const res = await updatePatientRequest(id, patient);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PatientContext.Provider
      value={{
        patients,
        getPatients,
        deletePatient,
        createPatient,
        getPatient,
        updatePatient,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}
