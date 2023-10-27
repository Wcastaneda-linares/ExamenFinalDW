import axios from "axios";

//configuracion de axios para que funcione con cookies
const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export default instance;
