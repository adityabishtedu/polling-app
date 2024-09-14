"use client";

import { useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { usePoll } from "../../context/PollContext";
import PollResults from "../../components/PollResults";

export default function ActivePoll() {
  const router = useRouter();
  const { currentPoll, pollResults, endPoll } = usePoll();

  useEffect(() => {
    if (!currentPoll) {
      // Redirect to create poll page if there's no active poll
      router.push("/teacher/create-poll");
    }
  }, [currentPoll, router]);

  const handleEndPoll = () => {
    endPoll();
    router.push("/teacher/create-poll");
  };

  if (!currentPoll) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Active Poll
      </Typography>
      <Typography variant="h5" gutterBottom>
        {currentPoll.question}
      </Typography>
      {pollResults && <PollResults results={pollResults} />}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleEndPoll}
        sx={{ mt: 2 }}
      >
        End Poll
      </Button>
    </Box>
  );
}
