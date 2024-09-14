import { Typography, Box, Button } from "@mui/material";

export default function TimesUp({ onBackToPolls }) {
  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Time's Up!
      </Typography>
      <Typography variant="body1" gutterBottom>
        You didn't submit your answer in time.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onBackToPolls}
        sx={{ mt: 2 }}
      >
        Back to Polls
      </Button>
    </Box>
  );
}
