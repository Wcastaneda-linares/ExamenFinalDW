import { usePatient } from "./PatientsComponets.jsx"; // Actualizado a usePatient
import { Button, ButtonCard, CardPatient } from "./ui";
import {Link} from 'react-router-dom';

export function PatientCard({ patient }) {
  const { deletePatient } = usePatient();

  return (
    // Añadiendo márgenes alrededor del componente 'Card' para separación
    <CardPatient className="p-4 mt-8 bg-white rounded-lg shadow-md flex flex-col justify-center my-4 mx-2">
      <header className="flex justify-between mb-2">
        <h1 className="text-2xl font-semibold text-white">{patient.nombre}</h1>
      </header>
      <p className="text-black">Dirección:</p>
      <p className="text-white mb-2">{patient.direccion}</p>
      <p className="text-black">Fecha de nacimiento:</p>
      <p className="text-white mb-2">{patient.fechaNacimiento.split('T')[0]}</p>
      <p className="text-black">Alergias</p>
      <p className="text-white mb-2">{patient.alergias.join(', ')}</p>
      <p className="text-sm text-black-500 w-full h-full">
        {patient.date &&
          new Date(patient.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
      <div className="flex gap-x-2 items-center">
          <ButtonCard 
            className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition duration-150"
            onClick={() => deletePatient(patient._id)}>
            Delete
          </ButtonCard>
          <Link 
            to={`/${patient._id}`}
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-600 transition duration-150">
            Edit
          </Link>
        </div>
    </CardPatient>
  );
}
