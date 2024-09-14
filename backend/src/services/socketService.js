const socketIo = require("socket.io");
let io;

module.exports = {
  init: (server) => {
    io = socketIo(server, {
      cors: {
        origin: "https://polling-app-production-5c61.up.railway.app",
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
