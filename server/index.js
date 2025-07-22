const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const contestRoutes = require('./routes/contestRoutes.js');
const socketHandlers = require('./sockets/socketHandlers.js');
const userRoutes = require('./routes/userRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const problemsRoutes = require('./routes/problemRoutes.js');

const path = require('path');
dotenv.config();
// console.log('MONGO_URI:', process.env.MONGO_URI); 
connectDB();
// const __dirname = path.resolve();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://dsa-trainer.onrender.com/',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use(cors({
  origin: 'https://dsa-trainer.onrender.com/',
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// API routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contest', contestRoutes);
app.use('/api/problems', problemsRoutes);

// Socket.io logic
socketHandlers(io);

app.use(
  express.static(
    path.join(__dirname, '..', 'client', 'dist'),
    { extensions: ['js', 'css', 'html'] }
  )
);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});


