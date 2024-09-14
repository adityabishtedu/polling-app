const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/database");
const pollRoutes = require("./src/routes/pollRoutes");
const socketService = require("./src/services/socketService");

const app = express();

// Update CORS configuration
app.use(
  cors({
    origin: "https://polling-app-production-5c61.up.railway.app", // adjust this to match your frontend URL
    credentials: true,
  })
);

app.use(express.json());

// Mount the routes without the /api prefix
app.use("/", pollRoutes);

// Add a test route
app.get("/test", (req, res) => {
  res.json({ message: "Test route working" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// Sync Sequelize models with the database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced");
    const server = app.listen(process.env.PORT || 3080, () => {
      console.log(`Server is running on port ${process.env.PORT || 3080}`);
    });

    // Initialize socket.io
    socketService.init(server);
  })
  .catch((error) => {
    console.error("Unable to sync database:", error);
  });
