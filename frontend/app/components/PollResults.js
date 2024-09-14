"use client";

import { Typography, Box, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

const OptionBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  borderRadius: "10px",
  padding: "16px",
  marginBottom: "16px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: theme.palette.background.default,
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    backgroundImage: `linear-gradient(to right, ${theme.customGradient.start}, ${theme.customGradient.middle}, ${theme.customGradient.end})`,
  },
}));

export default function PollResults({ results }) {
  if (!results || !results.options) return null;

  const totalVotes = results.options.reduce(
    (sum, option) => sum + option.votes,
    0
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
        {results.question}
      </Typography>
      {results.options.map((option, index) => {
        const percentage =
          totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
        return (
          <OptionBox key={index}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {option.text}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {percentage.toFixed(1)}%
              </Typography>
            </Box>
            <ProgressBar variant="determinate" value={percentage} />
            <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
              {option.votes} {option.votes === 1 ? "vote" : "votes"}
            </Typography>
          </OptionBox>
        );
      })}
      <Typography
        variant="body2"
        sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}
      >
        Total votes: {totalVotes}
      </Typography>
    </Box>
  );
}
