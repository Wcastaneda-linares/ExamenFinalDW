import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label, Textarea } from "../components/ui";
import { useForm } from "react-hook-form";
import { usePatient } from "../components/PatientsComponets.jsx";
import { createPatientRequest } from "../api/patient.js";

function ProfileForm() {
  const { createProfile, getPatient, updatePatient } = usePatient();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function formatDateForInput(dateString) {
    if (dateString.includes("-")) {
      // Es formato ISO
      return dateString.split("T")[0];
    } else if (dateString.includes("/")) {
      // Es formato dd/mm/yyyy
      const [day, month, year] = dateString.split("/");
      return `${year}-${month}-${day}`;
    } else {
      return ''; // Si no reconoce el formato, devolver una cadena vacía.
    }
  }
  

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        nombre: data.nombre,
        fechaNacimiento: new Date(data.fechaNacimiento),
        direccion: data.direccion,
        alergias: data.alergias.split(','),
      };
  
      if (params.id) {
        updatePatient(params.id, formData);
      } else {
        createPatientRequest(formData);
      }
  
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  
  // Cargar el perfil si se está editando
  useEffect(() => {
    console.log("Perfil obtenido:", params.id);
    const loadProfile = async () => {
      if (!params.id) {
        reset(); // Limpia el formulario si no hay ID de paciente.
        return;
      }
  
      try {
        const profile = await getPatient(params.id);
        if (profile) {
          setValue("nombre", profile.nombre);
          setValue("fechaNacimiento", formatDateForInput(profile.fechaNacimiento));
          setValue("direccion", profile.direccion);
          setValue("alergias", profile.alergias.join(','));
        }
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      }
    };
  
    loadProfile();
  }, [setValue, getPatient, params.id, reset]); // Añade 'reset' a las dependencias.
  
  
  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            type="text"
            name="nombre"
            placeholder="Ingrese su nombre..."
            {...register("nombre", { required: true })}
            autoFocus
          />
          {errors.nombre && (
            <p className="text-red-500 text-xs italic">Por favor ingrese un nombre.</p>
          )}

          <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
          <Input 
            id="fechaNacimiento"
            type="date" 
            name="fechaNacimiento" 
            {...register("fechaNacimiento", { required: true })} 
          />
          {errors.fechaNacimiento && (
            <p className="text-red-500 text-xs italic">Por favor ingrese una fecha de nacimiento.</p>
          )}

          <Label htmlFor="direccion">Direccion donde vive</Label>
          <Textarea
            name="direccion"
            id="direccion"
            rows="3"
            placeholder="Ingrese su Direccion de Residencia..."
            {...register("direccion")}
          ></Textarea>

          <Label htmlFor="alergias">Alergias (separado por comas)</Label>
          <Textarea
            name="alergias"
            id="alergias"
            rows="3"
            placeholder="Ingrese sus alergias..."
            {...register("alergias")}
          ></Textarea>
          <div className="flex justify-center text-white">
          <Button className="text-white">Guardar</Button>
          </div>

        </form>
      </Card>
    </div>
  );
}

export default ProfileForm;
