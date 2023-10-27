import mongoose from "mongoose";

//definimos el esquema de la colección de usuarios
const patientSchema = mongoose.Schema({
    nombre: {
        type: String,
    },
    fechaNacimiento: {
        type: String,
    },
    direccion: {
        type: String,
    },
    alergias: {
        type: [String],
        default: []
    },
}, { collection: 'patients' });

export default mongoose.model("Patients", patientSchema);
