"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import PollIcon from "@mui/icons-material/Poll";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { usePoll } from "../../../context/PollContext";

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
});

const ViewHistoryButton = styled(Button)({
  background: "#8F64E1",
  borderRadius: "34px",
  padding: "17px 70px",
  fontFamily: "Sora",
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
  minWidth: "unset",
});

const ResultsContainer = styled(Box)({
  position: "absolute",
  left: "364px",
  top: "269px",
  width: "727px",
});

const QuestionBox = styled(Box)({
  border: "1px solid #AF8FF1",
  borderRadius: "9px",
  overflow: "hidden",
});

const QuestionHeader = styled(Box)({
  background: "linear-gradient(90deg, #343434 0%, #6E6E6E 100%)",
  padding: "14px 16px",
});

const OptionBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  height: "55px",
  background: "#F7F7F7",
  border: "1px solid rgba(141, 141, 141, 0.19)",
  borderRadius: "6px",
  marginBottom: "8px",
  position: "relative",
  overflow: "hidden",
});

export default function LiveResultsPage() {
  const params = useParams();
  const pollId = params?.id;

  const { currentPoll, pollResults, fetchPoll, fetchPollResults } = usePoll();
  const [loading, setLoading] = useState(true);

  const loadPollData = useCallback(async () => {
    if (pollId) {
      try {
        await fetchPoll(pollId);
        await fetchPollResults(pollId);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching poll data:", error);
        setLoading(false);
      }
    }
  }, [pollId, fetchPoll, fetchPollResults]);

  useEffect(() => {
    loadPollData();

    const interval = setInterval(loadPollData, 5000);

    return () => clearInterval(interval);
  }, [loadPollData]);

  const getTotalVotes = useCallback(() => {
    if (!pollResults) return 0;
    return Object.values(pollResults).reduce((sum, count) => sum + count, 0);
  }, [pollResults]);

  const getPercentage = useCallback(
    (option) => {
      const totalVotes = getTotalVotes();
      if (totalVotes === 0) return 0;
      return Math.round(((pollResults?.[option] || 0) / totalVotes) * 100);
    },
    [pollResults, getTotalVotes]
  );

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

      <ResultsContainer>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Sora",
            fontWeight: 600,
            fontSize: "22px",
            mb: 2,
          }}
        >
          Question
        </Typography>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : currentPoll ? (
          <QuestionBox>
            <QuestionHeader>
              <Typography
                sx={{
                  fontFamily: "Sora",
                  fontWeight: 600,
                  fontSize: "17px",
                  color: "#FFFFFF",
                }}
              >
                {currentPoll.question}
              </Typography>
            </QuestionHeader>
            <Box sx={{ padding: "18px 16px" }}>
              {currentPoll.options.map((option, index) => {
                const percentage = getPercentage(option);
                const votes = pollResults?.[option] || 0;
                return (
                  <OptionBox key={index}>
                    <Box
                      sx={{
                        width: `${percentage}%`,
                        height: "100%",
                        background: "#6766D5",
                        position: "absolute",
                        left: 0,
                        top: 0,
                        zIndex: 0,
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0 20px",
                        zIndex: 1,
                        width: "100%",
                      }}
                    >
                      <Typography
                        sx={{
                          width: "24px",
                          height: "24px",
                          background: "#FFFFFF",
                          borderRadius: "22px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#6766D5",
                          fontWeight: 600,
                          fontSize: "11px",
                          mr: 2,
                        }}
                      >
                        {index + 1}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Sora",
                          fontWeight: 400,
                          fontSize: "16px",
                          color: percentage > 0 ? "#FFFFFF" : "#000000",
                        }}
                      >
                        {option}
                      </Typography>
                      <Typography
                        sx={{
                          marginLeft: "auto",
                          fontWeight: 600,
                          fontSize: "16px",
                          color: percentage > 0 ? "#FFFFFF" : "#000000",
                        }}
                      >
                        {percentage}% ({votes} vote{votes !== 1 ? "s" : ""})
                      </Typography>
                    </Box>
                  </OptionBox>
                );
              })}
            </Box>
          </QuestionBox>
        ) : (
          <Typography>No poll data available</Typography>
        )}
      </ResultsContainer>

      <Box
        sx={{
          position: "absolute",
          left: "785px",
          top: "704px",
          display: "flex",
          gap: "20px",
        }}
      >
        <Link href="/teacher/create-poll">
          <GradientButton>+ Ask a new question</GradientButton>
        </Link>
      </Box>

      <Box
        sx={{
          position: "absolute",
          right: "53px",
          top: "62px",
        }}
      >
        <Link href="/teacher/poll-history">
          <ViewHistoryButton startIcon={<VisibilityIcon />}>
            View Poll history
          </ViewHistoryButton>
        </Link>
      </Box>

      <ChatButton>
        <ChatBubbleIcon sx={{ color: "#FFFFFF", fontSize: "39px" }} />
      </ChatButton>
    </StyledContainer>
  );
}
