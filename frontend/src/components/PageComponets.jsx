import { createContext, useContext, useState } from "react";
import {
  createPatientRequest,
  getAllPatientsRequest,
  getPatientByIdRequest,
  updatePatientRequest,
  deletePatientRequest
} from "../api/patient.js";

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within a ProfileProvider");
  return context;
};

export function PatientProvider({ children }) {
  const [patients, setProfiles] = useState([]);

  const getPatients = async () => {
    try {
      const res = await getAllPatientsRequest();
      setProfiles(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePatient = async (id) => {
    try {
      const res = await deletePatientRequest(id);
      if (res.status === 204) setProfiles(patients.filter((profile) => profile.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const createPatient = async (profile) => {
    try {
      const res = await createPatientRequest(profile);
      setProfiles(prevProfiles => [...prevProfiles, res.data]);
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
        console.warn("No se encontró datos en la respuesta del perfil.");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
      return null;
    }
  };

  const updatePatient = async (id, profile) => {
    try {
      await updatePatientRequest(id, profile);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PatientProvider.Provider
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
    </PatientProvider.Provider>
  );
}
