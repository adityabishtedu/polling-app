const StudentResponse = require("../../models/StudentResponse");
const Poll = require("../models/Poll");
const sequelize = require("../config/database");
const { Op } = require("sequelize");
const socketService = require("../services/socketService");
const { calculateResults, endPoll } = require("../utils/pollUtils");

// Modify the createPoll function to end active polls before creating a new one
exports.createPoll = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    // End all active polls
    await Poll.update(
      { isActive: false },
      { where: { isActive: true }, transaction }
    );

    const newPoll = await Poll.create(
      {
        question: req.body.question,
        options: JSON.stringify(req.body.options),
        correctAnswer: req.body.correctAnswer,
        isActive: true,
      },
      { transaction }
    );

    await transaction.commit();

    socketService.emitToAll("newPoll", newPoll.toJSON());
    res.status(201).json(newPoll.toJSON());
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating poll:", error);
    res
      .status(500)
      .json({ message: "Error creating poll", error: error.message });
  }
};

// Add a new endpoint to get the active poll
exports.getActivePoll = async (req, res) => {
  console.log("Fetching active poll");
  try {
    const activePoll = await Poll.findOne({ where: { isActive: true } });
    if (activePoll) {
      const pollData = activePoll.toJSON();
      pollData.options = JSON.parse(pollData.options);
      console.log("Active poll found:", pollData);
      res.json(pollData);
    } else {
      console.log("No active poll found");
      res.status(404).json({ message: "No active poll found" });
    }
  } catch (error) {
    console.error("Error fetching active poll:", error);
    res
      .status(500)
      .json({ message: "Error fetching active poll", error: error.message });
  }
};

exports.getLiveResults = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await calculateResults(id);
    res.json({ results });
  } catch (error) {
    console.error("Error fetching live results:", error);
    res
      .status(500)
      .json({ message: "Error fetching live results", error: error.message });
  }
};

exports.getPoll = async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findByPk(id);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    const pollData = poll.toJSON();
    pollData.options = JSON.parse(pollData.options);
    res.json(pollData);
  } catch (error) {
    console.error("Error fetching poll:", error);
    res
      .status(500)
      .json({ message: "Error fetching poll", error: error.message });
  }
};

// Add the missing controller functions
exports.submitAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, selectedOption } = req.body;

    await StudentResponse.create({
      pollId: id,
      studentId,
      selectedOption,
    });

    const results = await calculateResults(id);
    socketService.emitToAll("pollResults", { pollId: id, results });

    res.status(201).json({ message: "Answer submitted successfully", results });
  } catch (error) {
    console.error("Error submitting answer:", error);
    res
      .status(500)
      .json({ message: "Error submitting answer", error: error.message });
  }
};

exports.endPoll = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const poll = await Poll.findByPk(id, { transaction });
    if (!poll) {
      await transaction.rollback();
      return res.status(404).json({ message: "Poll not found" });
    }

    await poll.update({ isActive: false }, { transaction });
    await transaction.commit();

    socketService.emitToAll("pollEnded", { pollId: id });
    res.json({ message: "Poll ended successfully" });
  } catch (error) {
    await transaction.rollback();
    console.error("Error ending poll:", error);
    res
      .status(500)
      .json({ message: "Error ending poll", error: error.message });
  }
};

// ... (other controller functions remain the same)

// Add this function to handle ending all polls
exports.endAllPolls = async (req, res) => {
  try {
    const activePolls = await Poll.update(
      { isActive: false },
      { where: { isActive: true } }
    );
    res.status(200).json({ message: "All polls ended successfully" });
  } catch (error) {
    console.error("Error ending all polls:", error);
    res
      .status(500)
      .json({ message: "Error ending all polls", error: error.message });
  }
};
