import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust if using proxy/deployment
export default socket;
