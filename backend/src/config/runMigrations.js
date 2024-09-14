const { Sequelize } = require("sequelize");
const config = require("./database");
const path = require("path");

async function runMigrations() {
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
      // Add any other necessary options from your database.js file
    }
  );

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const Umzug = require("umzug");
    const umzug = new Umzug({
      migrations: {
        path: path.join(__dirname, "../migrations"),
        params: [sequelize.getQueryInterface(), Sequelize],
      },
      storage: "sequelize",
      storageOptions: {
        sequelize: sequelize,
      },
    });

    await umzug.up();
    console.log("All migrations have been executed successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
}

runMigrations();
