const express = require("express");
const pollController = require("../controllers/pollController");

const router = express.Router();

// Remove the /polls prefix from these routes as it's now handled in server.js
router.post("/create", pollController.createPoll);
router.get("/active", pollController.getActivePoll);
router.get("/:id", pollController.getPoll);
router.post("/:id/answer", pollController.submitAnswer);
router.post("/:id/end", pollController.endPoll);
router.get("/:id/results", pollController.getLiveResults);
router.post("/end-all", pollController.endAllPolls);

module.exports = router;
