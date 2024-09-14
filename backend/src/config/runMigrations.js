const { Sequelize } = require("sequelize");
const config = require("./database");
const path = require("path");

async function runMigrations(migrationName = null) {
  try {
    await config.authenticate();
    console.log("Connection has been established successfully.");

    const Umzug = require("umzug");
    const umzug = new Umzug({
      migrations: {
        path: path.join(__dirname, "../migrations"),
        params: [config.getQueryInterface(), Sequelize],
      },
      storage: "sequelize",
      storageOptions: {
        sequelize: config,
      },
    });

    if (migrationName) {
      await umzug.up({ to: migrationName });
      console.log(`Migration ${migrationName} has been executed successfully.`);
    } else {
      await umzug.up();
      console.log("All migrations have been executed successfully.");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = runMigrations;
