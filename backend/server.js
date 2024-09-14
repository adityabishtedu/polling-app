const { app, server } = require("./src/app");
const socketService = require("./src/services/socketService");

const PORT = process.env.PORT || 3080;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  socketService.init(server);
});
