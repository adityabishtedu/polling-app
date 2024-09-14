const { DataTypes } = require("sequelize");
const sequelize = require("../src/config/database");

const StudentResponse = sequelize.define("StudentResponse", {
  pollId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  selectedOption: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = StudentResponse;
