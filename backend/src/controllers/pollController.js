const StudentResponse = require("../../models/StudentResponse");
const Poll = require("../models/Poll");
const sequelize = require("../config/database");
const { Op } = require("sequelize");
const socketService = require("../services/socketService");
const { calculateResults, endPoll } = require("../utils/pollUtils");

exports.createPoll = async (req, res) => {
  try {
    // End any active polls
    const activePoll = await Poll.findOne({ where: { isActive: true } });
    if (activePoll) {
      const results = await endPoll(activePoll.id);
      socketService.emitToPoll(activePoll.id, "pollEnded", results);
    }

    // Create new poll
    const newPoll = await Poll.create({
      ...req.body,
      isActive: true,
      // No need to stringify options here, the model will handle it
    });

    // Emit new poll to all connected clients
    socketService.emitToAll("newPoll", newPoll.toJSON());

    res.status(201).json(newPoll.toJSON());
  } catch (error) {
    console.error("Error creating poll:", error);
    res
      .status(500)
      .json({ message: "Error creating poll", error: error.message });
  }
};

// Add a new endpoint to get the active poll
exports.getActivePoll = async (req, res) => {
  try {
    const activePoll = await Poll.findOne({ where: { isActive: true } });
    if (activePoll) {
      res.json(activePoll);
    } else {
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
    const { pollId } = req.params;
    const poll = await Poll.findByPk(pollId);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    const results = await calculateResults(pollId);
    res.json({
      question: poll.question,
      options: results,
      correctAnswer: poll.correctAnswer,
    });
  } catch (error) {
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
    res.json(poll);
  } catch (error) {
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
  try {
    const { id } = req.params;
    const results = await endPoll(id);
    socketService.emitToAll("pollEnded", { pollId: id, results });

    res.json({ message: "Poll ended successfully", results });
  } catch (error) {
    console.error("Error ending poll:", error);
    res
      .status(500)
      .json({ message: "Error ending poll", error: error.message });
  }
};

// ... (other controller functions remain the same)

exports.endAllPolls = async (req, res) => {
  try {
    const activePolls = await Poll.findAll({ where: { isActive: true } });
    for (const poll of activePolls) {
      const results = await endPoll(poll.id);
      socketService.emitToPoll(poll.id, "pollEnded", results);
    }
    res.status(200).json({ message: "All polls ended successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error ending polls", error });
  }
};
