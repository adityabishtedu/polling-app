"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import PollIcon from "@mui/icons-material/Poll";
import { useRouter } from "next/navigation";
import { usePoll } from "../../context/PollContext";

const StyledContainer = styled(Container)({
  position: "relative",
  width: "1440px",
  height: "923px",
  background: "#FFFFFF",
});

const HeaderBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "0px 9px",
  gap: "7px",
  position: "absolute",
  width: "134px",
  height: "31px",
  left: "134px",
  top: "81px",
  background: "linear-gradient(90deg, #7565D9 0%, #4D0ACD 100%)",
  borderRadius: "24px",
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#F2F2F2",
    borderRadius: "2px",
  },
});

const GradientButton = styled(Button)({
  background: "linear-gradient(99.18deg, #8F64E1 -46.89%, #1D68BD 223.45%)",
  borderRadius: "34px",
  padding: "17px 70px",
  fontFamily: "Sora",
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "23px",
  color: "#FFFFFF",
  textTransform: "none",
  position: "absolute",
  width: "233.93px",
  height: "57.58px",
  left: "1134px",
  top: "851px",
});

const EndPollButton = styled(Button)({
  background: "#F2F2F2",
  borderRadius: "34px",
  padding: "17px 30px",
  fontFamily: "Sora",
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "23px",
  color: "#7C57C2",
  textTransform: "none",
  position: "absolute",
  height: "57.58px",
  left: "870px",
  top: "851px",
  border: "2px solid #7C57C2",
});

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [error, setError] = useState("");
  const { createPoll, currentPoll, endPoll } = usePoll();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPoll = await createPoll({ question, options, correctAnswer });
      console.log("New poll created:", newPoll);
      router.push(`/teacher/live-results/${newPoll.id}`);
    } catch (error) {
      console.error("Error creating poll:", error);
      setError(error.message);
    }
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreatePoll = async () => {
    if (
      !question ||
      options.filter((option) => option.trim() !== "").length < 2
    ) {
      setError("Please enter a question and at least two options.");
      return;
    }

    const pollData = {
      question,
      options: options.filter((option) => option.trim() !== ""),
      correctAnswer,
    };

    try {
      const createdPoll = await createPoll(pollData);
      if (createdPoll && createdPoll.id) {
        router.push(`/teacher/live-results/${createdPoll.id}`);
      } else {
        throw new Error("Failed to create poll");
      }
    } catch (error) {
      console.error("Error creating poll:", error);
      setError(error.message);
    }
  };

  const handleEndPoll = async () => {
    if (currentPoll && currentPoll.isActive) {
      try {
        await endPoll(currentPoll.id);
        setError("Current poll ended successfully.");
      } catch (error) {
        console.error("Error ending poll:", error);
        setError("Failed to end the current poll.");
      }
    } else {
      setError("No active poll to end.");
    }
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError("");
  };

  return (
    <StyledContainer>
      <HeaderBox>
        <PollIcon sx={{ color: "#FFFFFF", fontSize: "14.66px" }} />
        <Typography
          variant="subtitle2"
          sx={{
            fontFamily: "Sora",
            fontWeight: 600,
            fontSize: "14px",
            color: "#FFFFFF",
          }}
        >
          Intervue Poll
        </Typography>
      </HeaderBox>

      <Box
        sx={{
          position: "absolute",
          left: "123px",
          top: "128px",
          width: "759px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "Sora",
            fontWeight: 400,
            fontSize: "40px",
            lineHeight: "50px",
            mb: 2,
          }}
        >
          Let's Get Started
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Sora",
            fontWeight: 400,
            fontSize: "19px",
            lineHeight: "24px",
            color: "rgba(0, 0, 0, 0.5)",
          }}
        >
          You'll have the ability to create and manage polls, ask questions, and
          monitor your students' responses in real-time.
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          left: "123px",
          top: "283px",
          width: "865px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontFamily: "Sora", fontWeight: 600, fontSize: "20px", mb: 2 }}
        >
          Enter your question
        </Typography>
        <StyledTextField
          fullWidth
          multiline
          rows={4}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          sx={{ mb: 3 }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          left: "123px",
          top: "553px",
          width: "507px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontFamily: "Sora", fontWeight: 600, fontSize: "18px", mb: 2 }}
        >
          Edit Options
        </Typography>
        {options.map((option, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", mb: 2 }}
          >
            <Box
              sx={{
                width: "24px",
                height: "24px",
                borderRadius: "22px",
                background:
                  "linear-gradient(243.94deg, #8F64E1 -50.82%, #4E377B 216.33%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: 2,
              }}
            >
              <Typography
                sx={{ color: "#FFFFFF", fontSize: "11px", fontWeight: 600 }}
              >
                {index + 1}
              </Typography>
            </Box>
            <StyledTextField
              fullWidth
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          </Box>
        ))}
        <Button
          onClick={handleAddOption}
          sx={{
            mt: 2,
            border: "1px solid #7451B6",
            borderRadius: "11px",
            color: "#7C57C2",
            fontFamily: "Sora",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          + Add More option
        </Button>
      </Box>

      <Box sx={{ position: "absolute", left: "699px", top: "553px" }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: "Sora", fontWeight: 600, fontSize: "18px", mb: 2 }}
        >
          Is it Correct?
        </Typography>
        <RadioGroup
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        >
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={
                <Radio
                  sx={{
                    color: "#8F64E1",
                    "&.Mui-checked": { color: "#8F64E1" },
                  }}
                />
              }
              label={option || `Option ${index + 1}`}
              sx={{ mb: 1 }}
            />
          ))}
        </RadioGroup>
      </Box>

      <GradientButton onClick={handleCreatePoll}>Ask Question</GradientButton>

      {currentPoll && currentPoll.isActive && (
        <EndPollButton onClick={handleEndPoll}>End Current Poll</EndPollButton>
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
}
