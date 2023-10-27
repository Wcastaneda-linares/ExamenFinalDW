import React, { useEffect } from "react";
import { ImFileEmpty } from 'react-icons/im';
import { usePatient } from '../components/PatientsComponets.jsx';
import { PatientCard } from '../components/PatientCard.jsx'; // Suponiendo que tienes un componente llamado PatientCard
import { useAuth } from '../components/AuthComponents.jsx';

// Página de perfil de usuario
function ProfilePage() {
  const { patients, getPatients } = usePatient();  // Cambiado a patients y getPatients

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <>
      {(patients && patients.length === 0) && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              Aún no existen pacientes, por favor agrega uno
            </h1>
          </div>
        </div>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center">
        {patients && patients.map((patient) => (
          <div className="w-full h-full flex items-center justify-center" key={patient._id}>
            <PatientCard patient={patient} />
          </div>
        ))}
      </div>
    </>
  );
}

export default ProfilePage;
