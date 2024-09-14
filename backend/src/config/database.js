const { Sequelize } = require("sequelize");
require("dotenv").config();

const connectionString =
  "mysql://root:QGMDwPRHriyqMbESalzbdKROHHCFFmsS@junction.proxy.rlwy.net:43177/railway";

const sequelize = new Sequelize(connectionString, {
  dialect: "mysql",
  logging: console.log,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = sequelize;
