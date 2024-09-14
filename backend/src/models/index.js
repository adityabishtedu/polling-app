const StudentResponse = require("../../models/StudentResponse");
const sequelize = require("../config/database");
const Poll = require("./Poll");
// const StudentResponse = require("./StudentResponse");

const syncModels = async () => {
  await sequelize.sync({ force: true });
  console.log("Database & tables created!");
};

module.exports = {
  syncModels,
  Poll,
  StudentResponse,
};
