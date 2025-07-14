// // socket.js
import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// ✅ store globally
let ioInstance = null;

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('register', (userId) => {
    socket.join(userId);
    console.log(`Socket ${socket.id} joined room: ${userId}`);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

// set global instance
ioInstance = io;

// ✅ helper to get io instance anywhere
export const getIo = () => ioInstance;

export { io, server, app };
