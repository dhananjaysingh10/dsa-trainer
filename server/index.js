const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const contestRoutes = require('./routes/contestRoutes');
const socketHandlers = require('./sockets/socketHandlers');

dotenv.config();
console.log('MONGO_URI:', process.env.MONGO_URI); 
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // frontend
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/contest', contestRoutes);

// Socket.io logic
socketHandlers(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
