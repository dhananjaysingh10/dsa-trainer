import axios from "axios";

const API = axios.create({
  baseURL: "https://dsa-trainer.onrender.com/api",
  credentials: true,
});

export default API;
