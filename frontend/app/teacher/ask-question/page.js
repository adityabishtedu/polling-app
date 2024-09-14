"use client";

import React, { useState } from "react";
import { usePoll } from "../../context/PollContext";

export default function AskQuestion() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const { createPoll } = usePoll();

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPoll({
        question,
        options: options.filter((option) => option.trim() !== ""),
        correctAnswer,
      });
      // Reset form after successful submission
      setQuestion("");
      setOptions(["", ""]);
      setCorrectAnswer("");
    } catch (error) {
      console.error("Failed to create poll:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your question"
        required
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          placeholder={`Option ${index + 1}`}
          required
        />
      ))}
      <button type="button" onClick={handleAddOption}>
        Add Option
      </button>
      <input
        type="text"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
        placeholder="Correct Answer"
        required
      />
      <button type="submit">Create Poll</button>
    </form>
  );
}
