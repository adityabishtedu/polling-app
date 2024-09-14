const { StudentResponse, Poll } = require("../models");
const sequelize = require("../config/database");

async function calculateResults(pollId) {
  const responses = await StudentResponse.findAll({
    where: { pollId },
    attributes: ["selectedOption"],
  });

  const results = {};
  responses.forEach((response) => {
    const option = response.selectedOption;
    results[option] = (results[option] || 0) + 1;
  });

  return results;
}
const endPoll = async (pollId) => {
  await Poll.update({ isActive: false }, { where: { id: pollId } });
  const results = await calculateResults(pollId);
  return results;
};

module.exports = { calculateResults, endPoll };
