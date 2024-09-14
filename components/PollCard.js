import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

export default function PollCard({ poll }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {poll.question}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {poll.totalVotes} votes
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            component={Link}
            href={`/poll/${poll.id}`}
            variant="contained"
            color="primary"
            fullWidth
          >
            Vote
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
