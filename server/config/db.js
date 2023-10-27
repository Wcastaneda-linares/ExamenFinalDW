//server/config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const connectDB = async () => {
  try {
    // Conexión a MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');

  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};


export const TOKEN_SECRET = "ThisIsASecretToken";

export default { connectDB};


