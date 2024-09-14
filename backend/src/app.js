const express = require("express");
const http = require("http");
const socketService = require("./services/socketService");
const cors = require("cors");
const pollRoutes = require("./routes/pollRoutes");
const { getLiveResults } = require("./controllers/pollController");

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
socketService.init(server);

app.use(cors());
app.use(express.json());

app.use("/api/polls", pollRoutes);

app.get("/api/live-results", getLiveResults);

// Don't start the server here. Instead, export the server object.
module.exports = { app, server };
