"use client";

import { useState } from "react";
import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
} from "@mui/material";

export default function ActivePoll({ poll, onVote, isDisabled }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleVote = () => {
    onVote(selectedOption);
  };

  if (!poll) return null;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {poll.question}
      </Typography>
      <RadioGroup
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {poll.options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option.text || option}
            control={<Radio />}
            label={option.text || option}
            disabled={isDisabled}
          />
        ))}
      </RadioGroup>
      <Button
        variant="contained"
        color="primary"
        onClick={handleVote}
        disabled={!selectedOption || isDisabled}
        sx={{ mt: 2 }}
      >
        Submit Answer
      </Button>
    </Box>
  );
}
