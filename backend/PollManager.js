class PollManager {
  constructor() {
    this.polls = new Map();
    this.activePoll = null;
  }

  createPoll(question, options, correctAnswer) {
    const pollId = Date.now().toString();
    const newPoll = {
      id: pollId,
      question,
      options: options.map((option) => ({ text: option, votes: 0 })),
      correctAnswer,
      answers: new Map(),
    };
    this.polls.set(pollId, newPoll);
    this.activePoll = newPoll;
    return newPoll;
  }

  submitAnswer(pollId, studentId, answer) {
    const poll = this.polls.get(pollId);
    if (!poll) return null;

    poll.answers.set(studentId, answer);
    const optionIndex = poll.options.findIndex(
      (option) => option.text === answer
    );
    if (optionIndex !== -1) {
      poll.options[optionIndex].votes++;
    }

    return this.getPollResults(pollId);
  }

  getPollResults(pollId) {
    const poll = this.polls.get(pollId);
    if (!poll) return null;

    return {
      id: poll.id,
      question: poll.question,
      options: poll.options,
      totalVotes: poll.answers.size,
    };
  }

  endPoll(pollId) {
    const poll = this.polls.get(pollId);
    if (!poll) return null;

    this.activePoll = null;
    return this.getPollResults(pollId);
  }

  getActivePoll() {
    return this.activePoll;
  }
}

module.exports = PollManager;
