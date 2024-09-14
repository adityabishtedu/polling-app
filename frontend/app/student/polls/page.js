"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { usePoll } from "../../context/PollContext";
import TimerIcon from "@mui/icons-material/Timer";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const StyledContainer = styled(Container)({
  position: "relative",
  width: "1440px",
  height: "923px",
  background: "#FFFFFF",
});

const PollFrame = styled(Box)({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "0px",
  gap: "14px",
  position: "absolute",
  width: "727px",
  height: "353px",
  left: "357px",
  top: "269px",
  border: "1px solid #AF8FF1",
  borderRadius: "9px",
  overflow: "hidden", // Add this to ensure the QuestionBox doesn't overflow
});

const QuestionBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: "0px 0px 0px 16px",
  width: "100%", // Change to 100% to match PollFrame width
  height: "50px",
  background: "linear-gradient(90deg, #343434 0%, #6E6E6E 100%)",
  borderRadius: "9px 9px 0px 0px", // Adjust to match PollFrame border radius
});

const OptionBox = styled(Box)(({ isSelected }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "26px 23px",
  gap: "10px",
  width: "678px",
  height: "55px",
  background: isSelected ? "#F7F7F7" : "#FFFFFF",
  border: isSelected
    ? "1.5px solid #8F64E1"
    : "1px solid rgba(141, 141, 141, 0.19)",
  borderRadius: "6px",
}));

const OptionNumber = styled(Box)(({ isSelected }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "9px 10px 10px",
  gap: "10px",
  width: "24px",
  height: "24px",
  background: isSelected
    ? "linear-gradient(243.94deg, #8F64E1 -50.82%, #4E377B 216.33%)"
    : "#8D8D8D",
  borderRadius: "22px",
}));

const SubmitButton = styled(Button)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "17px 70px",
  gap: "10px",
  position: "absolute",
  width: "233.93px",
  height: "57.58px",
  left: "850px",
  top: "651px",
  background: "linear-gradient(99.18deg, #8F64E1 -46.89%, #1D68BD 223.45%)",
  borderRadius: "34px",
  fontFamily: "Sora",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "23px",
  color: "#FFFFFF",
  textTransform: "none",
});

const ChatButton = styled(Button)({
  position: "absolute",
  width: "80px",
  height: "76px",
  left: "1328px",
  top: "797px",
  background: "#5A66D1",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default function Polls() {
  const { currentPoll, submitAnswer, pollResults, hasVoted } = usePoll();
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [studentId] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("studentId") || `student_${Date.now()}`;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== "undefined" && studentId) {
      localStorage.setItem("studentId", studentId);
    }
  }, [studentId]);

  useEffect(() => {
    if (timeLeft > 0 && !hasVoted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !hasVoted) {
      handleSubmit();
    }
  }, [timeLeft, hasVoted]);

  const handleOptionSelect = (option) => {
    if (!hasVoted) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = async () => {
    if (currentPoll) {
      await submitAnswer(
        currentPoll.id,
        studentId,
        selectedOption || "No response"
      );
    }
  };

  const getTotalVotes = () => {
    return pollResults
      ? Object.values(pollResults).reduce((a, b) => a + b, 0)
      : 0;
  };

  const getPercentage = (option) => {
    const totalVotes = getTotalVotes();
    return totalVotes > 0
      ? Math.round(((pollResults[option] || 0) / totalVotes) * 100)
      : 0;
  };

  if (!currentPoll) {
    return (
      <StyledContainer>
        <Typography
          variant="h4"
          sx={{
            position: "absolute",
            width: "737px",
            height: "30px",
            left: "352px",
            top: "672px",
            fontFamily: "Sora",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "30px",
            textAlign: "center",
            color: "#000000",
          }}
        >
          Wait for the teacher to ask a new question..
        </Typography>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <Typography
        variant="h5"
        sx={{
          position: "absolute",
          width: "119px",
          height: "28px",
          left: "357px",
          top: "216px",
          fontFamily: "Sora",
          fontWeight: 600,
          fontSize: "22px",
          lineHeight: "28px",
          color: "#000000",
        }}
      >
        Question 1
      </Typography>
      <Box
        sx={{
          position: "absolute",
          left: "511px",
          top: "217px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TimerIcon
          sx={{
            color: "#000000",
            width: "16px",
            height: "19.02px",
            marginRight: "4px",
          }}
        />
        <Typography
          sx={{
            fontFamily: "Sora",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "23px",
            color: "#CB1206",
          }}
        >
          {`00:${timeLeft.toString().padStart(2, "0")}`}
        </Typography>
      </Box>

      <PollFrame>
        <QuestionBox>
          <Typography
            sx={{
              fontFamily: "Sora",
              fontWeight: 600,
              fontSize: "17px",
              lineHeight: "21px",
              color: "#FFFFFF",
              width: "100%",
            }}
          >
            {currentPoll.question}
          </Typography>
        </QuestionBox>
        <Box sx={{ padding: "18px 16px", gap: "15px", width: "100%" }}>
          {currentPoll.options.map((option, index) => {
            const percentage = hasVoted ? getPercentage(option) : 0;
            return (
              <OptionBox
                key={index}
                isSelected={selectedOption === option}
                onClick={() => !hasVoted && handleOptionSelect(option)}
                sx={{
                  marginBottom: "11px",
                  position: "relative",
                  overflow: "hidden",
                  cursor: hasVoted ? "default" : "pointer",
                }}
              >
                {hasVoted && (
                  <Box
                    sx={{
                      width: `${percentage}%`,
                      height: "100%",
                      background: "#6766D5",
                      position: "absolute",
                      left: 0,
                      top: 0,
                      zIndex: 0,
                      transition: "width 0.5s ease-in-out",
                    }}
                  />
                )}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    zIndex: 1,
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <OptionNumber isSelected={selectedOption === option}>
                    <Typography>{index + 1}</Typography>
                  </OptionNumber>
                  <Typography
                    sx={{
                      color: hasVoted && percentage > 0 ? "#FFFFFF" : "inherit",
                      transition: "color 0.5s ease-in-out",
                    }}
                  >
                    {option}
                  </Typography>
                  {hasVoted && (
                    <Typography
                      sx={{
                        marginLeft: "auto",
                        color: percentage > 0 ? "#FFFFFF" : "inherit",
                        transition: "color 0.5s ease-in-out",
                      }}
                    >
                      {percentage}%
                    </Typography>
                  )}
                </Box>
              </OptionBox>
            );
          })}
        </Box>
      </PollFrame>

      <SubmitButton onClick={handleSubmit} disabled={hasVoted}>
        {hasVoted ? "Submitted" : `Submit (${timeLeft}s)`}
      </SubmitButton>

      <ChatButton>
        <ChatBubbleIcon sx={{ color: "#FFFFFF", fontSize: "39px" }} />
      </ChatButton>
    </StyledContainer>
  );
}
