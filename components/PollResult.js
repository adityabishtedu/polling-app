import { Box, Typography, LinearProgress } from "@mui/material";

export default function PollResult({ option, totalVotes }) {
  const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" gutterBottom>
        {option.text}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{ height: 10, borderRadius: 5 }}
      />
      <Typography variant="body2" color="text.secondary">
        {option.votes} votes ({percentage.toFixed(1)}%)
      </Typography>
    </Box>
  );
}
