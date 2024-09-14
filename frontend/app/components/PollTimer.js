import { Box, Typography, LinearProgress } from "@mui/material";

export default function PollTimer({ timeLeft, totalTime }) {
  const progress = (timeLeft / totalTime) * 100;

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2">Time remaining</Typography>
        <Typography variant="body2">{timeLeft}s</Typography>
      </Box>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
