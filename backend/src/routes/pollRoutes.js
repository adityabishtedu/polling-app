const express = require("express");
const pollController = require("../controllers/pollController");

const router = express.Router();

router.post("/", pollController.createPoll);
router.get("/active", pollController.getActivePoll);
router.get("/:id", pollController.getPoll);
router.post("/:id/answer", pollController.submitAnswer);
router.post("/:id/end", pollController.endPoll);
router.get("/:id/results", pollController.getLiveResults);

module.exports = router;
