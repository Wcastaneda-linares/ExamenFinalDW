import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label, Textarea } from "../components/ui";
import { useProfile } from "../components/PageComponets.jsx";
import { useForm } from "react-hook-form";
import { useAuth } from "../components/AuthComponents.jsx"; 
dayjs.extend(utc);

function FormPatients() {
  const { user } = useAuth();
  const { createProfile, getProfile, updateProfile } = useProfile();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        user_id: user._id,
        nombre: user.nombre,
        fechaNacimiento: dayjs.utc(data.fechaNacimiento).format(),
        direccion: data.direccion,
        alergias: data.alergias.split('\n'),
      };
  
      if (params.id) {
        updateProfile(params._id, formData);
      } else {
        createProfile(formData);
      }
  
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  // Cargar el perfil si se está editando
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getProfile(params._id);
        if (profile) { 
          setValue("nombre", profile.nombre);
          setValue("fechaNacimiento", profile.fechaNacimiento ? dayjs(profile.fechaNacimiento).utc().format("YYYY-MM-DD") : "");
          setValue("direccion", profile.direccion);
          setValue("alergias", profile.alergias.join('\n'));
        }
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      }
    };
    
    loadProfile();
  }, [params._id, setValue, getProfile]);

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            type="text"
            name="nombre"
            placeholder="Nombre..."
            {...register("nombre")}
            autoFocus
          />

          <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
          <Input 
            id="fechaNacimiento"
            type="date" 
            name="fechaNacimiento" 
            {...register("fechaNacimiento")} />

          <Label htmlFor="direccion">Direccion donde vive</Label>
          <Textarea
            name="direccion"
            id="direccion"
            rows="3"
            placeholder="Ingrese su direccion de residencia..."
            {...register("direccion")}
          ></Textarea>

          <Label htmlFor="alergias">Alergias</Label>
          <Textarea
            name="alergias"
            id="alergias"
            rows="3"
            placeholder="Alergias, una por línea..."
            {...register("alergias")}
          ></Textarea>

          <Button>Guardar</Button>
        </form>
      </Card>
    </div>
  );
}

export default FormPatients;
