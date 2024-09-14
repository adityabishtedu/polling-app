const socketIo = require("socket.io");
require("dotenv").config();

let io;

module.exports = {
  init: (server) => {
    io = socketIo(server, {
      cors: {
        origin: [
          process.env.FRONTEND_URL,
          "https://polling-app-production-5c61.up.railway.app",
          "http://localhost:3000",
        ],
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
  emitToAll: (event, data) => {
    io.emit(event, data);
  },
};
