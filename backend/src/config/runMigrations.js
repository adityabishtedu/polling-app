const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");
const sequelize = require("./database");

const umzug = new Umzug({
  migrations: { glob: "src/migrations/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => {
  await umzug.up();
  console.log("All migrations performed successfully");
  process.exit(0);
})();
