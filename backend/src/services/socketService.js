const socketIo = require("socket.io");

let io;

const init = (server) => {
  if (!io) {
    io = socketIo(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    console.log("Socket.IO initialized");
  }
  return io;
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

const emitToPoll = (pollId, event, data) => {
  getIo().to(`poll_${pollId}`).emit(event, data);
};

const emitToAll = (event, data) => {
  getIo().emit(event, data);
};

module.exports = {
  init,
  getIo,
  emitToPoll,
  emitToAll,
};
