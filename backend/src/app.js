const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const pollRoutes = require("./routes/pollRoutes");
const socketService = require("./services/socketService");

require("dotenv").config();

let dbInstance;

exports.server = () => {
  const server = express();

  const create = async () => {
    server.set("port", process.env.PORT || 8080);
    server.set("hostname", process.env.HOSTNAME || "localhost");

    // CORS configuration
    server.use(
      cors({
        origin: [
          "https://polling-app-production-5c61.up.railway.app",
          process.env.FRONTEND_URL,
          "http://localhost:3000",
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      })
    );

    // Health check route
    server.use("/health", (req, res) => res.sendStatus(200));

    const db = await sequelize.sync({ force: false });
    dbInstance = db;

    server.use((req, res, next) => {
      req.db = db;
      return next();
    });

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.use("/polls", pollRoutes);
  };

  const start = () => {
    const hostname = server.get("hostname");
    const port = server.get("port");

    const httpServer = server.listen(port, () => {
      console.log(`Service listening on - http://${hostname}:${port}`);
    });

    socketService.init(httpServer);
  };

  return {
    create,
    start,
  };
};

exports.getDBInstance = () => dbInstance;
