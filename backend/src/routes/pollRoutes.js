const express = require("express");
const pollController = require("../controllers/pollController");

const router = express.Router();

router.post("/polls", pollController.createPoll);
router.get("/polls/active", pollController.getActivePoll);
router.get("/polls/:id", pollController.getPoll);
router.post("/polls/:id/answer", pollController.submitAnswer);
router.post("/polls/:id/end", pollController.endPoll);
router.get("/polls/:id/results", pollController.getLiveResults);
router.post("/polls/end-all", pollController.endAllPolls);

module.exports = router;
