import mongoose from "mongoose";

//definimos el esquema de la colección de usuarios
const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 200,
  },

});

export default mongoose.model("User", userSchema);

