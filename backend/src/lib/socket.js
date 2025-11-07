import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : process.env.NODE_ENV === "production"
    ? [process.env.FRONTEND_URL || "http://localhost"]
    : ["http://localhost:5173", "http://localhost:3000"];

const io = new Server(server, {
  path: "/socket.io",
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
  pingInterval: 25000,
  pingTimeout: 60000,
  connectTimeout: 45000,
  maxHttpBufferSize: 1e6,
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log(
    "Socket connected",
    socket.id,
    "transport:",
    socket.conn.transport.name
  );

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`Mapped user ${userId} to socket ${socket.id}`);
  }

  socket.conn.on("upgrade", () => {
    console.log(
      `Socket ${socket.id} upgraded to transport ${socket.conn.transport.name}`
    );
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err.message);
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err.message);
  });

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected", socket.id, "reason:", reason);
    if (userId) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { io, app, server };
