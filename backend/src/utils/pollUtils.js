const { StudentResponse, Poll } = require("../models");
const sequelize = require("../config/database");

const calculateResults = async (pollId) => {
  const responses = await StudentResponse.findAll({
    where: { pollId },
    attributes: [
      "selectedOption",
      [sequelize.fn("COUNT", sequelize.col("selectedOption")), "count"],
    ],
    group: ["selectedOption"],
  });

  const results = {};
  responses.forEach((response) => {
    results[response.selectedOption] = response.getDataValue("count");
  });

  return results;
};

const endPoll = async (pollId) => {
  await Poll.update({ isActive: false }, { where: { id: pollId } });
  const results = await calculateResults(pollId);
  return results;
};

module.exports = { calculateResults, endPoll };
